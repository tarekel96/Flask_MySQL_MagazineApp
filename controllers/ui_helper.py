from controllers.db_helper import db_helper

class ui_helper():

        @staticmethod
        def get_choice(lst, msg, break_line=True):    # there is a bug in here somewhere
                lam = lambda: "\n" if break_line == True else " "
                end_loop = False
                while end_loop == False:
                        choice = input(msg + lam())
                        if choice.isdigit() == False:
                                print("Incorrect option (enter an int). Try again")
                                continue
                        if int(choice) not in lst:
                                print("Incorrect option. Try again")
                                continue
                        end_loop = True
                return db_helper.str_to_int(choice)
        
        @staticmethod
        def get_str(msg):
                user_input = input(msg)
                return user_input
        
        @staticmethod
        def get_phone_no():
                lst = [i for i in range(10)]
                end_loop = False
                while end_loop == False:
                        choice = input("Enter a 10 digit phone number of this format: XXX-XXX-XXXX:\n")
                        if False in [i.isdigit() == True for i in choice.replace('-', '')]:
                                print("Incorrect option (enter integers). Try again")
                                continue
                        if len(choice) != 12:
                                print("Incorrect number of digits. Try again")
                                continue
                        end_loop = True
                return choice
        
        @staticmethod
        def get_valid_year(yrs):
                str_yrs = [str(i) for i in yrs]
                is_valid = False
                prt_years = ""
                for y in yrs:
                        str_add = str(y) + " "
                        prt_years += str_add
                user_year = ""
                while is_valid == False:
                        user_year = input(f"Choose one of the following years to filter magazine results by:\
                        \n{prt_years}\n")
                        if user_year in str_yrs:
                                is_valid = True
                        print(f"Error: Invalid choice, there is no magazine record for {user_year}")
                        continue
                return user_year

        @staticmethod
        def get_valid_city(cities):
                cits = [s for s in cities]
                is_valid = False
                prt_cities = ""
                for s in cits:
                        str_add = str(s) + " "
                        prt_cities += str_add
                user_city = ""
                while is_valid == False:
                        user_city = input(f"Choose one of the following cities to filter customer results by: \
                        \n{prt_cities}\n")
                        if user_city in cits:
                                is_valid = True
                                break
                        print(f"Error: Invalid choice, there is no city record for {user_city}")
                        continue
                return user_city

        @staticmethod
        def get_valid_attr(attributes):
                is_valid = False
                prt_attrs = ""
                for s in attributes:
                        str_add = str(s) + " "
                        prt_attrs += str_add
                user_attr = ""
                while is_valid == False:
                        user_attr = input(f"Choose which attribute you would like to index:\
                        \n{prt_attrs}\n")
                        if user_attr in attributes:
                                is_valid = True
                                break
                        print(f"Error: Invalid choice, there is no attribute choice - {user_attr}")
                        continue
                return user_attr    
                