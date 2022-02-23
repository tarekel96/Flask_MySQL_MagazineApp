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
                print("in here")
                username = req_dict["username"]
                print(f"{username=}")
                # db_helper.single_query_payload(session, )
                print('here 0')
                # cursor = session.execute(RE_QUERIES["CUST_GET_BY_USERNAME"], (username, )).cursor
                cursor = session.execute(RE_QUERIES["CUST_GET_TEST"]).cursor
                # db.get_record(RE_QUERIES["CUST_GET_BY_USERNAME"], tuple([username, ]), "username")
                print('here 1')
                try:
                        print("before data")
                        # data = db_helper.get_record(cursor, RE_QUERIES["CUST_GET_BY_USERNAME"],\
                        #         (username,), "username")
                        data = db_helper.get_record_no_payload(cursor, RE_QUERIES["CUST_GET_TEST"])
                        print("after data", data)
                        json_data = json.dumps(data)
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
