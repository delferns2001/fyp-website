import json
from lib2to3.pgen2 import token
from logging import exception
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
    firstname = db.Column(db.String(50))
    lastname = db.Column(db.String(80))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    carbon_footprint_score = db.Column(db.Integer())

    metal_scanned = db.Column(db.Integer())
    glass_scanned = db.Column(db.Integer())
    cardboard_scanned = db.Column(db.Integer())
    paper_scanned = db.Column(db.Integer())
    trash_scanned = db.Column(db.Integer())
    plastic_scanned = db.Column(db.Integer())

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
        print(user.firstname)
        if user.email != emailr or user.password != password:
            return {"msg": "Wrong email or password"}, 401

        access_token = create_access_token(identity=emailr)
        response = {"access_token": access_token,
                    "firstname": user.firstname,
                    "lastname": user.lastname,
                    "email": user.email,
                    "carbon_footprint_score": user.carbon_footprint_score, }
        return response
    except:
        return {"msg": "Email Doesn't Exist"}, 401


@ app.route('/profile', methods=["GET"])
@ jwt_required()
def my_profile():

    try:
        current_user = User.query.filter_by(email=get_jwt_identity()).first()
        print(current_user)
        response_body = {
            "fullName": current_user.firstname + " " + current_user.lastname,
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
        print("update")
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
        print("not updated")
        # Case where there is not a valid JWT. Just return the original respone
        return response


@ app.route("/signup", methods=["POST"])
def create_user():

    try:
        firstname = request.json.get("firstname", None)
        lastname = request.json.get("lastname", None)
        email = request.json.get("email", None)
        password = request.json.get("password", None)
        carbon_footprint_score = request.json.get(
            "carbon_footprint_score", None)
        newUser = User(firstname=firstname, lastname=lastname,
                       email=email, password=password, carbon_footprint_score=carbon_footprint_score,
                       metal_scanned=0, glass_scanned=0, cardboard_scanned=0, paper_scanned=0, trash_scanned=0, plastic_scanned=0)
        db.session.add(newUser)
        db.session.commit()
        return ("user added"), 200
    except(sqlalchemy.exc.IntegrityError):
        return ("Email already exists"), 409


@ app.route("/updateuser/carbonFootprint", methods=["POST"])
@jwt_required()
def update_user():
    carbon_footprint_score = request.json.get(
        "carbon_footprint_score", None)
    try:
        user_to_update = User.query.filter_by(email=get_jwt_identity()).first()
        user_to_update.carbon_footprint_score = carbon_footprint_score
        db.session.commit()
        response = {"firstname": user_to_update.firstname,
                    "lastname": user_to_update.lastname,
                    "email": user_to_update.email,
                    "carbon_footprint_score": user_to_update.carbon_footprint_score, }

        return jsonify(response)
    except:
        return ("Error took place"), 400


@ app.route("/getstats", methods=["GET"])
@ jwt_required()
def getstats():
    try:
        user = User.query.filter_by(email=get_jwt_identity()).first()
        response = {"metal": user.metal_scanned,
                    "glass": user.glass_scanned,
                    "cardboard": user.cardboard_scanned,
                    "paper": user.paper_scanned,
                    "trash": user.trash_scanned,
                    "plastic": user.plastic_scanned}
        return (response)
    except:
        return ("Error took place"), 400


@ app.route("/updatestats", methods=["POST"])
@ jwt_required()
def updatestats():
    try:
        user = User.query.filter_by(email=get_jwt_identity()).first()
        user.metal_scanned += request.json.get("metal", None)
        user.glass_scanned += request.json.get("glass", None)
        user.cardboard_scanned += request.json.get("cardboard", None)
        user.paper_scanned += request.json.get("paper", None)
        user.trash_scanned += request.json.get("trash", None)
        user.plastic_scanned += request.json.get("plastic", None)
        db.session.commit()
        return ("stats updated")
    except:
        return ("Error took place"), 400


if __name__ == "__main__":
    app.run(debug=True)
