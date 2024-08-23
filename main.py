from menuFunction.MenuFunctions import MenuFunction

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

connector_object = {
    "write_connector": None,
    "read_connector": None
}


@app.route("/")
def run_app():
    write_connector, read_connector = MenuFunction.init_app()

    connector_object["write_connector"] = write_connector
    connector_object["read_connector"] = read_connector

    return jsonify({"result": [{"end": True}]})


@app.route("/byKeyWord/<word>")
def get_by_keyword(word):

    temp_result = MenuFunction.get_film_by_keyword(
        connector_object["write_connector"], connector_object["read_connector"], word)

    if not temp_result:
        return {}

    result = list(map(lambda x: x .to_json(), temp_result))

    return jsonify({"result": result})


@app.route("/genres")
def get_genres():
    result = MenuFunction.get_genres(connector_object["read_connector"])
    return jsonify({"result": result})


@app.route("/byGenreAndYear/<genre>/<year>")
def get_by_genre_and_year(genre, year):

    temp_result = MenuFunction.get_film_by_genre_and_release_year(
        connector_object["write_connector"], connector_object["read_connector"], genre, year)

    if not temp_result:
        return {}

    result = list(map(lambda x: x.to_json(), temp_result))

    return jsonify({"result": result})


@app.route("/actors/<name>")
def get_actors(name):
    temp_result = MenuFunction.get_actors(
        connector_object["write_connector"], connector_object["read_connector"], name)

    if not temp_result:
        return {}

    result = list(map(lambda x: x.to_json(), temp_result))

    return jsonify({"result": result})


@app.route("/filmActor/<name>")
def get_films_by_actors(name):
    temp_result = MenuFunction.get_films_by_actor(
        connector_object["write_connector"], connector_object["read_connector"], name)

    if not temp_result:
        return {}

    result = list(map(lambda x: x.to_json(), temp_result))

    return jsonify({"result": result})


@app.route("/topTenQuery")
def get_top_ten_query():
    temp_result = MenuFunction.get_top_search_query(
        connector_object["write_connector"])

    if not temp_result:
        return {}

    result = list(map(lambda x: x.to_json(), temp_result))

    return jsonify({"result": result})


@app.route("/close")
def close_connection():
    MenuFunction.close_app(
        connector_object["write_connector"], connector_object["read_connector"])

    connector_object["write_connector"] = None
    connector_object["read_connector"] = None

    return jsonify({"result": [{"end": True}]})


if __name__ == "__main__":
    app.run(debug=True)
