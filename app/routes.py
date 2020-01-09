from app import app
from flask import jsonify
from app.models import User, GiftList


@app.route("/")
@app.route("/index")
def hello_world():
    return "Hello, World."


@app.route("/api/users")
def get_all_users():
    users = User.query.all()
    results = []
    for user in users:
        results.append(user.to_json())

    return jsonify(results)


@app.route("/api/gift_lists")
def get_all_lists():
    lists = GiftList.query.all()
    results = []
    for list in lists:
        results.append(list.to_json())

    return jsonify(results)
