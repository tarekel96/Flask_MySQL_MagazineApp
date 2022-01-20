from flask import Blueprint, request
from controllers.auth_helper import auth_helper as auth

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
