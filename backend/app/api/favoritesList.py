from flask import Blueprint, request, jsonify
from app.initDb import read_connector, write_connector
from app.services.dbService.SakilaService import SakilaService
from app.services.dbService.StoreDataService import StoreDataService

bp = Blueprint("favorites_list", __name__, url_prefix="/favorites_list")


@bp.route("", methods=["POST"])
def get_favorites_list():
    data = request.get_json(force=True)

    user_id = data["user_id"]

    if not user_id:
        return jsonify({"result": []}), 400

    films_id = StoreDataService.get_list_of_favorites(write_connector, user_id)

    if not films_id["result"]:
        return jsonify({"result": []}), 500
    elif not films_id["data"]:
        return jsonify({"result": []}), 200
    else:
        return jsonify({"result": films_id["data"]}), 200


@bp.route("/get_films", methods=["POST"])
def get_favorites_films():
    data = request.get_json(force=True)

    user_id = data["user_id"]
    user_list = data["films_list"]

    if not user_id:
        return jsonify({"result": []}), 400

    if not user_list:
        return jsonify({"result": []}), 204

    check_response = SakilaService.get_films_by_id(read_connector, user_list)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    elif not check_response["data"]:
        return jsonify({"result": []}), 204
    else:
        return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200


@bp.route("/add", methods=["POST"])
def add_favorites():
    data = request.get_json(force=True)

    user_id = data["user_id"]
    film_id = data["film_id"]

    if not user_id or not film_id:
        return jsonify({"result": []}), 400

    check_response = StoreDataService.add_to_favorites(write_connector, user_id, film_id)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    else:
        return jsonify({"result": []}), 201


@bp.route("/delete", methods=["DELETE"])
def delete_favorites():
    data = request.get_json(force=True)

    user_id = data["user_id"]
    film_id = data["film_id"]

    check_response = StoreDataService.del_film_from_favorites(write_connector, user_id, film_id)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    else:
        return jsonify({"result": []}), 200


@bp.route("/delete_all", methods=["DELETE"])
def dell_all_favorites():
    data = request.get_json(force=True)

    user_id = data["user_id"]

    if not user_id:
        return jsonify({"result": []}), 400

    check_response = StoreDataService.del_all_favorites(write_connector, user_id)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    else:
        return jsonify({"result": []}), 200
