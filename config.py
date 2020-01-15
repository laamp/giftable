import os


class Config(object):
    SQLALCHEMY_DATABASE_URI = "postgresql:///giftable_database"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY")
