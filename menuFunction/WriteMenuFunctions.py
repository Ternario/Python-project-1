from flask import jsonify

from service.StoreDataService import StoreDataService


class WriteMenuFunctions:

    @staticmethod
    def manage_favorites(write_connector, data):

        user_id = data["user_id"]
        film_id = data["film_id"]

        if not user_id or not film_id:
            return jsonify({"result": []}), 400

        if data["action_type"] == "add":
            check_response = StoreDataService.add_to_favorites(write_connector, user_id, film_id)

            if not check_response["result"]:
                return jsonify({"result": []}), 500
            else:
                return jsonify({"result": []}), 201

        else:
            check_response = StoreDataService.del_film_from_favorites(write_connector, user_id, film_id)

        if not check_response["result"]:
            return jsonify({"result": []}), 500
        else:
            return jsonify({"result": []}), 200

    @staticmethod
    def del_all_favorites(write_connector, data):
        user_id = data["user_id"]

        if not user_id:
            return jsonify({"result": []}), 400

        check_response = StoreDataService.del_all_favorites(write_connector, user_id)

        if not check_response["result"]:
            return jsonify({"result": []}), 500
        else:
            return jsonify({"result": []}), 200
