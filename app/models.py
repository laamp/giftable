from datetime import datetime
from app import db


users_to_giftlists = db.Table(
    "users_to_giftlists",
    db.Column("user_id", db.Integer, db.ForeignKey("user.id"), primary_key=True),
    db.Column("list_id", db.Integer, db.ForeignKey("gift_list.id"), primary_key=True),
    db.Column("added_on", db.DateTime, default=datetime.utcnow),
)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True)
    email = db.Column(db.String(128), index=True, unique=True)
    password = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    gift_lists = db.relationship(
        "GiftList",
        secondary=users_to_giftlists,
        lazy="subquery",
        backref=db.backref("users", lazy=True),
    )

    def __repr__(self):
        return "<User {}>".format(self.username)


class GiftList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"), index=True)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return "<GiftList {}>".format(self.title)

