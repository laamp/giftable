from datetime import datetime
from app import db

gift_list_subs = db.Table(
    "gift_list_subs",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("list_id", db.Integer, db.ForeignKey("gift_list.id"), primary_key=True),
    db.Column("added_on", db.DateTime, default=datetime.utcnow),
)
