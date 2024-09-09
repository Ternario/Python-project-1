from flask import jsonify

from service.UsersService import UsersService
from secureService.SecureService import SecureService
from module.UserResponse import UserResponce


class UsersMenuFunctions:

    @staticmethod
    def create_new_user(write_connector, data):

        email = data["email"]
        name = data["user_name"]
        password = data["password"]

        if not email or not name or not password:
            return jsonify({"result": []}), 400

        check_response = UsersService.is_user_exist(
            write_connector, email, name)

        if not check_response["result"]:
            return jsonify({"result": []}), 500

        elif not check_response["data"]:
            new_data = SecureService.hash_password(password)

            if not new_data:
                return jsonify({"result": []}), 500

            create_response = UsersService.add_new_user(write_connector, name, email, new_data)

            if not create_response["result"]:
                return jsonify({"result": []}), 500

            elif create_response["result"]:
                return jsonify({"result": []}), 201

            else:
                return jsonify({"result": []}), 400

        else:
            user_email, user_name = check_response["data"]

            return jsonify({"result": {
                "email": bool(user_email),
                "user_name": bool(user_name)
            }}), 200

    @staticmethod
    def get_exist_user(write_connector, data):
        email = data["email"]
        password = data["password"]

        if not email or not password:
            return jsonify({"result": []}), 400

        check_response = UsersService.get_user(write_connector, email)

        if check_response["result"] == "error":
            return jsonify({"result": []}), 500

        elif not check_response["result"]:
            return jsonify({"result": []}), 200

        user_id, user_name, db_password = check_response["message"]

        secure_check = SecureService.password_comparison(user_id, password, db_password)

        if secure_check:
            user = UserResponce(user_id, user_name, email)

            return jsonify({"result": user.to_json()}), 200
        else:
            return jsonify({"result": []}), 401
