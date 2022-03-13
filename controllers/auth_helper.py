import re
from queries.read.queries import QUERIES as RE_QUERIES
from controllers.db_helper import db_helper
import json
import mysql.connector
from flask import Response, jsonify

# auth helper Class
class auth_helper():

        @staticmethod
        def admin_login(request):
                req_dict = json.loads(request.data)
                user_pw = req_dict["password"]
                if user_pw == "password":
                        response = Response("{\n'message': 'Is Authenticated'\n}", status=201, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                else:
                        response = Response("{\n'message': 'Error - Invalid Password'\n}", status=401, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response

        @staticmethod
        def user_login(request, session):
                req_dict = json.loads(request.data)
                username = req_dict["username"]
                if username == None:
                        response = Response("{\n'message': 'Error - No username was provided.'\n}", status=400, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                password = req_dict["password"]
                if password == None:
                        response = Response("{\n'message': 'Error - No password was provided.'\n}", status=400, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                query = f"SELECT * FROM customer WHERE username = '{username}';"
                try:
                        cursor = session.execute(query).cursor
                except:
                        response = Response("{\n'message': 'Error - Unknown error with user login.'\n}", status=500, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                try:
                        data = db_helper.get_record_no_payload(cursor, query)
                        if data == None:
                                response = Response('''{\n"message": "Error - Username could not be found."\n}''', status=404, mimetype='application/json')
                                response.headers.add('Access-Control-Allow-Origin', '*')
                                return response
                        user = {
                                "user_id": data[0],
                                "user_first_name": data[1],
                                "user_last_name": data[2],
                                "user_username": data[3],
                                "user_password": data[4],
                                "user_start_date": str(data[5])[:10] # convert datetime obj -> str
                        }
                        if user["user_password"] != password:
                                response = Response('''{\n"message": "Error - An incorrect password was entered."\n}''', status=401, mimetype='application/json')
                                response.headers.add('Access-Control-Allow-Origin', '*')
                                return response
                        json_data = json.dumps(user)
                        response = Response(json_data, status=201, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                except:
                        response = Response("{\n'message': 'Error - Unknown Error.'\n}", status=500, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response

        @staticmethod
        def get_catalog(session):
                cursor = session.execute(RE_QUERIES["MAGS_GET_CATALOG"]).cursor
                try:
                        data = db_helper.get_records(cursor, RE_QUERIES["MAGS_GET_CATALOG"], ["magID", "magazineName", "cost", "category"])
                        json_data = json.dumps(data)
                        response = Response(json_data, status=201, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                except mysql.connector.Error as err:
                        response = Response("{\n'message': {err}\n}", status=500, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                except:
                        response = Response("{\n'message': 'Error - Unknown Error.'\n}", status=500, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response

        @staticmethod
        def get_customers(session):
                cursor = session.execute(RE_QUERIES["CUST_GET_ALL"]).cursor
                try:
                        data = db_helper.get_records(cursor, RE_QUERIES["CUST_GET_ALL"], ["custID", "firstName", "lastName", "userName"])
                        json_data = json.dumps(data)
                        response = Response(json_data, status=201, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                except mysql.connector.Error as err:
                        response = Response("{\n'message': {err}\n}", status=500, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
                except:
                        response = Response("{\n'message': 'Error - Unknown Error.'\n}", status=500, mimetype='application/json')
                        response.headers.add('Access-Control-Allow-Origin', '*')
                        return response
