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
