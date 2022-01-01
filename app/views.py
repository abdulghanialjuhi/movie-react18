from flask import jsonify, request
from app import db, bcrypt, app
from app.sql_db import User, Watchlist
from flask_jwt_extended import create_access_token, get_jwt_identity, \
    verify_jwt_in_request, set_access_cookies, unset_jwt_cookies, get_jwt

from datetime import timedelta, timezone, datetime
import smtplib
import random
import string
from app.settings import EMAIL_ADDRESS, PASSWORD

main = app
special_characters = "/[!@#$%^&*()+\-=\[\]{};'\":'\\|,.<>\/?]+/"


@main.after_request
def refresh_token_access(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(hours=3))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            set_access_cookies(response, access_token)
        return response
    except (RuntimeError, KeyError):
        return response


def get_identity():
    try:
        verify_jwt_in_request(optional=True)
        return get_jwt_identity()
    except:
        return 'token expired'


@main.route('/check_token_exp')
def check_token_exp():
    try:
        verify_jwt_in_request(optional=True)
        return get_jwt_identity()
    except:
        return 'token expired'


@main.route('/home', methods=['POST', 'GET'])
def home():
    # db.session.query(User).delete()
    # db.session.commit()

    users = User.query.all()
    print(users)

    email = get_identity()
    if email == 'token expired':
        return log_out()
    user_email = db.session.query(User).filter(User.email == email).first()
    if user_email:
        user_info = {'user_info': [user_email.name, user_email.email]}
        return jsonify(user_info)

    return 'null'


@main.route('/add_movie')
def add_movie():
    email = get_identity()
    if email and email != 'token expired':
        movie_id = request.args.get('movie_id')
        user = User.query.filter_by(email=email).first()
        if user.watchlist:
            for movie in user.watchlist:
                if movie.movie == movie_id:
                    return 'You already added this movie'
        new_movie = Watchlist(movie=movie_id, user=user)
        try:
            db.session.add(new_movie)
            db.session.commit()
        except:
            return 'Failed'
        return 'Success'
    elif email == 'token expired':
        return email, 401
    return 'Failed', 500


@main.route('/get_watchlist')
def watchlist():
    email = get_identity()
    if email and email != 'token expired':
        user = User.query.filter_by(email=email).first()
        try:
            movies = []
            for movie in user.watchlist:
                movies.append(movie.movie)
            return jsonify(movies)
        except:
            return "Failed", 401
    elif email == 'token expired':
        return email, 401
    return 'Failed', 500


@main.route('/remove_watchlist')
def remove_watchlist():
    email = get_identity()
    if email and email != 'token expired':
        movie_id = request.args.get('movie_id')
        user = User.query.filter_by(email=email).first()
        for movie in user.watchlist:
            if movie.movie == movie_id:
                try:
                    db.session.delete(movie)
                    db.session.commit()
                except:
                    return 'Failed'
        return 'Success'
    elif email == 'token expired':
        return email, 401
    return 'Failed', 500


@main.route('/login', methods=['POST'])
def log_in():
    data = request.form.to_dict()
    email = data['email']
    if len(email.split()) > 1:
        return 'Sorry, Spaces not allowed'
    email = email.replace(" ", "").lower()

    password = data['password']
    exists_email = User.query.filter_by(email=email).first()
    exists_user_name = User.query.filter_by(user_name=email).first()
    if exists_email:
        user_email = db.session.query(User).filter(User.email == email).first()
        if bcrypt.check_password_hash(user_email.password, password):
            access_token = create_access_token(identity=user_email.email)
            resp = make_cookie(access_token)
            return resp
    elif exists_user_name:
        user_name = db.session.query(User).filter(
            User.user_name == email).first()
        if bcrypt.check_password_hash(user_name.password, password):
            access_token = create_access_token(identity=user_name.email)
            resp = make_cookie(access_token)
            return resp
    return 'Email or Password incorrect'


def make_cookie(token):
    response = jsonify({"message": "Success"})
    set_access_cookies(response, token)
    return response


@main.route('/update_pass')
def update_pass():
    email = get_identity()
    if email and email != 'token expired':
        old_password = request.args.get('old_password')
        user = db.session.query(User).filter(User.email == email).first()
        new_password = request.args.get('new_password')
        if bcrypt.check_password_hash(user.password, old_password):
            bcrypt_password = bcrypt.generate_password_hash(
                new_password).decode('utf-8')
            user.password = bcrypt_password
            db.session.commit()
            return 'password updated successfully'
        else:
            return 'incorrect old password'
    elif email == 'token expired':
        return email, 401
    return 'Failed'


@main.route('/update_name')
def update_name():
    email = get_identity()
    if email and email != 'token expired':
        new_name = request.args.get('new_name')
        user = db.session.query(User).filter(User.email == email).first()
        user.name = new_name
        db.session.commit()
        return 'name updated successfully'
    elif email == 'token expired':
        return email, 401
    return 'Failed'


@main.route('/signup', methods=['POST'])
def sign_up():
    data = request.form.to_dict()
    user_name = data['user-name']
    if len(user_name.split()) > 1:
        return 'Sorry, Spaces not allowed'
    user_name = user_name.replace(" ", "").lower()

    if any(c in special_characters for c in user_name):
        return 'Sorry, only letters (A-Z), numbers (0-9), and underscore (_) are allowd'

    name = data['name']
    email = data['email'].replace(" ", "").lower()
    exists_email = db.session.query(
        db.exists().where(User.email == email)).scalar()
    exists_user = db.session.query(db.exists().where(
        User.user_name == user_name)).scalar()
    if exists_user:
        return 'Username already registered'

    if not exists_email:
        password = data['password']
        bcrypt_password = bcrypt.generate_password_hash(
            password).decode('utf-8')
        new_email = User(user_name, name, email, bcrypt_password)
        try:
            db.session.add(new_email)
            db.session.commit()
            return 'Success'
        except:
            return 'Failed'
    else:
        return 'Email already registered'


@main.route('/check-user-name', methods=['POST'])
def check_user_name():
    data = request.form.to_dict()
    user_name = data['user-name'].replace(" ", "").lower()
    exists_user = db.session.query(db.exists().where(
        User.user_name == user_name)).scalar()
    if exists_user:
        return 'That username is taken, Try another'
    else:
        return 'Clear'


@main.route('/log_out')
def log_out():
    response = jsonify({"msg": "Logged out successfully"})
    unset_jwt_cookies(response)
    return response


@main.route('/reset', methods=['POST'])
def reset_pass():
    data = request.form.to_dict()
    email = data['email'].replace(" ", "").lower()

    exists = db.session.query(db.exists().where(User.email == email)).scalar()
    user = db.session.query(User).filter(User.email == email).first()
    if exists:
        characters = string.ascii_letters + string.digits
        punctuation = string.punctuation
        new_punctuation = ''.join(random.choice(punctuation) for i in range(3))

        new_characters = ''.join(random.choice(characters) for i in range(9))
        sr = new_characters + new_punctuation
        new_password = ''.join(random.sample(sr, len(sr)))

        sender = EMAIL_ADDRESS
        receiver = email
        password = PASSWORD
        content = f'Hello {user.name} \n\n we have reset your password \n here\'s your new password ' \
                  f'{new_password}'
        message = f'Subject: reset password\n\n{content}'

        bcrypt_password = bcrypt.generate_password_hash(
            new_password).decode('utf-8')
        user.password = bcrypt_password
        db.session.commit()
        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender, password)
            server.sendmail(sender, receiver, message)
            return f'sent to {receiver}'
        except:
            return 'Failed'
    return 'This email is not registered'
