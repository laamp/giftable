from app import db
from app.models.gift_list import GiftList
from flask import jsonify, request, make_response, Blueprint
from flask_login import current_user, login_required

gift_lists_blueprint = Blueprint(
    "gift_lists_blueprint", __name__, url_prefix="/api/gift_lists"
)


@gift_lists_blueprint.route("/", methods=["GET"])
def get_all_lists():
    lists = GiftList.query.filter_by(creator_id=request.json["creatorId"])
    results = []
    for list in lists:
        results.append(list.to_json())

    return make_response(jsonify(results), 200)


@gift_lists_blueprint.route("/", methods=["POST"])
def create_gift_list():
    new_gift_list = GiftList(
        title=request.json["title"], creator_id=request.json["creatorId"]
    )
    db.session.add(new_gift_list)
    db.session.commit()

    return make_response(jsonify(new_gift_list.to_json()), 200)
