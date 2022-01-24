# import API modules
from flask import Flask
from flask_cors import CORS
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
    app.run(debug=True)
    CORS(app)
    app.config.from_object(Config)
    # bind blue prints to WSGI app
    blueprints = [auth_bp_config]
    for bp in blueprints:
        app.register_blueprint(bp[0], url_prefix=bp[1])
    
    return app

# app = create_app()

def main():
    print('here')
    # # app is the WSGI instance
    # app = Flask(__name__)
    
    # @app.route("/")
    # def hello_world():
    #     return "<p>Hello, World!</p>"
    # parses csv data into Python instances stored in lists
    parser = Parser()
    # connects to MySQL DB, removes tables (if exits), and creates tables
    #   second bool is if on cloud instance or not 
    db = DB_Model(parser, False, False) # set the first bool to True for first run

    run_program(db)

    app = create_app()

    print('here2')
    db.destructor()

if __name__ == "__main__":
    main()