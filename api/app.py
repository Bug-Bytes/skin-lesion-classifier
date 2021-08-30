from flask import Flask, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/inference", methods=['POST'])
@cross_origin() # allow all origins all methods. Remove later
def inference():
    return jsonify({
        "message": "Hello, World!"
    })