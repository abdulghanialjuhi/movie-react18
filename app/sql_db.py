from app import db
from datetime import datetime


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(30), unique=True, nullable=False)
    name = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    watchlist = db.relationship('Watchlist', backref='user', lazy=True)

    def __init__(self, user_name, name, email, password):
        self.user_name = user_name
        self.name = name
        self.email = email
        self.password = password


class Watchlist(db.Model):
    __tablename__ = 'watchlist'

    id = db.Column(db.Integer, primary_key=True)
    movie = db.Column(db.String(120), nullable=False)
    user_name = db.Column(db.String, db.ForeignKey('user.user_name'),
                     nullable=False)

