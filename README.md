# Chinese Dictionary
##### A web app to offer definition of Chinese characters, words and idioms.
______________________

**This build is based on a Python-JavaScript stack. Please ensure you have IDEs and runtime environments for both. For hosting, I personally chose AWS, although you're free to try out other providers. [Click here](https://master.d3bpdh4bmdckfp.amplifyapp.com/) to go to my app.**

**Python dependencies - please make sure you have the following packages installed:**
- Regular packages: sqlite3, sys, os, io
- Special packages: flask, flask_restful (refer to the "requirements.txt" file in the api_server folder for other, supporting modules)

**JavaScript dependencies:**
This is more so React-based. When you install a React app on your system, there's usually a node_modules file that's downloaded into your app's folder (on which React is based). React's own .gitignore file, however, ignores this - for good reason, as a certain crlf issue has made commits impossible to make when I tried personally to override the file.

Follow the [instructions here](https://reactjs.org/docs/create-a-new-react-app.html) to install a React app folder onto your computer, within the same directory you've downloaded all the rest of this repo's folders into. Replace the "src" and "public" folders there with the same-name folders I have here in the "my-app" folder, and you'll have access to the node_modules folder required to run React.

_______________________

*Descriptions by folder in order of operation:*

1. dict_db: the raw data which contains Chinese character-to-English translations are stored here. The cedict_ts.u8 file was sourced from [this website](https://www.mdbg.net/chinese/dictionary?page=cc-cedict). Should the .u8 file ever be updated on the webpage, download the new one and replace the old .u8 *in this folder.*

2. dict_db_builder: contains the Python I'd built (based on Franki Allegra's work) to parse the .u8 file in the folder above to build a .db file. Franki's original parser only obtained the first definition for each character (discarding all other definitions for those entries that had multiple). My parser code is an improvement upon that. Otherwise, the database-building code is all my own, and used to output the final cedictionary.db result to the above dict_db folder - I've since changed it to the api_server folder.

3. api_server: contains the dbhandler script I'd written to talk to the cedictionary.db file, as well as the application.py file which is a Flask-based API server. The latter file contains the sole method required for this dictionary for now, which is essentially a "get". The test.py script is just used to test querying from the application.py server when it's hosted locally. Anything named "elasticbeanstalk" or "eb" is unique to me using Amazon Web Services to host this - that's the name of their service to host Python Flask apps. It is to fit AWS EB that I now store the cedictionary.db file in this folder, and why you see a .zip folder here as well (AWS EB's accepted upload format). The .zip folder simply contains all this folder's contents.

4. my-app: contains all React files used for the dictionary's front-end. The index.html file is in the public folder, while all supporting JS files are in the src folder (as per React's structure). Please note the point above on the node_modules folder React needs to run.

Beyond AWS EB, I also use an AWS Amplify instance to host my React app, and it's based on this Git repo.