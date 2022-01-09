QUERIES = {
        "MAGS_GET_ALL":
                        '''
                        SELECT magazineName
                        FROM magazine;
                        ''',
        "MAGS_GET_CATALOG":
                        '''
                        SELECT magID, magazineName, cost, category
                        FROM magazine;
                        ''',
        "MAGS_GET_AVA_CATALOG":
                        '''
                        SELECT magID, magazineName, cost, category
                        FROM magazine
                        WHERE recStatus = TRUE;
                        ''',
        "MAG_BY_NAME": 
                        '''
                        SELECT *
                        FROM magazine
                        WHERE magazineName = (%s);
                        ''',
        "MAGS_COUNT_BY_CAT":
                        '''
                        SELECT magazineName, category
                        FROM magazine
                        WHERE category LIKE "%(%s)%";
                        ''',
        "MAG_PRICE_BY_ID":
                        '''
                        SELECT cost
                        FROM magazine
                        WHERE magID = %(mag_id)s;
                        ''',
        "MAGS_COUNT_BY_YEAR":
                        '''
                        SELECT COUNT(magID) AS CountOfMag
                        FROM magazine
                        WHERE recCreateDate LIKE %s;
                        ''',
        "MAGS_AVG_COST_BY_CAT":
                        '''
                        SELECT category, COUNT(category) AS CountOfCategory, ROUND(AVG(cost), 2) AS AvgCost
                        FROM magazine
                        GROUP BY category
                        ORDER BY AvgCost DESC;
                        ''',
        "CUST_GET_ALL":
                        '''
                        SELECT firstName, lastName, username
                        FROM customer;
                        ''',
        "CUST_GET_BY_YEAR":
                        '''
                        SELECT COUNT(custID) AS CountOfCust
                        FROM customer
                        WHERE recCreateDate LIKE '(%s)-%';
                        ''',
        "CUST_GET_BY_USERNAME":
                        '''
                        SELECT *
                        FROM customer
                        WHERE username = %(username)s;
                        ''',
        "REC_STATUS_BY_USERNAME":
                        '''
                        SELECT p.recStatus AS active
                        FROM customer AS c
                        INNER JOIN profile AS p ON c.custID = p.custID
                        WHERE c.username = %(username)s;
                        ''',
        "GET_DIST_CITIES":
                        '''
                        SELECT DISTINCT(city)
                        FROM profile;
                        ''',
        "CALL_CITY_SP":
                        '''
                        CALL CustByCity(%s);
                        ''',
        "SUB_GET_BY_USERNAME":
                        '''
                        SELECT m.magazineName, m.cost, s.startDate, s.endDate
                        FROM customer AS c
                        INNER JOIN subscription AS s ON s.custID = c.custID
                        INNER JOIN magazine AS m ON m.magID = s.magID
                        WHERE c.username = %s;
                        ''',
        "MAGS_MAX_BUY_CAP":
                        '''
                        SELECT MAX(M.category) AS numOfCategory, P.zipCode AS zipCode
                        FROM magazine AS M
                        INNER JOIN subscription AS S ON M.magID = S.magID
                        INNER JOIN customer AS C ON S.custID = C.custID
                        INNER JOIN profile AS P ON C.custID = P.custID
                        GROUP BY zipCode
                        ORDER BY zipCode DESC;
                        ''',            
        "MAGS_GET_DIST_YEARS":
                        '''
                        SELECT DISTINCT(YEAR(recCreateDate))
                        FROM magazine;
                        ''',
        "MAG_GET_IDS":
                        '''
                        SELECT magID
                        FROM magazine;
                        ''',
        "CUST_GET_IDS":
                        '''
                        SELECT custID
                        FROM customer;
                        ''',
        "PRO_GET_IDS":
                        '''
                        SELECT custContID
                        FROM profile;
                        ''',
        "SUB_GET_IDS":
                        '''
                        SELECT subID
                        FROM subscription;
                        ''',
        "PAY_GET_IDS":
                        '''
                        SELECT payID
                        FROM payment;
                        ''',
        "GET_ALL_CUSTPRO":
                        '''
                        SELECT * 
                        FROM all_customer_acc_info;
                        ''',
        "GET_ALL_MAGSUB":
                        '''
                        SELECT * 
                        FROM mag_sub_vw;
                        '''
}