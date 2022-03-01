import sys
import os
from dotenv import load_dotenv
load_dotenv()

PROJ_DIR_ABS_PATH = os.getenv("PROJ_DIR_ABS_PATH")

try:
        from models.db_model import DB_Model
except ModuleNotFoundError as err:
        print("Fixing sys path..")
        sys.path.insert(0, PROJ_DIR_ABS_PATH)

from models.parser import Parser
from models.db_model import DB_Model
from queries.read.queries import QUERIES as RE_QUERIES
from dotenv import load_dotenv
print(RE_QUERIES["CUST_GET_BY_USERNAME"])

def test():
        parser = Parser()
        db = DB_Model(parser, False, False)
        username = "6LiI-Dorothy"
        return db.get_record(RE_QUERIES["CUST_GET_BY_USERNAME"],tuple([username, ]), "username")

test()