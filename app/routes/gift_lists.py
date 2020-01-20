from app import db
from app.models.gift_list import GiftList
from flask import jsonify, request, make_response, Blueprint
from flask_login import current_user, login_required

gift_lists_blueprint = Blueprint(
    "gift_lists_blueprint", __name__, url_prefix="/api/gift_lists"
)


@gift_lists_blueprint.route("/")
def get_all_lists():
    lists = GiftList.query.all()
    results = []
    for list in lists:
        results.append(list.to_json())

    return jsonify(results)
