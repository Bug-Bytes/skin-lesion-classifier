from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/inference", methods=['POST'])
@cross_origin() # allow all origins all methods. Remove later
def inference():
    if('file' not in request.files):
        return jsonify({'error': 'No file included'})
    print(request.files['file'])
    return jsonify({
        "inference": {
            "tick": 30,
            "mosquito": 15,
            "other_lesion": 10,
            "normal": 20
        }
    })