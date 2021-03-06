import pandas as pd

# helper class for preparing data for db operations
class db_helper():
        
        @staticmethod
        def to_py_dict(lst, keys):
                ret = [ ]
                if len(lst) == 1:
                        curr_dict = {}
                        for i, attr in enumerate(lst):
                                curr_dict[keys[i]] = attr
                        return (curr_dict, )
                else:
                        for item in lst:
                                curr_dict = { }
                                for i, attr in enumerate(item):
                                        curr_dict[keys[i]] = attr 
                                ret.append(curr_dict)
                return ret

        @staticmethod
        # function to execute a single query with no payload
        def single_query(connection, cursor, query):
                try:
                        print(f"connection: {connection}")
                        cursor.execute(query)
                        connection.commit()
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        

        @staticmethod
         # function to execute a single query with no payload
        def single_query_payload(connection, cursor, query, payload):
                try:
                        cursor.execute(query, payload)
                        connection.commit()
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")

        @staticmethod
        # function to execute fetch records
        def get_records(cursor, query, keys):
                try:
                        cursor.execute(query)
                        results = cursor.fetchall()
                        dict_results = db_helper.to_py_dict(results, keys)
                        return dict_results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        
        @staticmethod
        # function that fetches the first element of tuple record which is always the id
        def get_record_ids(connection, cursor, query):
                try:
                        cursor.execute(query)
                        results = cursor.fetchall()
                        results = [i[0] for i in results]
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        
        @staticmethod
        # function to fetch a single record
        def get_record(cursor, query, payload, key):
                try:
                        cursor.execute(query, {key: payload[0]})
                        results = cursor.fetchone()
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        
        @staticmethod
        # function to fetch a single record
        def get_record_no_payload(cursor, query):
                try:
                        cursor.execute(query)
                        results = cursor.fetchone()
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")
        
        @staticmethod
        # function to fetch a single record
        def get_records_no_payload(cursor, query):
                try:
                        cursor.execute(query)
                        results = cursor.fetchall()
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")

        @staticmethod
        # function to execute fetch records
        def get_records_payload(cursor, query, payload):
                try:
                        cursor.execute(query, payload)
                        results = cursor.fetchall()
                        return results
                except Exception as err:
                        print(f"Error: An error occurred in trying execute a single query.\n{err}")

        @staticmethod
        # function for bulk inserting records
        def single_insert(connection, cursor, query, record, do_not_commit=False):
                try:
                        cursor.execute(query,record)
                        if do_not_commit == False:
                                connection.commit()
                        print("Query executed..")
                except Exception as err:
                        print(f"Error: An error occurred in trying bulk insert records.\n{err}")

        @staticmethod
        # function for bulk inserting records
        def bulk_insert(connection, cursor, query, records):
                try:
                        cursor.executemany(query,records)
                        connection.commit()
                        print("Query executed..")
                except Exception as err:
                        print(f"Error: An error occurred in trying bulk insert records.\n{err}")

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
                        
        