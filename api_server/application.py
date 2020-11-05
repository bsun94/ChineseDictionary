"""
Created on Tue Oct 13 20:21:38 2020

@author: Brian Sun

API server based on Flask to grab definitions from the dictionary db
"""

from flask import Flask, after_this_request
from flask_restful import Api, Resource
import dbhandler

application = Flask(__name__)
api = Api(application)

class ChineseDict(Resource):
    
    DB = dbhandler.DB_Handler()
    
    def get(self, character):
        query = "select * from cedict where simplified=:character or traditional=:character;"
        sanitizer = {'character': character}  # prevents SQL injections with sqlite3
        
        conn = self.DB.openConn()
        result = self.DB.execute(conn, query, sanitizer)
        self.DB.closeConn(conn)
        
        @after_this_request
        def add_header(response):
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        
        return {"definition": result}

api.add_resource(ChineseDict, "/getDefinition/<string:character>")

if __name__ == "__main__":
    application.run()