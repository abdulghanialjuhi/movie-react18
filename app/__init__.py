from flask import Flask, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import timedelta
from flask_jwt_extended import JWTManager
from app.settings import SECRET_KEY, SQLALCHOMEY_DATABASE_URI
from flask_cors import CORS

app = Flask(__name__, static_folder='../movie-fronend/build', static_url_path='')

bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app, supports_credentials=True)

x = False

if x:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database/data.db'
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHOMEY_DATABASE_URI

app.config["JWT_SECRET_KEY"] = SECRET_KEY

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=5)
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_SAMESITE"] = "None"
app.config["JWT_COOKIE_CSRF_PROTECT"] = True


@app.before_request
def home():
    if request.user_agent.browser != 'safari':
        app.config["JWT_COOKIE_SECURE"] = True
    else:
        app.config["JWT_COOKIE_SECURE"] = False


@app.errorhandler(404)
def serve(e):
    return send_from_directory(app.static_folder, 'index.html')


db = SQLAlchemy(app)

from app import sql_db
from app import views
