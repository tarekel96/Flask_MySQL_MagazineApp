# auth helper methods
def admin_login(request):
        user_pw = request.form.get('password')
        if user_pw == "password":
                return "Is authenticated."
        else:
                return "Error: Invalid password."