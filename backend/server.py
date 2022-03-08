from ast import Try
import json
from lib2to3.pgen2 import token
from flask import Flask, request, jsonify
from datetime import datetime, timedelta, timezone

import sqlalchemy

from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from functools import wraps


# https://dev.to/nagatodev/how-to-add-login-authentication-to-a-flask-and-react-application-23i7

def __repr__(self):
    return '<name ->  %r>' % self.name


app = Flask(__name__)


SECRET_KEY = "very-secret-key"

app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///appdb.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)
db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    lastname = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    dateCreated = db.Column(db.DateTime, default=datetime.now)


@app.route("/")
def home():
    return "Home"


@app.route('/login', methods=["POST"])
def create_token():

    try:
        emailr = request.json.get("email", None)
        password = request.json.get("password", None)
        user = User.query.filter_by(email=emailr).first()
        print(user.name)
        if user.email != emailr or user.password != password:
            return {"msg": "Wrong email or password"}, 401

        access_token = create_access_token(identity=emailr)
        response = {"access_token": access_token,
                    "name": user.name,
                    "lastname": user.lastname,
                    "email": user.email,
                    "password": user.password}
        return response

        # # token = jwt.encode({'email': user.email, 'exp': datetime.datetime.utcnow(
        # # ) + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        # return jsonify({'access_token': access_token,
        #                 "name": user.name,
        #                 "lastname": user.lastname,
        #                 "email": user.email,
        #                 "password": user.password})
        # #
    except:
        return {"msg": "Email Doesn't Exist"}, 401


@app.route('/profile', methods=["GET"])
@jwt_required()
def my_profile():
    # email = request.json.get("email", None)
    # print(email)
    # user = User.query.filter_by(email=email).first()
    try:

        current_user = User.query.filter_by(email=get_jwt_identity()).first()
        print(current_user)

        response_body = {
            "fullName": current_user.name + " " + current_user.lastname,
            "about": current_user.email + " " + current_user.password,
            "token_exp":  get_jwt()["exp"]
        }
        return jsonify(response_body), 200
        # return jsonify(logged_in_as=current_user), 200

    except:
        return jsonify({'message': 'Error Processing Data'}), 500


@ app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@ app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


@ app.route("/signup", methods=["POST"])
def create_user():

    try:
        name = request.json.get("name", None)
        lastname = request.json.get("lastname", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        newUser = User(name=name, lastname=lastname,
                       email=email, password=password)
        db.session.add(newUser)
        db.session.commit()
        return ("user added"), 200
    except(sqlalchemy.exc.IntegrityError):
        return ("Email already exists"), 409


@ app.route("/members")
def members():
    return{"members": ["Delton", "Davina", "Socorro"]}


if __name__ == "__main__":
    app.run(debug=True)
