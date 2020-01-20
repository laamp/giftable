from datetime import datetime
from app import db, login
from flask_login import UserMixin
from app.models import users_to_giftlists


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64))
    email = db.Column(db.String(128), index=True, unique=True)
    google_id = db.Column(db.String(128), index=True, unique=True)
    google_image = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    gift_lists = db.relationship(
        "GiftList",
        secondary=users_to_giftlists,
        lazy="subquery",
        backref=db.backref("users", lazy=True),
    )

    def __repr__(self):
        return "<User {}>".format(self.username)

    def to_json(self):
        return {
            "name": self.username,
            "email": self.email,
            "googleId": self.google_id,
            "googleImg": self.google_image,
        }
