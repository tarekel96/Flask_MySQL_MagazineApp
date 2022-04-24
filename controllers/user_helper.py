from os import stat
from xxlimited import new
from queries.read.queries import QUERIES as RE_QUERIES
from controllers.db_helper import db_helper
from controllers.helper import helper
import json
import os
import mysql.connector
from flask import Response
from sqlalchemy import create_engine

engine = create_engine(f'mysql://{os.getenv("user")}:{os.getenv("password")}@{os.getenv("hostname")}/{os.getenv("database")}')

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
        @staticmethod
        def add_subs(request, id):
                response = Response()
                response.headers.add("Access-Control-Allow-Origin", "*")
                req_dict = json.loads(request.data)
                print(req_dict)
                date = req_dict['date']
                new_mag_ids = req_dict['new_mag_ids']
                records = []
                for mag_id in new_mag_ids:
                        curr_record  = (mag_id, int(id), 10, 1, date, "2099-01-01") 
                        records.append(curr_record)
                records = tuple(records)
                print(records)
                query = '''INSERT INTO subscription
                (magID, custID, numMagsMailed, paymentCompleted, startDate, endDate)
                VALUES (%s, %s, %s, %s, %s, %s)
                '''
                try:
                        with engine.connect() as con:
                                print(records)
                                con.execute(query, records)
                        response = Response("{\n'message': success\n}", status=201, mimetype='application/json')
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
               

