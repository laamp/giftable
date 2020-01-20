from datetime import datetime
from app import db


class GiftList(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(64))
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"), index=True)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    def __repr__(self):
        return "<GiftList id={} title={} creator_id={} created_at={}>".format(
            self.id, self.title, self.creator_id, self.created_at
        )

    def to_json(self):
        return {self.id: {"id": self.id, "title": self.title}}

