"""
Created on Tue Oct 13 20:21:38 2020

@author: Brian Sun
"""

from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

if __name__ == "__main__":
    app.run(debug=True)

class ChineseDict(Resource):
    def get(self):
        