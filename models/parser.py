# import Python classes that represent the MySQL Tables
# from record_types.Customer import Customer
import sys
import os

from dotenv import load_dotenv
load_dotenv()

PROJ_DIR_ABS_PATH = os.getenv("PROJ_DIR_ABS_PATH")

try:
        from controllers.db_helper import db_helper
except ModuleNotFoundError as err:
        print("Fixing sys path..")
        sys.path.insert(0, PROJ_DIR_ABS_PATH)

from models.record_types.Customer import Customer
from models.record_types.Magazine import Magazine
from models.record_types.Payment import Payment
from models.record_types.Profile import Profile
from models.record_types.Subscription import Subscription
# import helper
from controllers.db_helper import db_helper

# Python class for parsing the csv data into Python data structures
class Parser():
        def __init__(self, file_name="data/RandData.csv"):
                self.temp_file = None
                self.file_name = file_name
                # validate file name is valid
                try:
                        self.temp_file = open(self.file_name , 'r')
                        print(f"File - {self.file_name} is a valid file to read from.")
                # if error, let user know
                except OSError as err:
                        print(f"Error: could not open file - {self.file_name }.\n{err}")
                        return
                # if no error, close the file
                finally:
                        self.temp_file.close()
                self.temp_file = None
                
                # ***** FIELDS *****

                # lists that store the instances of the tables
                self.customers = []
                self.magazines = []
                self.payments = []
                self.profiles = []
                self.subscriptions = []

        # ***** METHODS *****

        def process_file(self):
                with open(self.file_name, 'r') as file:
                        # next skips the first line
                        next(file)
                        for index, curr_line in enumerate(file, start=1):
                                # list of values from csv file
                                curr_line_list = curr_line.strip().split(",")
                                self.process_curr_list(curr_line_list)
        
        def process_curr_list(self, curr_line_list):
                # declare curr attr vars
                cur_customer = None
                cur_magazine = None
                cur_profile = None
                cur_subscription = None
                cur_payment = None
                        
                # ***** Create Model Instances *****
                cur_customer = Customer(curr_line_list[0], curr_line_list[1], curr_line_list[2], curr_line_list[3],curr_line_list[4],curr_line_list[5])
                
                cur_magazine = Magazine(curr_line_list[6],curr_line_list[7],curr_line_list[8],curr_line_list[34],curr_line_list[9],curr_line_list[10])

                cur_profile = Profile(curr_line_list[11], curr_line_list[0], curr_line_list[12], curr_line_list[13], curr_line_list[14], curr_line_list[15], curr_line_list[16], curr_line_list[17], curr_line_list[20], curr_line_list[21], curr_line_list[19], curr_line_list[18])
                
                cur_subscription = Subscription(curr_line_list[22], curr_line_list[6], curr_line_list[0], curr_line_list[23], curr_line_list[24], curr_line_list[25], curr_line_list[26])
                
                cur_payment = Payment(curr_line_list[27], curr_line_list[22], curr_line_list[28], curr_line_list[30], curr_line_list[29], curr_line_list[31], curr_line_list[32], curr_line_list[33])
                
                
                
                # append model instances to their respective lists
                        # these are only checked by id, FIXME
                if db_helper.is_duplicate(cur_customer.cust_id, self.customers) == False:
                        self.customers.append(cur_customer)
                        
                if db_helper.is_duplicate(cur_magazine.mag_id, self.magazines) == False:
                        self.magazines.append(cur_magazine)
                        
                if db_helper.is_duplicate(cur_profile.cust_id, self.profiles) == False:
                        self.profiles.append(cur_profile)
                        
                if db_helper.is_duplicate(cur_subscription.sub_id, self.subscriptions) == False:
                        self.subscriptions.append(cur_subscription)
                        
                if db_helper.is_duplicate(cur_payment.pay_id, self.payments) == False:
                        self.payments.append(cur_payment)                  
                        
        def get_customer_by_id(self, id):
                for cur_customer in self.customers:
                        if cur_customer.get_id() == id:
                                return cur_customer
        
        def get_payment_by_id(self, id):
                for cur_payment in self.payments:
                        if cur_payment.get_id() == id:
                                return cur_payment
                
        
        def get_profile_by_id(self, id):
                for cur_profile in self.profiles:
                        if cur_profile.get_id() == id:
                                return cur_profile
                
        
        def get_subscription_by_id(self, id):
                for cur_subscription in self.subscriptions:
                        if cur_subscription.get_id() == id:
                                return cur_subscription
                
        def get_magazine_by_id(self, id):
                for cur_magazine in self.magazines:
                        if cur_magazine.get_id() == id:
                                return cur_magazine

        def __str__(self) -> str:
            str = "\n"
            str += f"******************************List of Customers:******************************\n"
            customer_str = [i.__str__() for i in self.customers]
            for i in customer_str:
                    str += i
                    str += "\n"
            str += "\n"

            str += f"\n******************************List of Payments:******************************\n"
            payment_str = [i.__str__() for i in self.payments]
            for i in payment_str:
                    str += i
                    str += "\n"
            str += "\n"

            str += f"\n******************************List of Profiles:******************************\n"
            profile_str = [i.__str__() for i in self.profiles]
            for i in profile_str:
                    str += i
                    str += "\n"
            str += "\n"

            str += f"\n******************************List of Subscriptions:******************************\n"
            subscription_str = [i.__str__() for i in self.subscriptions]
            for i in subscription_str:
                    str += i
                    str += "\n"
            str += "\n"

            str += f"\n******************************List of Magazines:******************************\n"
            magazine_str = [i.__str__() for i in self.magazines]
            for i in magazine_str:
                    str += i
                    str += "\n"
            str += "\n"

            return str
            