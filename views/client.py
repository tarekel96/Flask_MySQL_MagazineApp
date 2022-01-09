from controllers.ui_helper import ui_helper
from controllers.db_helper import db_helper
from queries.read.queries import QUERIES as RE_QUERIES
from queries.delete.queries import QUERIES as DE_QUERIES
from queries.update.queries import QUERIES as UP_QUERIES
from queries.create.queries import QUERIES as CE_QUERIES
from datetime import date

# user specific methods which are all done by username
def present_options():
        msg = "Choose from the following options:\n1) View all subscriptions.\
                \n2) View magazine catalog.\n3) Add subscription (by id). \
                \n4) Update contact method.\n5) Delete account. \
                \n0) Logout."
        return  db_helper.str_to_int(ui_helper.get_choice([i for i in range(0, 6)], msg=msg))

# view subscriptions
def get_subscriptions(db, username):
        db_helper.print_records(db.get_records_payload(RE_QUERIES["SUB_GET_BY_USERNAME"], (username, )), 
        ["Magazine, Cost (per month), Start Date, End Date"])

# view magazine catalog
def display_mag_catalog(db):
        db_helper.print_records(db.get_records(RE_QUERIES["MAGS_GET_CATALOG"]), 
        ["Order ID, Magazine Name, Cost, Category"])

# add subscriptions (add by username and magazine id) -> transaction with rollback capability
def add_subscription(db, username, mag_id):
        # committing before transaction begins (serves as a checkpoint)
        db.connection.commit()
        price = db.get_record(RE_QUERIES["MAG_PRICE_BY_ID"], (int(mag_id), ), "mag_id")
        if price == None:
                print("Error: An invalid magazine id was entered.")
                return
        price = price[0]
        # pay for magazine, which enters amount payed in payment
        user_choice = ui_helper.get_choice([i for i in range(2)], f"This magazine costs {price}.Please confirm below if you would like to pay for it.\nEnter 1 for yes or 0 for no:")
        if user_choice == 0:
                return
        cust_id = db.get_record(RE_QUERIES["CUST_GET_BY_USERNAME"], (username, ), "username")[0]
        # and triggers an update to the subscription table
        db.single_insert(CE_QUERIES["SUB_ADD_ONE"], (int(mag_id), int(cust_id), 1, 1, date.today()), True)
        # prompt user if they want to cancel transaction
        commit_transaction = ui_helper.get_choice([i for i in range(2)], f"Transaction processed.\nEnter 1 to continue or 0 to cancel transaction:")
        if commit_transaction == 0:
                db.connection.rollback()
                print("Success: Transaction has be undone (rolledback).")
        elif commit_transaction == 1:
                db.connection.commit()
                print("Success: Transaction has saved (committed).")


# update contact method ()
def update_contact_type(db, username):
        msg = "Choose from the following notification options:\
                \n1) Text message.\
                \n2) Phone call."
        choice = db_helper.str_to_int(ui_helper.get_choice([i for i in range(1, 3)], msg=msg))
        if choice == 2:
                choice = 0
        db.single_query_payload(UP_QUERIES["UPDATE_CONTACT"], (choice, username))

# delete account (does a soft delete)
def delete_account(db, username):
        db.single_query_payload(DE_QUERIES["SOFT_DELETE"], (0, username))
