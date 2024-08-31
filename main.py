from dbService.dbconfig import db_config
from dbService.Connectors import ReadConnector, WriteConnector
from menuFunction.UsersMenuFunctions import UsersMenuFunctions
from menuFunction.SearchMenuFunctions import SearchMenuFunction

from flask import Flask,request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def init_app():
    read, write = db_config()
    r_connector = ReadConnector(read)
    w_connector = WriteConnector(write)

    return w_connector, r_connector


@app.route("/sign/", methods=["GET", "POST"])
def add_new_user():
    data = {
        "email": "do@gm.com",
        "user_name": "saagfgds",
        "password": "oasdasddash",
    }

    return jsonify({"result": UsersMenuFunctions.create_new_user(write_connector, data)})


@app.route("/signIn/<data>")
def get_exist_user(data):
    data = {
        "email": "do@gm.com",
        "password": "oasdasddash",
    }

    return jsonify({"result": UsersMenuFunctions.get_exist_user(write_connector, data)})


@app.route("/byKeyWord/<word>")
def get_by_keyword(word):
    return jsonify({"result": SearchMenuFunction.get_film_by_keyword(
        write_connector, read_connector, word)})


@app.route("/genres")
def get_genres():
    return jsonify({"result": SearchMenuFunction.get_genres(read_connector)})


@app.route("/byGenreAndYear/<genre>/<year>")
def get_by_genre_and_year(genre, year):
    return jsonify({"result": SearchMenuFunction.get_film_by_genre_and_release_year(
        write_connector, read_connector, genre, year)})


@app.route("/actors/<name>")
def get_actors(name):
    return jsonify({"result": SearchMenuFunction.get_actors(
        write_connector, read_connector, name)})


@app.route("/filmActor/<name>")
def get_films_by_actors(name):
    return jsonify({"result": SearchMenuFunction.get_films_by_actor(
        write_connector, read_connector, name)})


@app.route("/topTenQuery")
def get_top_ten_query():
    return jsonify({"result": SearchMenuFunction.get_top_search_query(write_connector)})


@app.route("/addToFavorites/<data>")
def add_to_favorites(data):
    pass


@app.route("/getFavorites")
def get_favorites_list():
    pass


@app.route("/delFromFavorites/<data>")
def del_from_favorites(data):
    pass


def close_connection():
    write_connector.close_connect()
    read_connector.close_connect()


if __name__ == "__main__":
    write_connector, read_connector = init_app()
    app.run(debug=True)
