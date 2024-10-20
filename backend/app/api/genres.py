from flask import Blueprint, jsonify
from app.initDb import read_connector
from app.services.dbService.SakilaService import SakilaService

bp = Blueprint("genres", __name__, url_prefix="/genres")


@bp.route("", methods=["GET"])
def get_genres():
    check_response = SakilaService.get_genres(read_connector)
    if not check_response["result"]:
        return jsonify({"result": []}), 500
    elif not check_response["data"]:
        return jsonify({"result": []}), 200
    else:
        return jsonify({"result": check_response["data"]}), 200
