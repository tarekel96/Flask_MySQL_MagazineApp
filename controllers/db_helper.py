from os import stat
import pandas as pd

# helper class for preparing data for db operations
class db_helper():

        # given a list of model instances, 
        # create list consisting of tuples of each model's fields 
        @staticmethod
        def get_record_list(models, return_id=False):
                rec_list = []
                for m in models:
                        rec_list.append(m.get_fields(return_id))
                return rec_list
        
        @staticmethod
        def is_duplicate(pk, models) -> bool:
                for m in models:
                        if m.get_id() == pk:
                                return True
                return False
        
        @staticmethod
        def str_to_int(s) -> int:
                try:
                        int(s)
                except ValueError as err:
                        print(f"Error: Cannot convert {s} to an int.\n{err}")
                        return None
                except TypeError as err:
                        print(f"Error: Cannot convert {s} to an int.\n{err}")
                        return None
                return int(s)

        @staticmethod
        def tuple_to_str(t) -> int:
                try:
                        str(t)
                except TypeError as err:
                        print(f"Error: Cannot convert {t} to a string.\n{err}")
                        return None
                return str(t)
        
        @staticmethod
        def print_records(result, col_names):
                print("\n****************************** Results: ******************************")
                header = ""
                for name in col_names:
                        header += name
                print(f"Columns: {header}")
                if type(result)==list:
                        for i, row in enumerate(result, start=1):
                                curr_row = ""
                                for col in row:
                                        curr_col = str(col) + ", "
                                        curr_row += curr_col
                                print(f"Record {i}: {curr_row}")
                        print("\n")
                else:
                        print(result)
        
        @staticmethod
        def generate_csv(result, col_names, file_path="admin_report.csv"):
                if len(result) != 0:
                        df = pd.DataFrame(result, columns=col_names)
                        df.to_csv(file_path, index=False)   
                        
        