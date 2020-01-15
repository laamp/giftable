import os
from app import app, db
from app.models import User, GiftList
from flask import jsonify, request, make_response
from flask_login import (
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


@app.route("/api/users/login", methods=["POST"])
def login_with_google():
    try:
        idinfo = id_token.verify_oauth2_token(
            request.json["idToken"], requests.Request(), os.environ["GOOGLE_CLIENT_ID"]
        )

        if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
            raise ValueError("Incorrect issuer")

        # google account id from decoded token
        userid = idinfo["sub"]

        # check if this user is already present in the database
        user = User.query.filter_by(google_id=userid).first()
        # if user doesn't exist, make a new user
        if user is None or userid != request.json["id"]:
            new_user = User(
                email=request.json["email"],
                username=request.json["name"],
                google_id=request.json["id"],
                google_image=request.json["photo"],
            )
            db.session.add(new_user)
            db.session.commit()
            user = new_user

        login_user(user)

    except ValueError:
        return make_response(jsonify({"session": "Token not authorized"}), 400)

    return make_response(
        jsonify(
            {
                "currentUser": {
                    "googleId": current_user.google_id,
                    "googleImg": current_user.google_image,
                    "name": current_user.username,
                    "email": current_user.email,
                }
            }
        ),
        200,
    )


@app.route("/api/users/logout")
def logout():
    logout_user()
    return make_response(jsonify({"session": "User logged out"}), 200)


@app.route("/api/gift_lists")
def get_all_lists():
    lists = GiftList.query.all()
    results = []
    for list in lists:
        results.append(list.to_json())

    return jsonify(results)
