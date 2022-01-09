# represents an Agency table of the DB
class Subscription():
        def __init__(self, sub_id, mag_id, cust_id, num_magazines_mailed, payment_completed, start_date, end_date) -> None: #specified return type, this is void
                self.sub_id = sub_id # primary key
                self.mag_id = mag_id # foreign key (magazine) that this subscription belongs
                self.cust_id = cust_id # foreign key (customer) that this subscription belongs
                self.num_magazines_mailed = num_magazines_mailed
                self.payment_completed = payment_completed
                self.start_date = start_date
                self.end_date = end_date


        def set_id(self, sub_id):
                self.sub_id = sub_id
                
        def get_id(self):
                return self.sub_id

        def get_fields(self, return_id = False):
                if self.sub_id == None or return_id == False:
                        return tuple([self.mag_id, self.cust_id, self.num_magazines_mailed, self.payment_completed, self.start_date, self.end_date])
                return tuple([self.sub_id, self.mag_id, self.cust_id, self.num_magazines_mailed, self.payment_completed, self.start_date, self.end_date])

        def __str__(self) -> str:
            str_ret = f"\nSubscription:\nID: {str(self.sub_id)}"
            str_ret += f"\nMagazine ID: {self.mag_id}"
            str_ret += f"\nCustomer ID: {str(self.cust_id)}"
            str_ret += f"\nNumber of Magazines Mailed: {self.num_magazines_mailed}"
            str_ret += f"\nPayment Completed?: {self.payment_completed}"
            str_ret += f"\nStart Date: {str(self.start_date)}"
            str_ret += f"\nEnd Date: {str(self.end_date)}"

            
            return str_ret