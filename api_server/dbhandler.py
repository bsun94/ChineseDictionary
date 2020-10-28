"""
Created on Mon Oct 26 16:18:01 2020

@author: Owner

Manages the API server's connection to the db
"""

import sqlite3
import sys

class DB_Handler():
    """
    Handles the database connection for the Chinese Dictionary app; set to connect to cedictionary.db in /dict_db/
    """
    
    DB_NAME = "../dict_db/cedictionary.db"
    
    def openConn(self):
        try:
            conn = sqlite3.connect(self.DB_NAME)
        except:
            sys.exit('Could not connect to database!')
        
        return conn
    
    def execute(self, conn, query):
        try:
            c = conn.cursor()
            c.execute(query)
            results = c.fetchall()
            c.close()
        except:
            sys.exit('Query failed! Revalidate query and try again...')
        
        return results
    
    def closeConn(self, conn):
        try:
            conn.close()
        except:
            sys.exit('Failed to close db connection! Double-check connection object and try again...')
        