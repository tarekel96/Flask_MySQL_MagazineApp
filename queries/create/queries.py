QUERIES = {
        "MAG_CREATE_TABLE": 
                        '''
                        CREATE TABLE IF NOT EXISTS magazine (
                        magID INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        magazineName VARCHAR(50),
                        cost FLOAT NOT NULL,
                        category VARCHAR(50),
                        recStatus BOOLEAN,
                        recCreateDate DATE DEFAULT (CURRENT_DATE)
                        );
                        ''',
        "CUST_CREATE_TABLE":
                        '''
                        CREATE TABLE IF NOT EXISTS customer (
                        custID INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        firstName VARCHAR(50),
                        lastName VARCHAR(50),
                        username VARCHAR(50) UNIQUE,
                        password VARCHAR(50),
                        recCreateDate DATE DEFAULT (CURRENT_DATE)
                        );
                        ''',
        "PRO_CREATE_TABLE": 
                        '''
                        CREATE TABLE IF NOT EXISTS profile (
                        custContID INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        custID INTEGER NOT NULL,
                        phoneNum CHAR(12) NOT NULL,
                        zipCode CHAR(5) NOT NULL,
                        state CHAR(2) NOT NULL,
                        city VARCHAR(100) NOT NULL,
                        streetAddress VARCHAR(150) NOT NULL,
                        contactType BOOLEAN,
                        recUpdateDate DATE DEFAULT (CURRENT_DATE),
                        recStatus BOOLEAN DEFAULT TRUE,
                        startDate DATE DEFAULT (CURRENT_DATE),
                        endDate DATE,
                        CONSTRAINT FK_profile_custID FOREIGN KEY (custID) REFERENCES customer(custID) ON UPDATE CASCADE ON DELETE CASCADE
                        );
                        ''',
        "SUB_CREATE_TABLE": 
                        '''
                        CREATE TABLE IF NOT EXISTS subscription (
                        magID INTEGER NOT NULL,
                        custID INTEGER NOT NULL,
                        subID INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        paymentCompleted BOOLEAN,
                        startDate DATE,
                        endDate DATE,
                        numMagsMailed INTEGER,
                        CONSTRAINT FK_subscription_magID FOREIGN KEY (magID) REFERENCES magazine(magID) ON UPDATE CASCADE ON DELETE CASCADE,
                        CONSTRAINT FK_subscription_custID FOREIGN KEY (custID) REFERENCES customer(custID) ON UPDATE CASCADE ON DELETE CASCADE
                        );
                        ''',
        "PAY_CREATE_TABLE":
                        '''
                        CREATE TABLE IF NOT EXISTS payment (
                        cardCode INTEGER,
                        cardNumber VARCHAR(25),
                        payID INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
                        subID INTEGER NOT NULL,
                        paymentAmount FLOAT NOT NULL,
                        paymentType BOOLEAN,
                        paymentDate DATE,
                        recCreateDate DATE DEFAULT (CURRENT_DATE),
                        CONSTRAINT FK_subscription_subID FOREIGN KEY (subID) REFERENCES subscription(subID) ON UPDATE CASCADE ON DELETE CASCADE
                        );
                        ''',
        "MAG_INSERT_RECS":
                        '''
                        INSERT INTO magazine 
                        (magazineName, cost, category, recStatus, recCreateDate)
                        VALUES (%s, %s, %s, %s, %s)
                        ''',
        "CUST_INSERT_RECS":
                        '''
                        INSERT INTO customer 
                        (firstName, lastName, username, password, recCreateDate)
                        VALUES (%s, %s, %s, %s, %s)
                        ''',
        "PRO_INSERT_RECS":
                        '''
                        INSERT INTO profile 
                        (custID, phoneNum, zipCode, state, city, streetAddress, contactType, startDate, endDate, recStatus, recUpdateDate)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ''',
        "SUB_INSERT_RECS":
                        '''
                        INSERT INTO subscription 
                        (magID, custID, numMagsMailed, paymentCompleted, startDate, endDate)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        ''',
        "PAY_INSERT_RECS":
                        '''
                        INSERT INTO payment 
                        (subID, paymentAmount, paymentDate, paymentType, cardNumber, cardCode, recCreateDate)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ''',
        "MAG_INSERT_ALL":
                        '''
                        INSERT INTO magazine 
                        (magID, magazineName, cost, category, recStatus, recCreateDate)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        ''',
        "CUST_INSERT_ALL":
                        '''
                        INSERT INTO customer 
                        (custID, firstName, lastName, username, password, recCreateDate)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        ''',
        "PRO_INSERT_ALL":
                        '''
                        INSERT INTO profile 
                        (custContID, custID, phoneNum, zipCode, state, city, streetAddress, contactType, startDate, endDate, recStatus, recUpdateDate)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        ''',
        "SUB_INSERT_ALL":
                        '''
                        INSERT INTO subscription 
                        (subID, magID, custID, numMagsMailed, paymentCompleted, startDate, endDate)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ''',
        "SUB_ADD_ONE":
                        '''
                        INSERT INTO subscription
                        (magID, custID, numMagsMailed, paymentCompleted, startDate)
                        VALUES (%s, %s, %s, %s, %s)
                        ''',
        "PAY_INSERT_ALL":
                        '''
                        INSERT INTO payment 
                        (payID, subID, paymentAmount, paymentDate, paymentType, cardNumber, cardCode, recCreateDate)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                        ''',
        "CUST_CREATE_NEW":
                        '''
                        INSERT INTO customer 
                        (firstName, lastName, username, password)
                        VALUES (%s, %s, %s, %s)
                        ''',
        "PRO_CREATE_NEW":
                        '''
                        INSERT INTO profile 
                        (custID, phoneNum, zipCode, state, city, streetAddress, contactType)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                        ''',
        "CREATE_CITY_PROCEDURE":
                        '''
                        CREATE PROCEDURE CustByCity(
                                IN city_name VARCHAR(50)
                        )
                        BEGIN
                                SELECT c.custID AS customer_id, CONCAT(c.firstName, " ", c.lastName) AS full_name, c.username, c.recCreateDate AS date_joined
                                FROM customer AS c
                                INNER JOIN profile AS p ON p.custID = c.custID
                                WHERE p.city = city_name;
                        END
                        ''',
        "CREATE_CUSTPRO_VIEW":
                        '''
                        CREATE VIEW all_customer_acc_info AS
                                SELECT c.custID AS customer_id, p.custContID AS profile_id, 
                                CONCAT(c.firstName, " ", c.lastName) AS full_name,
                                c.username AS username, c.password AS cust_password, p.phoneNum AS phone_no, 
                                p.zipCode AS zip_code, p.state AS state, p.city AS city, 
                                p.streetAddress AS street_addr, p.contactType AS contact_type, 
                                p.recUpdateDate AS date_acc_updated, p.recStatus AS active, 
                                p.startDate AS date_acc_created, p.endDate AS date_acc_deleted
                                FROM customer AS c 
                                INNER JOIN profile AS p ON c.custID = p.custID;
                        ''',
        "CREATE_MAGSUB_VIEW":
                        '''
                        CREATE VIEW mag_sub_vw AS 
                                SELECT s.magID AS mag_id, m.magazineName AS mag_name, 
                                m.cost AS mag_cost, m.category AS mag_category,
                                s.custID AS cust_id, s.numMagsMailed AS num_mags_received,
                                s.subID AS sub_id, s.startDate AS start_date, s.endDate AS end_date
                                FROM subscription AS s
                                INNER JOIN magazine AS m ON m.magID = s.magID;
                        ''',
        "CREATE_INAME_MAG":
                        '''
                        CREATE INDEX mag_name ON magazine(magazineName);
                        ''',
        "CREATE_ICOST_MAG":
                        '''
                        CREATE INDEX mag_cost ON magazine(cost);
                        ''',
        "CREATE_ICAT_MAG":
                        '''
                        CREATE INDEX mag_cat ON magazine(category);
                        ''',
        "CREATE_IUSERNAME_CUST":
                        '''
                        CREATE INDEX cust_username ON customer(username);
                        '''
}
