from datetime import datetime
from app import db


class GiftList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    ## Gift Lists -> Users
    # id of user that created the list
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # "followers" gets users subbed to this list

    ## Gift Lists -> Gifts
    # gifts on a gift list
    gifts = db.relationship("Gift", backref="list", lazy=True)

    def __repr__(self):
        return f"<GiftList id={self.id} title={self.title} creator_id={self.creator_id}"

    def to_json(self):
        return {
            self.id: {"id": self.id, "title": self.title, "creator_id": self.creator_id}
        }

