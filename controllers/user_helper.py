from queries.read.queries import QUERIES as RE_QUERIES
from controllers.db_helper import db_helper
from controllers.helper import helper
import json
import mysql.connector
from flask import Response, jsonify

# auth helper Class
class user_helper():

        @staticmethod
        def get_subscriptions(session, id):
                query = f'''
                        SELECT m.magID, m.magazineName, m.category, m.cost, s.startDate, s.endDate, s.paymentCompleted
                        FROM customer AS c
                        INNER JOIN subscription AS s ON s.custID = c.custID
                        INNER JOIN magazine AS m ON m.magID = s.magID
                        WHERE c.custID = {id};'''
                cursor = session.execute(query).cursor
                try:
                        data = db_helper.get_records_no_payload(cursor, query)
                        data = helper.datetime_to_str(data, [4, 5])
                        data_lst = db_helper.to_py_dict(data, ["id", "name", "category", "price", "startDate", "endDate", "subscribed"])
                        json_data = json.dumps(data_lst)
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
