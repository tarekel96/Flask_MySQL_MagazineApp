# import Python classes that represent the MySQL Tables
# from record_types.Customer import Customer
import os
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, Blueprint, request, Response
from controllers.auth_helper import auth_helper as auth

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


auth_bp = Blueprint('auth', __name__)


# tuple that stores bp name and url_prefix
auth_bp_config = (auth_bp, "/auth")

@auth_bp.route('/', methods=['GET'])
def index():
        response = Response('{\n"Message": "Auth Index"\n}', status=201, mimetype='application/json')
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@auth_bp.route('/admin', methods=['POST'])
def admin_auth():
        # user attempt to login as admin via form data
        if request.method == 'POST':
                return auth.admin_login(request)

@auth_bp.route('/login', methods=['POST'])
def user_auth():
        # user attempt to login as admin via form data
        if request.method == 'POST':
                app = Flask(__name__)
                app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
                app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
                with app.app_context():
                        db = SQLAlchemy(app)
                        session = db.session()
                        return auth.user_login(request, session)

@auth_bp.route('/signup', methods=['POST'])
def user_signup():
        # user attempt to login as admin via form data
        if request.method == 'POST':
                app = Flask(__name__)
                app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
                app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
                with app.app_context():
                        db = SQLAlchemy(app)
                        session = db.session()
                        return auth.user_signup(session, request, session)

@auth_bp.route('/magazine_catalog', methods=['GET'])
def get_catalog():
        app = Flask(__name__)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        with app.app_context():
                db = SQLAlchemy(app)
                session = db.session()
                return auth.get_catalog(session)

@auth_bp.route('/customers', methods=['GET'])
def get_customers():
        app = Flask(__name__)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        with app.app_context():
                db = SQLAlchemy(app)
                session = db.session()
                return auth.get_customers(session)

@auth_bp.route('/avg_cost_category', methods=['GET'])
def get_avg_cost_category():
        app = Flask(__name__)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}'
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        with app.app_context():
                db = SQLAlchemy(app)
                session = db.session()
                return auth.get_avg_cost_category(session)