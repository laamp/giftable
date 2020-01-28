from datetime import datetime
from app import db


class Gift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(128))
    url = db.Column(db.String(256))
    purchased = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    ## Gifts -> Users
    # user that created this gift
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # user this gift is intended for
    recipient_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

    ## Gifts -> Gift Lists
    # list that the gift belongs to
    list_id = db.Column(db.Integer, db.ForeignKey("gift_list.id"), nullable=False)

    def __repr__(self):
        return f"<Gift id={self.id} label={self.label} url={self.url} \
            purchased={self.purchased} creator_id={self.creator_id} \
            recipient_id={self.recipient_id} list_id={self.list_id}"

    def to_json(self):
        return {
            self.id: {
                "id": self.id,
                "label": self.label,
                "url": self.url,
                "purchased": self.purchased,
                "creatorId": self.creator_id,
                "recipientId": self.recipient_id,
                "listId": self.list_id,
            }
        }
