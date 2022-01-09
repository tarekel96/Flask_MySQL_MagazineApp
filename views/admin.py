from controllers.ui_helper import ui_helper
from controllers.db_helper import db_helper
from queries.read.queries import QUERIES as RE_QUERIES
from queries.delete.queries import QUERIES as DE_QUERIES
from queries.create.queries import QUERIES as CE_QUERIES

def stat_options():
        msg = "Choose from the following options:\n1) View all magazines.\
                \n2) View all customers.\n3) View average costs of magazines by category. \
                \n4) View magazines by year.\n5) View customers' info by city. \
                \n6) View all account information of customers.\
                \n7) View all magazine information.\n8) View most popular category by zip code."
        return db_helper.str_to_int(ui_helper.get_choice([i for i in range(1, 9)], msg=msg))

def handle_stat_options(choice, db):
        last_query_records, last_query_headers = [], []
        if choice == 1:
                last_query_records, last_query_headers = print_all_magazines(db)
        elif choice == 2:
                last_query_records, last_query_headers = print_all_customers(db)
        elif choice == 3:
                last_query_records, last_query_headers = print_mags_avg_cost_cat(db)
        elif choice == 4:
                last_query_records, last_query_headers = print_magazines_by_year(db)
        elif choice == 5:
                last_query_records, last_query_headers = print_customers_by_city(db)
        elif choice == 6:
                last_query_records, last_query_headers = view_all_custpro(db)
        elif choice == 7:
                last_query_records, last_query_headers = view_all_magsub(db)
        elif choice == 8:
                last_query_records, last_query_headers = print_max_cat_zip(db)
        prompt_report(last_query_records, last_query_headers)
                

def print_all_customers(db):
        db_helper.print_records(db.get_records(RE_QUERIES["CUST_GET_ALL"]), ["First Name, Last Name, Username"])
        return db.get_records(RE_QUERIES["CUST_GET_ALL"]), ["First Name", "Last Name", "Username"]

def print_all_magazines(db):
        db_helper.print_records(db.get_records(RE_QUERIES["MAGS_GET_ALL"]), ["Magazine Name"])
        return db.get_records(RE_QUERIES["MAGS_GET_ALL"]), ["Magazine Name"]

def print_mags_avg_cost_cat(db):
        db_helper.print_records(db.get_records(RE_QUERIES["MAGS_AVG_COST_BY_CAT"]), ["Category, Count of Category, Average Cost"])
        return db.get_records(RE_QUERIES["MAGS_AVG_COST_BY_CAT"]), ["Category", "Count of Category", "Average Cost"]

def print_magazines_by_year(db):
        dist_years = db.get_records(RE_QUERIES["MAGS_GET_DIST_YEARS"])
        pars_dist_years = [i[0] for i in dist_years]
        pars_dist_years = sorted(pars_dist_years, reverse=True)
        year_input = ui_helper.get_valid_year(pars_dist_years)
        year_input = str(year_input) + "-%"
        db_helper.print_records(db.get_records_payload(RE_QUERIES["MAGS_COUNT_BY_YEAR"], (year_input, )), [f"Number of Magazines (Year - {year_input})"])
        return db.get_records_payload(RE_QUERIES["MAGS_COUNT_BY_YEAR"], (year_input, )), [f"Number of Magazines (Year - {year_input})"]

def print_customers_by_city(db):
        dist_cities = db.get_records(RE_QUERIES["GET_DIST_CITIES"])
        pars_dist_cities = [i[0] for i in dist_cities]
        pars_dist_cities = sorted(pars_dist_cities)
        city_input = ui_helper.get_valid_city(pars_dist_cities)
        db.cursor.callproc("CustByCity", (city_input, ))
        temp_results = db.cursor.stored_results()
        results = []
        for r in temp_results:
                results = [e for e in r.fetchall()]
        db_helper.print_records(results, ["customer_id full_name username date_joined"])
        return results, ["customer_id", "full_name", "username", "date_joined"]

def view_all_custpro(db):
        db_helper.print_records(db.get_records(RE_QUERIES["GET_ALL_CUSTPRO"]),
         ["customer_id profile_id full_name username password phone_no zip_code state city street_addr contact_type date_acc_updated active date_acc_created date_acc_deleted"])
        return db.get_records(RE_QUERIES["GET_ALL_CUSTPRO"]),["customer_id", "profile_id", "full_name", "username", "password", "phone_no", "zip_code", "state", "city", "street_addr", "contact_type", "date_acc_updated", "active", "date_acc_created", "date_acc_deleted"]

def view_all_magsub(db):
        db_helper.print_records(db.get_records(RE_QUERIES["GET_ALL_MAGSUB"]),
         ["mag_id mag_name mag_cost mag_category cust_id num_mags_received sub_id start_date end_date"])
        return db.get_records(RE_QUERIES["GET_ALL_MAGSUB"]), ["mag_id", "mag_name", "mag_cost", "mag_category", "cust_id", "num_mags_received", "sub_id", "start_date", "end_date"]

def print_max_cat_zip(db):
        db_helper.print_records(db.get_records(RE_QUERIES["MAGS_MAX_BUY_CAP"]), ["Category, Zip Code"])
        return db.get_records(RE_QUERIES["MAGS_MAX_BUY_CAP"]), ["Category", "Zip Code"]

def prompt_report(last_query_records, last_query_headers):
        msg = "Would you like to generate a report of the results:\
                \n1) Yes.\
                \n2) No."
        choice = db_helper.str_to_int(ui_helper.get_choice([i for i in range(1, 3)], msg=msg))

        if choice == 1:
                db_helper.generate_csv(last_query_records, last_query_headers)
                print("Report as been successfully generated under admin_report.csv")

def generatre_report(last_query_records, last_query_headers):
        if len(last_query_records) == 0 or len(last_query_headers) == 0:
                print("Error: Please execute a query before attempting to generate a report.")
                return
        db_helper.generate_csv(last_query_records, last_query_headers)

def index_options():
        msg = "Choose which table would like to add an index from:\n1) Magazine.\
                \n2) Customer.\n3) Profile. \
                \n4) Payment.\n5) Subscription."
        return db_helper.str_to_int(ui_helper.get_choice([i for i in range(1, 6)], msg=msg))

def handle_index_options(choice, db):
        if choice == 1:
                create_mag_index(db)
        elif choice == 2:
                create_cust_index(db)
        elif choice == 3:
                print("Error: Indexing is not available for profile yet.\nThis will implemented in the future.")
                pass
        elif choice == 4:
                print("Error: Indexing is not available for payment yet.\nThis will implemented in the future.")
                pass
        elif choice == 5:
                print("Error: Indexing is not available for subscription yet.\nThis will implemented in the future.")
                pass

def create_mag_index(db):
        index_attr = ui_helper.get_valid_attr(["magazineName", "cost", 
        "category"])
        index_name = ""
        if index_attr == "magazineName":
                index_name = "mag_name"
        elif index_attr == "cost":
                index_name = "mag_cost"
        elif index_attr == "cost":
                index_name = "mag_cat"
        valid_index = db.get_records_payload(DE_QUERIES["CHECK_MAG_INDEX"], (index_name, ))
        if len(valid_index) != 0:
                print(f"Error an index named {index_name} on the magazine table for {index_attr} already exists.")
                return
        if index_name == "mag_name":
                db.single_query(CE_QUERIES["CREATE_INAME_MAG"])
        elif index_name == "mag_cost":
                db.single_query(CE_QUERIES["CREATE_ICOST_MAG"])
        elif index_name == "mag_cat":
                db.single_query(CE_QUERIES["CREATE_ICAT_MAG"])

def create_cust_index(db):
        index_attr = ui_helper.get_valid_attr(["username"])
        index_name = ""
        if index_attr == "username":
                index_name = "cust_username"
        valid_index = db.get_records_payload(DE_QUERIES["CHECK_CUST_INDEX"], (index_name, ))
        if len(valid_index) != 0:
                print(f"Error an index named {index_name} on the customer table for {index_attr} already exists.")
                return
        db.single_query(CE_QUERIES["CREATE_IUSERNAME_CUST"])