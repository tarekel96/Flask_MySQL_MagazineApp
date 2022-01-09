from queries.create.queries import QUERIES


QUERIES = {
        "UPDATE_CONTACT":
                '''
                UPDATE profile
                SET contactType = %s
                WHERE custContID IN (
                        SELECT profile.custContID
                        FROM customer c
                        WHERE c.custID = profile.custID
                        AND c.username = %s
                );
                '''
}