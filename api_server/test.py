"""
Created on Mon Oct 26 11:48:09 2020

@author: Owner

Used just to test the build of api_server
"""

import requests

BASE = 'http://127.0.0.1:5000/'
CHAR = "'汉'"

response = requests.get(BASE + "getDefinition/" + CHAR)
print(response.json())