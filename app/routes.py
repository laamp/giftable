from app import app
from app.models import User, GiftList
from flask import jsonify
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)


@app.route("/")
def is_user_authenticated():
    return jsonify({"test_object": "Hello, world."})


@app.route("/api/users")
def get_all_users():
    users = User.query.all()
    results = []
    for user in users:
        results.append(user.to_json())

    return jsonify(results)


# for test
# @app.route("/api/users/oauth", methods=["POST"])
# def receive_auth_token():
#     print(request.data)
#     return request.data


@app.route("/test")
def test_route():
    return jsonify({"message": "Hey, it worked!"})


@app.route("/api/gift_lists")
def get_all_lists():
    lists = GiftList.query.all()
    results = []
    for list in lists:
        results.append(list.to_json())

    return jsonify(results)
