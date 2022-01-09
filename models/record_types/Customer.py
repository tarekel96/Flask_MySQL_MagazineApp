# represents an Agency table of the DB
class Customer():
        def __init__(self, cust_id, first_name, last_name, username, password, rec_create_stamp) -> None:
                self.cust_id = cust_id # primary key
                self.first_name = first_name
                self.last_name = last_name
                self.username = username
                self.password = password
                self.rec_create_stamp = rec_create_stamp # date record created

        def set_id(self, cust_id):
                self.cust_id = cust_id
                
        def get_id(self):
                return self.cust_id

        def get_fields(self, return_id = False):
                if self.cust_id == None or return_id == False:
                        return tuple([self.first_name, self.last_name, self.username, self.password, self.rec_create_stamp])
                return tuple([self.cust_id, self.first_name, self.last_name, self.username, self.password, self.rec_create_stamp])

        def __str__(self) -> str:
            str_ret = f"\nCustomer:\nID: {str(self.cust_id)}"
            str_ret += f"\nFirst Name: {self.first_name}"
            str_ret += f"\nLast Name: {self.last_name}"
            str_ret += f"\nUsername: {self.username}"
            str_ret += f"\nPassword: {self.password}"
            str_ret += f"\nDate Record Created: {str(self.rec_create_stamp)}"
            
            return str_ret