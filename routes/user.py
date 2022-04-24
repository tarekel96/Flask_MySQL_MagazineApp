# import Python classes that represent the MySQL Tables
# from record_types.Customer import Customer
import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, Blueprint, request, g
from controllers.user_helper import user_helper
from flask_cors import cross_origin
from flask_cors import CORS
# from controllers.auth_helper import auth_helper as auth

blueprint = Blueprint('blueprint',__name__)
@blueprint.after_request 
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    header['Content-Type'] = 'application/json'
    # Other headers can be added here if required
    return response

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
    db = SQLAlchemy(app)
    return db


user_bp = Blueprint('user', __name__)

# tuple that stores bp name and url_prefix
user_bp_config = (user_bp, "/user")

@user_bp.route('/', methods=['GET'])
def test():
        return "Here test"

@user_bp.route('/<id>', methods=['GET'])
def test_id(id):
        print("here")
        print(f'id: {id}')
        return id

@user_bp.route('/subs/<id>', methods=['GET'])
def get_catalog(id):
        app = Flask(__name__)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        with app.app_context():
                db = SQLAlchemy(app)
                session = db.session()
                return user_helper.get_subscriptions(session, id)


@user_bp.route('/add-subs/<id>', methods=['POST'])
@cross_origin(headers=['Content- Type'])
def add_subs(id):
        app = Flask(__name__)
        CORS(app)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        with app.app_context():
                return user_helper.add_subs(request, id)