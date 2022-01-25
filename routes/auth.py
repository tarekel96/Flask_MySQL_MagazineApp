# import Python classes that represent the MySQL Tables
# from record_types.Customer import Customer
import os
import json
from sqlalchemy import create_engine
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, Blueprint, request, g
from controllers.auth_helper import auth_helper as auth

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
    db = SQLAlchemy(app)
    return db


auth_bp = Blueprint('auth', __name__)


# tuple that stores bp name and url_prefix
auth_bp_config = (auth_bp, "/auth")

@auth_bp.route('/', methods=['GET'])
def index():
        return "auth index"

@auth_bp.route('/admin', methods=['POST'])
def admin_auth():
        # user attempt to login as admin via form data
        if request.method == 'POST':
                return auth.admin_login(request)

@auth_bp.route('/magazine_catalog', methods=['GET'])
def get_catalog():
        app = Flask(__name__)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
        with app.app_context():
                db = SQLAlchemy(app)
                session = db.session()
                return auth.get_catalog(session)