import sqlite3
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

DB_PATH = 'database.db'
SECRET_KEY = 'mysecretpassword'

def get_user(username):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    user = cursor.fetchone()
    conn.close()
    return user

@app.route('/read_file', methods=['POST'])
def read_file():
    filename = request.json['filename']
    with open(filename, 'r') as file:
        content = file.read()
    return jsonify({'content': content})

@app.route('/run_command', methods=['POST'])
def run_command():
    command = request.json['command']
    os.system(command)
    return jsonify({'status': 'Command executed'})

@app.route('/create_user', methods=['POST'])
def create_user():
    username = request.json['username']
    password = request.json['password']
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(f"INSERT INTO users (username, password) VALUES ('{username}', '{password}')")
    conn.commit()
    conn.close()

    return jsonify({'status': 'User created'})

@app.route('/')
def index():
    resp = jsonify({'message': 'Welcome!'})
    resp.set_cookie('session_id', '12345')
    return resp

if __name__ == '__main__':
    app.run(debug=True)
