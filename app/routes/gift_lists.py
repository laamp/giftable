from app import db
from app.models.gift_list import GiftList
from flask import jsonify, request, make_response, Blueprint
from flask_login import current_user, login_required

gift_lists_blueprint = Blueprint(
    "gift_lists_blueprint", __name__, url_prefix="/api/gift_lists"
)


@gift_lists_blueprint.route("/user/<creatorid>", methods=["GET"])
def get_all_lists(creatorid):
    try:
        gift_lists = GiftList.query.filter_by(creator_id=creatorid)
        results = {}
        for gift_list in gift_lists:
            results = {**results, **gift_list.to_json()}

    except:
        return make_response(
            jsonify({"gift_lists": "Could not retrieve gift lists"}), 404
        )

    return make_response(jsonify(results), 200)


@gift_lists_blueprint.route("", methods=["POST"])
def create_gift_list():
    new_gift_list = GiftList(
        title=request.json["title"], creator_id=request.json["creatorId"]
    )
    db.session.add(new_gift_list)
    db.session.commit()

    return make_response(jsonify(new_gift_list.to_json()), 200)
