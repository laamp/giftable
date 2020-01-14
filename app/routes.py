import os
from app import app
from app.models import User, GiftList
from flask import jsonify, request, make_response
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from google.oauth2 import id_token
from google.auth.transport import requests


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


@app.route("/api/users/oauth", methods=["POST"])
def receive_auth_token():
    try:
        idinfo = id_token.verify_oauth2_token(
            request.json["idToken"], requests.Request(), os.environ["GOOGLE_CLIENT_ID"]
        )

        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Incorrect issuer")

        userid = idinfo["sub"]
    except ValueError:
        return make_response(jsonify({"authentication": "Token unauthorized"}), 400)

    return make_response(jsonify({"authentication": "Token validated!"}), 200)


@app.route("/api/gift_lists")
def get_all_lists():
    lists = GiftList.query.all()
    results = []
    for list in lists:
        results.append(list.to_json())

    return jsonify(results)
