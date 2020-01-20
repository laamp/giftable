from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
migrate = Migrate(app, db)
login = LoginManager(app)

from app.models.user import User
from app.models.gift_list import GiftList
from app.models.gift import Gift
from app.models import users_to_giftlists

from app.routes.users import users_blueprint
from app.routes.gift_lists import gift_lists_blueprint

app.register_blueprint(users_blueprint)
app.register_blueprint(gift_lists_blueprint)
