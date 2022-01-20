import json
from flask import Response

# auth helper Class
class auth_helper():

        @staticmethod
        def admin_login(request):
                req_dict = json.loads(request.data)
                user_pw = req_dict['password']
                if user_pw == "password":
                        return Response("{\n'message': 'Is Authenticated'\n}", status=201, mimetype='application/json')
                else:
                        return Response("{\n'message': 'Error - Invalid Password'\n}", status=401, mimetype='application/json')