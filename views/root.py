from controllers.db_helper import db_helper
from controllers.ui_helper import ui_helper
from views.auth import *
from views.admin import *

starter_msg = "Choose from the following options (enter integer value only):\n"
exit_msg = "0) Exit\n"
# show user options
def start_options(msg="1) if you are a client user\n2) if you are a admin user\n3) View magazines available."):
    msg = starter_msg + exit_msg + msg
    return ui_helper.get_choice([i for i in range(4)], msg)

# while loop that executes for the duration of the program until user decides to login
def run_program(db):
    is_running = True
    exit = lambda: print("Goodbye"); False

    while is_running:
        user_choice = start_options()
        if user_choice == 1:
            msg = starter_msg + exit_msg
            client_choice = ui_helper.get_choice([i for i in range(3)], msg + "1) Login\n2) Signup")
            if client_choice == 0:
                is_running = exit()
            elif client_choice == 1:
                user_login(db)
            elif client_choice == 2:
                user_signup(db)
                print("Redirecting you to the main menu...")
        elif user_choice == 2:
            admin_login(db, starter_msg, exit_msg)
        elif user_choice == 3:
             db_helper.print_records(db.get_records(RE_QUERIES["MAGS_GET_CATALOG"]), ["Order ID, Magazine Name, Cost, Category"])
        elif user_choice == 0:
            is_running = exit()