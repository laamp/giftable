from datetime import datetime
from app import db, login
from flask_login import UserMixin
from app.models import gift_list_subs


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

    ## Users -> Gift Lists
    # lists that this user created
    created_lists = db.relationship("GiftList", backref="creator", lazy=True)
    # lists that this user is following
    followed_lists = db.relationship(
        "GiftList",
        secondary=gift_list_subs,
        lazy="subquery",
        backref=db.backref("followers", lazy=True),
    )

    ## Users -> Gifts
    # gifts this user created
    created_gifts = db.relationship(
        "Gift", backref="creator", lazy=True, foreign_keys="[Gift.creator_id]"
    )
    # gifts intended for this user
    assigned_gifts = db.relationship(
        "Gift", backref="recipient", lazy=True, foreign_keys="[Gift.recipient_id]"
    )

    def __repr__(self):
        return f"<User id={self.id} username={self.username} email={self.email}>"

    def to_json(self):
        return {
            self.id: {
                "id": self.id,
                "username": self.username,
                "email": self.email,
                "googleId": self.google_id,
                "googleImage": self.google_image,
            }
        }
