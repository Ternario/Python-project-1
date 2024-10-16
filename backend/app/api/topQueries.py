from flask import Blueprint, jsonify
from app.initDb import write_connector
from app.services.dbService.StoreDataService import StoreDataService

bp = Blueprint("top_queries", __name__, url_prefix="/top_queries")


@bp.route("", methods=["GET"])
def get_top_ten_query():
    check_response = StoreDataService.get_search_history(write_connector)

    if not check_response["result"]:
        return jsonify({"result": []}), 500
    elif not check_response["data"]:
        return jsonify({"result": []}), 200
    else:
        return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200
