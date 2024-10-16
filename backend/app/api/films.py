from flask import Blueprint, jsonify
from app.initDb import read_connector, write_connector
from app.services.dbService.SakilaService import SakilaService
from app.services.dbService.StoreDataService import StoreDataService

bp = Blueprint("films", __name__, url_prefix="/films")


@bp.route("/by_keyword/<word>", methods=["GET"])
def get_by_keyword(word):
    if not word:
        return jsonify({"result": []}), 400

    check_response = SakilaService.get_film_by_keyword(read_connector, word)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    elif not check_response["data"]:
        return jsonify({"result": []}), 200
    else:
        StoreDataService.is_exist_query(write_connector, word)

        return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200


@bp.route("/by_genre_and_year/<genre>/<year>", methods=["GET"])
def get_by_genre_and_year(genre, year):
    if not genre or not year:
        return jsonify({"result": []}), 400

    check_response = SakilaService.get_film_by_genre_and_release_year(
        read_connector, genre, year)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    elif not check_response["data"]:
        return jsonify({"result": []}), 200
    else:
        res = "{} {}".format(genre, year)

        StoreDataService.is_exist_query(write_connector, res)

        return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200


@bp.route("/by_actors/<name>", methods=["GET"])
def get_by_actor_name(name):
    if not name:
        return jsonify({"result": []}), 400
    check_response = SakilaService.get_films_by_actor(read_connector, name)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    elif not check_response["data"]:
        return jsonify({"result": []}), 200
    else:
        StoreDataService.is_exist_query(write_connector, name)

        return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200
