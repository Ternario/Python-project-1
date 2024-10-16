from flask import Blueprint, jsonify
from app.initDb import read_connector, write_connector
from app.services.dbService.SakilaService import SakilaService
from app.services.dbService.StoreDataService import StoreDataService

bp = Blueprint("actors", __name__, url_prefix="/actors")


@bp.route("/<name>", methods=["GET"])
def get_films_or_actors(name):
    if not name:
        return jsonify({"result": []}), 400
    check_response = SakilaService.get_actor(read_connector, name)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    elif not check_response["data"]:
        return jsonify({"result": []}), 200
    else:
        StoreDataService.is_exist_query(write_connector, name)

        return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200
