from flask import Blueprint, request, jsonify
from app.initDb import write_connector
from app.services.dbService.UsersService import UsersService
from app.services.secureService.SecureService import SecureService
from app.models.UserResponse import UserResponce

bp = Blueprint("authorization", __name__, url_prefix="/authorization")


@bp.route("/check_user", methods=["POST"])
def is_user_exists():
    data = request.get_json(force=True)

    email = data["email"]
    name = data["name"]

    if not email:
        return jsonify({"result": []}), 400

    check_response = UsersService.is_user_exist(
        write_connector, email, name)

    if not check_response["result"]:
        return jsonify({"result": []}), 500

    if not check_response["data"]:
        return jsonify({"result": []}), 204

    name = False
    email = False

    for i in check_response["data"]:
        if i[0]:
            email = True
        if i[1]:
            name = True

    return jsonify({"result": {
        "name": name,
        "email": email
    }}), 200


@bp.route("/sign_up", methods=["POST"])
def add_new_user():
    data = request.get_json(force=True)

    email = data["email"]
    name = data["name"]
    password = data["password"]

    if not email or not name or not password:
        return jsonify({"result": []}), 400

    new_data = SecureService.hash_password(password)

    if not new_data:
        return jsonify({"result": []}), 500

    create_response = UsersService.add_new_user(write_connector, name, email, new_data)

    if not create_response["result"]:
        return jsonify({"result": []}), 500

    else:
        return jsonify({"result": []}), 201


@bp.route("/sign_in", methods=["POST"])
def get_exist_user():
    data = request.get_json(force=True)

    email = data["email"]
    password = data["password"]

    if not email or not password:
        return jsonify({"result": []}), 400

    check_response = UsersService.get_user(write_connector, email)

    if not check_response["result"]:
        return jsonify({"result": []}), 500

    elif not check_response["data"]:
        return jsonify({"result": []}), 204

    user_id, user_name, db_password = check_response["data"]

    secure_check = SecureService.password_comparison(user_id, password, db_password)

    if not secure_check:
        return jsonify({"result": []}), 401

    user = UserResponce(user_id, user_name, email)

    return jsonify({"result": user.to_json()}), 200


@bp.route("/compare_password", methods=["POST"])
def compare_uer_password():
    data = request.get_json(force=True)

    user_id = data["user_id"]
    password = data["password"]

    if not user_id or not password:
        return jsonify({"result": []}), 400

    check_response = UsersService.get_user_password(write_connector, user_id)

    if not check_response["result"]:
        return jsonify({"result": []}), 500

    elif not check_response["data"]:
        return jsonify({"result": []}), 204

    db_password = check_response["data"]

    secure_check = SecureService.password_comparison(user_id, password, db_password)

    if not secure_check:
        return jsonify({"result": []}), 401

    return jsonify({"result": []}), 200


@bp.route("/delete", methods=["DELETE"])
def delete_user():
    data = request.get_json(force=True)

    user_id = data["user_id"]

    if not user_id:
        return jsonify({"result": []}), 400

    check_response = UsersService.delete_user(write_connector, user_id)

    if not check_response["result"]:
        return jsonify({"result": []}), 500

    return jsonify({"result": []}), 200
