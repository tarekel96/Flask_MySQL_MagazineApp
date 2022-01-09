from models.parser import Parser
from models.db_model import DB_Model
from queries.create.queries import QUERIES as CRE_QUERIES
from views.root import run_program


def main():
    # parses csv data into Python instances stored in lists
    parser = Parser()
    # connects to MySQL DB, removes tables (if exits), and creates tables
    #   second bool is if on cloud instance or not 
    db = DB_Model(parser, False, False) # set the first bool to True for first run

    run_program(db)

    db.destructor()

if __name__ == "__main__":
    main()