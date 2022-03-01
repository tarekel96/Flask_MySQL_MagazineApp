# import API modules
from distutils.log import debug
import os
from venv import create
from flask import Flask, g
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
# import Flask local modules
from config import Config
from routes.auth import auth_bp_config
# import local modules
from models.parser import Parser
from models.db_model import DB_Model
from queries.create.queries import QUERIES as CRE_QUERIES
from views.root import run_program

def create_app():
    # app is the WSGI instance
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)
    # bind blue prints to WSGI app
    blueprints = [auth_bp_config]
    for bp in blueprints:
        app.register_blueprint(bp[0], url_prefix=bp[1])
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    return app

def pre_process():
    # parses csv data into Python instances stored in lists
    parser = Parser()
    # connects to MySQL DB, removes tables (if exits), and creates tables
    #   second bool is if on cloud instance or not 
    db = DB_Model(parser, False, False) # set the first bool to True for first run
    db.destructor()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
    db = SQLAlchemy(app)
    return db


def main():
    pre_process()
    app = create_app()
    db = init_db(app)
    return app



if __name__ == "__main__":
    app = main()
    app.run(debug=True)

