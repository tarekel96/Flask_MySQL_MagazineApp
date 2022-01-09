QUERIES = {
        "PAY_CHECK_TABLE": 
                        '''
                        DROP TABLE IF EXISTS payment;
                        '''
        ,
        "SUB_CHECK_TABLE": 
                        '''
                        DROP TABLE IF EXISTS subscription;
                        '''
        ,
        "PRO_CHECK_TABLE": 
                        '''
                        DROP TABLE IF EXISTS profile;
                        '''
        ,
        "CUST_CHECK_TABLE": 
                        '''
                        DROP TABLE IF EXISTS customer;
                        '''
        ,
        "MAG_CHECK_TABLE": 
                        '''
                        DROP TABLE IF EXISTS magazine;
                        ''',
        # TODO
        # (User) create a query that deletes a user's account (deletes customer which should also delete the profile record - cascade)
        "SOFT_DELETE":
                        '''
                        UPDATE profile
                        SET recStatus = %s
                        WHERE custContID IN (
                                SELECT profile.custContID
                                FROM customer c
                                WHERE c.custID = profile.custID
                                AND c.username = %s
                        );
                        ''',
        "CHECK_CITY_PROCEDURE":
                        '''
                        DROP PROCEDURE IF EXISTS `CustByCity`
                        ''',
        "CHECK_CUSTPRO_VIEW":
                        '''
                        DROP VIEW IF EXISTS all_customer_acc_info;
                        ''',
        "CHECK_MAGSUB_VIEW":
                        '''
                        DROP VIEW IF EXISTS mag_sub_vw;
                        ''',
        "CHECK_MAG_INDEX":
                        '''
                        SHOW INDEX FROM magazine WHERE KEY_NAME = %s;
                        ''',
         "CHECK_CUST_INDEX":
                        '''
                        SHOW INDEX FROM customer WHERE KEY_NAME = %s;
                        '''
        # (Admin) create a query that deletes a magazine record (consider how it affects other tables)
}