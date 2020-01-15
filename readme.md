# Giftable

## Tech stack used

- Back-end: Flask
- Database: Postgresql
- ORM: SQLAlchemy
- Migrations: Alembic
- Front-end: React.js, Redux, Webpack

## Steps to run/work on this project

### Initial project setup

- python3 must exist on your system
- create virtual environment with `python3 -m venv venv`
- activate virtual environment with `source venv/bin/activate`
- install Flask in your virtual environment with `pip install flask`

### Back-end setup

- set `FLASK_APP` environment variable with `export FLASK_APP=giftable.py`
  - or install `pip install python-dotenv`
  - create file `.flaskenv`
  - add line `FLASK_APP=giftable.py` to `.flaskenv`
- run `pip install flask-sqlalchemy` to install ORM
- run `pip install flask-migrate` to install db migration framework
- run `flask db migrate` to generate any migrations, then `flask db upgrade` to apply migrations
- run `flask run` to start back-end

### Front-end setup

- from within `frontend` run `npm install`
- from root directory run `npm run frontend` to test out front-end

### Test front-end and back-end

- from root directory run `npm run dev`
