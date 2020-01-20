from datetime import datetime
from app import db


class Gift(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(128))
    url = db.Column(db.String(256))
    purchased = db.Column(db.Boolean, default=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey("user.id"), index=True)
    creator_id = db.Column(db.Integer, db.ForeignKey("user.id"), index=True)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # gift_list =

    def __repr__(self):
        return "<Gift id={} label={} purchased={}>".format(
            self.id, self.label, self.purchased
        )

    def to_json(self):
        return {
            self.id: {
                "id": self.id,
                "label": self.label,
                "url": self.url,
                "purchased": self.purchased,
            }
        }
