# represents an Agency table of the DB
class Magazine():
        def __init__(self, mag_id, magazine_name, cost, category, rec_status, rec_create_stamp) -> None: #specified return type, this is void
                self.mag_id = mag_id # primary key
                self.magazine_name = magazine_name
                self.cost = cost
                self.category = category
                self.rec_status = rec_status # if magazine is active or expired, if they are still around or not
                self.rec_create_stamp = rec_create_stamp # date record created

        def set_id(self, mag_id):
                self.mag_id = mag_id
                
        def get_id(self):
                return self.mag_id

        def get_fields(self, return_id = False):
                if self.mag_id == None or return_id == False:
                        return tuple([self.magazine_name, self.cost, self.category, self.rec_status, self.rec_create_stamp])
                return tuple([self.mag_id, self.magazine_name, self.cost, self.category, self.rec_status, self.rec_create_stamp])

        def __str__(self) -> str:
            str_ret = f"\nMagazine:\nID: {str(self.mag_id)}"
            str_ret += f"\nName: {self.magazine_name}"
            str_ret += f"\nCost: {self.cost}"
            str_ret += f"\nCategory: {self.category}"
            str_ret += f"\nMagazine Active?: {self.rec_status}"
            str_ret += f"\nDate Record Created: {str(self.rec_create_stamp)}"
            
            return str_ret