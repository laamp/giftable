from datetime import datetime
from app import db

users_to_giftlists = db.Table(
    "users_to_giftlists",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("list_id", db.Integer, db.ForeignKey("gift_list.id"), primary_key=True),
    db.Column("added_on", db.DateTime, default=datetime.utcnow),
)
