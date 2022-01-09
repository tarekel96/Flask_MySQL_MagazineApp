# represents an Agency table of the DB
class Payment():
        def __init__(self, pay_id, sub_id, payment_amount, payment_date, payment_type, card_number, card_code, rec_create_stamp) -> None: #specified return type, this is void
                self.pay_id = pay_id # primary key, payment id
                self.sub_id = sub_id # foreign key to subscription that this payment belongs
                self.payment_amount = payment_amount
                self.payment_date = payment_date
                self.payment_type = payment_type 
                self.card_number = card_number 
                self.card_code = card_code 
                self.rec_create_stamp = rec_create_stamp # date record created

        def set_id(self, pay_id):
                self.pay_id = pay_id
                
        def get_id(self):
                return self.pay_id

        def get_fields(self, return_id = False):
                if self.pay_id == None or return_id == False:
                        return tuple([self.sub_id, self.payment_amount, self.payment_date, self.payment_type, self.card_number, self.card_code, self.rec_create_stamp])
                return tuple([self.pay_id, self.sub_id, self.payment_amount, self.payment_date, self.payment_type, self.card_number, self.card_code, self.rec_create_stamp])

        def __str__(self) -> str:
            str_ret = f"\nPayment:\nID: {str(self.pay_id)}"
            str_ret += f"\nSubscription ID: {self.sub_id}"
            str_ret += f"\nPayment Amount: {self.payment_amount}"
            str_ret += f"\nPayment Date: {self.payment_date}"
            str_ret += f"\nPayment Type: {self.payment_type}"
            str_ret += f"\nCard Number: {self.card_number}"
            str_ret += f"\nCard Security Code: {self.card_code}"
            str_ret += f"\nDate Record Created: {str(self.rec_create_stamp)}"
            
            return str_ret