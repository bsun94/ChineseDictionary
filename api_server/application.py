"""
Created on Tue Oct 13 20:21:38 2020

@author: Brian Sun

API server based on Flask to grab definitions from the dictionary db
"""

from flask import Flask, after_this_request
from flask_restful import Api, Resource
import datetime
import dbhandler

application = Flask(__name__)
api = Api(application)
    
DB = dbhandler.DB_Handler()

@application.route("/getDefinition/<string:character>")
def getDef(character):
    query = "select * from cedict where simplified=:character or traditional=:character;"
    sanitizer = {'character': character}  # prevents SQL injections with sqlite3
    
    conn = DB.openConn()
    result = DB.execute(conn, query, sanitizer)
    DB.closeConn(conn)
    
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    return {"definition": result}

@application.route("/getRandom")
def getRand():
    query = "select count(*) from cedict;"
    numerator = int(datetime.datetime.today().strftime('%Y%m%d'))
    denominator = int(datetime.date(datetime.datetime.today().year, 12, 31).strftime('%Y%m%d'))
    
    conn = DB.openConn()
    
    numRows = DB.execute(conn, query)[0][0]
    index = int(numerator / denominator * numRows)
    
    query = f"select * from cedict limit 1 offset {index}"
    result = DB.execute(conn, query)
    
    DB.closeConn(conn)
    
    @after_this_request
    def add_header(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    return {"word": result[0][0], "definition": result}

if __name__ == "__main__":
    application.run(debug=True)
