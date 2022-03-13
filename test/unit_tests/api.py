# reset system path for sub directory
import sys
import os
from dotenv import load_dotenv
load_dotenv()

PROJ_DIR_ABS_PATH = os.getenv("PROJ_DIR_ABS_PATH")

try:
        from models.db_model import DB_Model
except ModuleNotFoundError as err:
        print("Fixing sys path..")
        sys.path.insert(0, PROJ_DIR_ABS_PATH)

import requests

# test auth api routes ~ base URL: http://127.0.0.1:5000/

# /auth
def auth_index():
        response = requests.get("http://127.0.0.1:5000/auth")
        assert response.status_code == 201

# /auth/admin (SUCCESS)
def auth_admin_login():
        headers = {'Content-type': 'application/json'}
        response = requests.post("http://127.0.0.1:5000/auth/admin", json={"password": "password"}, headers=headers)
        assert response.status_code == 201

# /auth/admin (FAILURE)
def auth_admin_login_fail():
        headers = {'Content-type': 'application/json'}
        response = requests.post("http://127.0.0.1:5000/auth/admin", json={"password": "password1"}, headers=headers)
        assert response.status_code == 401

# /auth/login (SUCCESS)
def auth_user_login():
        headers = {'Content-type': 'application/json'}
        response = requests.post("http://127.0.0.1:5000/auth/login", json={"username": "6LiI-Dorothy","password": "!9Fq"}, headers=headers)
        assert response.status_code == 201

# /auth/login (FAILURE)
def auth_user_login_fail():
        headers = {'Content-type': 'application/json'}
        response = requests.post("http://127.0.0.1:5000/auth/login", json={"username": "6LiI-Dorothy","password": "1!9Fq"}, headers=headers)
        assert response.status_code == 401


# /auth/magazine_catalog
def auth_get_catalog():
        headers = {'Content-type': 'application/json'}
        response = requests.get("http://127.0.0.1:5000/auth/magazine_catalog", headers=headers)
        assert response.status_code == 201

# /auth/customers
def auth_get_customers():
        headers = {'Content-type': 'application/json'}
        response = requests.get("http://127.0.0.1:5000/auth/customers", headers=headers)
        assert response.status_code == 201

# main
def main():
        tests = [auth_index, auth_admin_login, auth_admin_login_fail, auth_user_login, auth_user_login_fail, auth_get_catalog, auth_get_customers]
        for test in tests:
                test()
        print("Tests have been run.")

if __name__ == "__main__":
        main()