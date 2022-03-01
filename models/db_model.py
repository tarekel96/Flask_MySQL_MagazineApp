import mysql.connector
print(f'{mysql.connector=}')
import os
from controllers.db_helper import db_helper
from queries.delete.queries import QUERIES as DEL_QUERIES
from queries.create.queries import QUERIES as CRE_QUERIES
# Gets the MySQL DB credentials from a .env file
from dotenv import load_dotenv
load_dotenv()

class DB_Model():
        def __init__(self, parser, delete_tables=True, cloud=False): # constructor with connection path to db
                # parser object that contains DB records as Python objects
                self.parser = parser
                # dict containing keys with a value of a list of their respective records
                self.records = {
                        "customer": None,
                        "magazine": None,
                        "payment": None,
                        "profile": None,
                        "subscription": None
                }
                self.delete_tables = delete_tables
                try:
                        if(not cloud):
                                self.connection = mysql.connector.connect(
                                        # the IP Address of GCP MySQL Instance
                                        host=os.getenv("hostname"), # all of these come from a .env file
                                        user=os.getenv("user"),
                                        password=os.getenv("password"),
                                        database=os.getenv("database"),
                                        port=db_helper.str_to_int(os.getenv("port")),
                                        auth_plugin='mysql_native_password'
                                )
                        elif(cloud):
                                self.connection = mysql.connector.connect(
                                        host="34.122.83.45", # os.getenv("cloud_host"), # can also get these values from a .env file for security
                                        user="rao",  # os.getenv("cloud_username"),
                                        password="password1",  # os.getenv("cloud_password"),
                                        database="magazine_subscriptions",  # os.getenv("cloud_database")
                                )
                        
                        
                        self.cursor = self.connection.cursor()
                        print("Connection made.")
                        if self.delete_tables == True:
                                self.check_tables()
                                self.check_views()
                                self.create_tables()
                                self.create_views()
                                self.parse_data()
                        self.check_procedures()
                        self.create_procedures()
                except mysql.connector.Error as err:
                        print(f"Error: Unable to connect to MySQL.\nPlease re-renter the password for host: {os.getenv('hostname')} and user: root.")
        
        def parse_data(self):
                # parses table records / instances into Python lists
                self.parser.process_file()
                self.assign_table_recs(self.parser.magazines, "magazine")
                self.bulk_insert(CRE_QUERIES["MAG_INSERT_ALL"], self.records["magazine"])
                # assigning customer records
                self.assign_table_recs(self.parser.customers, "customer")
                self.bulk_insert(CRE_QUERIES["CUST_INSERT_ALL"], self.records['customer'])
                # # assigning profile records
                self.assign_table_recs(self.parser.profiles, "profile")
                self.bulk_insert(CRE_QUERIES["PRO_INSERT_ALL"], self.records['profile'])
                # # assigning subscription records
                self.assign_table_recs(self.parser.subscriptions, "subscription")
                self.bulk_insert(CRE_QUERIES["SUB_INSERT_ALL"], self.records['subscription'])
                # # assigning payment records
                self.assign_table_recs(self.parser.payments, "payment")
                self.bulk_insert(CRE_QUERIES["PAY_INSERT_ALL"], self.records['payment'])

        
        # if the tables exist, they will be dropped
        def check_tables(self):
                self.single_query(DEL_QUERIES["PAY_CHECK_TABLE"])
                self.single_query(DEL_QUERIES["SUB_CHECK_TABLE"])
                self.single_query(DEL_QUERIES["PRO_CHECK_TABLE"])
                self.single_query(DEL_QUERIES["CUST_CHECK_TABLE"])
                self.single_query(DEL_QUERIES["MAG_CHECK_TABLE"])

        # creates all of the tables
        def create_tables(self):
                print("Creating tables...")
                self.single_query(CRE_QUERIES["MAG_CREATE_TABLE"])
                self.single_query(CRE_QUERIES["CUST_CREATE_TABLE"])
                self.single_query(CRE_QUERIES["PRO_CREATE_TABLE"])
                self.single_query(CRE_QUERIES["SUB_CREATE_TABLE"])
                self.single_query(CRE_QUERIES["PAY_CREATE_TABLE"])
                print("Tables have been created.")
        
        def create_procedures(self):
                self.single_query(self.single_query(CRE_QUERIES["CREATE_CITY_PROCEDURE"]))

        def check_procedures(self):
                self.single_query(DEL_QUERIES["CHECK_CITY_PROCEDURE"])

        def create_views(self):
                self.single_query(self.single_query(CRE_QUERIES["CREATE_CUSTPRO_VIEW"]))
                self.single_query(self.single_query(CRE_QUERIES["CREATE_MAGSUB_VIEW"]))

        def check_views(self):
                self.single_query(DEL_QUERIES["CHECK_CUSTPRO_VIEW"])
                self.single_query(DEL_QUERIES["CHECK_MAGSUB_VIEW"])

        # function to execute a single query with no payload
        def single_query(self,query):
                try:
                        self.cursor.execute(query)
                        self.connection.commit()
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        
         # function to execute a single query with no payload
        def single_query_payload(self,query, payload):
                try:
                        self.cursor.execute(query, payload)
                        self.connection.commit()
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")

        # assigns list of tuples to respective key of self.records dict
        def assign_table_recs(self, model_list, table_name):
                table_name = str(table_name)
                self.records[table_name] = db_helper.get_record_list(model_list, True)

        # function to execute fetch records
        def get_records(self,query):
                try:
                        self.cursor.execute(query)
                        results = self.cursor.fetchall()
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        
        # function that fetches the first element of tuple record which is always the id
        def get_record_ids(self,query):
                try:
                        self.cursor.execute(query)
                        results = self.cursor.fetchall()
                        results = [i[0] for i in results]
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        
        # function to fetch a single record
        def get_record(self,query,payload, key):
                try:
                        # print('here')
                        # print(payload[0])
                        # print(f"SELECT * FROM customer WHERE username = {payload[0]};")
                        # query = self.cursor.execute(f"SELECT * FROM customer WHERE username = '{payload[0]}';")
                        # print(query)
                        # self.cursor.execute(query)
                        self.cursor.execute(query, {key: payload[0]})
                        results = self.cursor.fetchone()
                        print(f'results\n{results}')
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")

        # function to execute fetch records
        def get_records_payload(self,query,payload):
                try:
                        self.cursor.execute(query, payload)
                        results = self.cursor.fetchall()
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")

        # function for bulk inserting records
        def single_insert(self, query, record, do_not_commit=False):
                try:
                        self.cursor.execute(query,record)
                        if do_not_commit == False:
                                self.connection.commit()
                        print("Query executed..")
                except Exception as err:
                        print(f"Error: An error occurred in trying bulk insert records.\n{err}")

        # function for bulk inserting records
        def bulk_insert(self, query, records):
                try:
                        self.cursor.executemany(query,records)
                        self.connection.commit()
                        print("Query executed..")
                except Exception as err:
                        print(f"Error: An error occurred in trying bulk insert records.\n{err}")

        def print_records(self):
                record_lists = self.records.values()
                if not any(record_lists):
                        print("No records exit")
                        return
                str_p = "\n"
                for key, value in self.records.items():
                        if value != None:
                                str_p += "\n"
                                str_p += f"******************************List of {key}:******************************\n"
                                for r in value:
                                        str_p += "\n"
                                        str_p += db_helper.tuple_to_str(r)
                                str_p += "\n"
                print(str_p)

       # close connection 
        def destructor(self):
                self.connection.close()

        '''
        # order of table creation
          1) AGENCY
          2) EXPEDITION
          3) ASTRONAUT relies --> AGENCY
          4) ASTRO_EXP relies --> EXPEDITION & ASTRONAUT
        '''