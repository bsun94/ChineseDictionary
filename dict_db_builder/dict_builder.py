"""
Created on Sat Oct 10 12:13:10 2020

@author: Brian Sun
"""

import sqlite3
import os
import io
import sys

os.chdir(os.getcwd())

class DictParser():
    """
    The parsing code is based on work by Franki Allegra, which was shared along with the .u8 dictionary at https://www.mdbg.net/chinese/dictionary?page=cc-cedict
      and helps parse the dictionary information in the u8 file. Please ensure that the cedict_ts.u8 file - its name unaltered! - is saved in the dict_db folder of
      this directory!
    
    The database builder code is entirely my own.
     
    Before running the parser, please also ensure you remove those lines at the top of the u8 file with copyright info and special symbols - this is a dictionary of
      words.
    
    Franki's work can be found here: https://github.com/rubber-duck-dragon/rubber-duck-dragon.github.io/blob/master/cc-cedict_parser/parser.py
    """
    
    DICT_DB_U8 = r'../dict_db/cedict_ts.u8'
    SQL_DB_NAME = r'../dict_db/cedictionary.db'
    
    def __init__(self):
        self.max_len_pinyin = 0
        self.max_len_english = 0
        self.dict_lines = []
        self.list_of_defs = []
    
    def read_file(self):
        try:
            with io.open(self.DICT_DB_U8, 'r', encoding='utf_8') as file:
                text = file.read()
                lines = text.split('\n')
                self.dict_lines = list(lines)
        except:
            sys.exit('Please double check the .u8 file - do NOT alter its name as downloaded from the mdgb website, and ensure it is in the /dict_db folder.')

    def parse_line(self, line):
        
        line = line.rstrip('/')
        line = line.split(']')
        
        if len(line) <= 1:
            return
        
        english = line[1].strip(' /').replace('/', '; ')
        
        char_and_pinyin = line[0].split('[')
        
        characters = char_and_pinyin[0]
        characters = characters.split()
        traditional = characters[0]
        simplified = characters[1]
        
        pinyin = char_and_pinyin[1]
        pinyin = pinyin.strip()
        
        if len(english) > self.max_len_english:
            self.max_len_english = len(english)
        
        if len(pinyin) > self.max_len_pinyin:
            self.max_len_pinyin = len(pinyin)
        
        parsed = (simplified, traditional, pinyin, english)
        
        self.list_of_defs.append(parsed)

    def remove_surnames(self):
        for x in range(len(self.list_of_defs)-1, -1, -1):
            if "surname " in self.list_of_defs[x][3]:
                if self.list_of_defs[x][1] == self.list_of_defs[x+1][1]:
                    self.list_of_defs.pop(x)
    
    def build_DB(self):
        print('Building dictionary database...')
        
        conn = sqlite3.connect(self.SQL_DB_NAME)
        c = conn.cursor()
        
        c.execute(f'''create table if not exists cedict (
                    simplified nvarchar(20) not null,
                    traditional nvarchar(20) not null,
                    pinyin varchar({self.max_len_pinyin}) not null,
                    english varchar({self.max_len_english}) not null);''')
        
        for entry in self.list_of_defs:
            c.execute('''insert into cedict values
                      (?, ?, ?, ?);''', entry)
        
        conn.commit()
        c.close()
        conn.close()
    
    def DB_check(self):
        conn = sqlite3.connect(self.SQL_DB_NAME)
        c = conn.cursor()

        rc = c.execute('select count(*) from cedict;').fetchall()[0][0]
        print('No. of records in dictionary database:', rc)
        
        c.execute('select * from cedict limit 5;')
        print('Top 5 db records are:', c.fetchall())
        
        c.execute(f'''select * from cedict limit 5 offset {rc - 5};''')
        print('Bottom 5 db records are:', c.fetchall())
        
        c.close()
        conn.close()
        
    def main(self):
        self.read_file()
        
        for line in self.dict_lines:
            if line == '':
                self.dict_lines.remove(line)
            else:
                self.parse_line(line)
    
        # Optional: remove characters that are just surnames
        # self.remove_surnames()
        
        print('Read', len(self.list_of_defs), 'lines from the u8 file; \nTop 5 lines are', self.list_of_defs[:5], '; \nBottom 5 lines are', self.list_of_defs[-5:])
        
        self.build_DB()
        self.DB_check()


ce_dict = DictParser()
ce_dict.main()
