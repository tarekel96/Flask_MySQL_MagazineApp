from flask import Blueprint, request
from controllers.auth_helper import admin_login

auth_bp = Blueprint('auth', __name__)

# tuple that stores bp name and url_prefix
auth_bp_config = (auth_bp, "/auth")

@auth_bp.route('/')
def auth():
        return "auth"

@auth_bp.route('/admin', methods=['POST'])
def admin_auth():
        # user attempt to login as admin via form data
        if request.method == 'POST':
                return admin_login(request)
