import os
from app import db
from app.models.user import User
from flask import jsonify, request, make_response, Blueprint
from flask_login import (
    current_user,
    login_required,
    login_user,
    logout_user,
)
from google.oauth2 import id_token
from google.auth.transport import requests

users_blueprint = Blueprint("users_blueprint", __name__, url_prefix="/api/users")


@users_blueprint.route("/login", methods=["POST"])
def login():
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

    return make_response(jsonify(current_user.to_json()), 200)


@users_blueprint.route("/logout", methods=["DELETE"])
def logout():
    logout_user()
    return make_response(jsonify({"session": "User logged out"}), 200)


@users_blueprint.route("/guest", methods=["POST"])
def guest_login():
    guest = User.query.filter_by(username="Guest").first()

    if guest is None:
        new_guest = User(
            email="guest@giftable.com",
            username="Guest",
            google_id="Not a Google account",
            google_img="Not applicable",
        )
        db.session.add(new_guest)
        db.session.commit()
        guest = new_guest

    login_user(guest)

    return make_response(jsonify(current_user.to_json()), 200)
