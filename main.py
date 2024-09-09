from dbService.dbconfig import db_config
from dbService.Connectors import ReadConnector, WriteConnector
from menuFunction.UsersMenuFunctions import UsersMenuFunctions
from menuFunction.SearchMenuFunctions import SearchMenuFunction
from menuFunction.WriteMenuFunctions import WriteMenuFunctions

from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

read, write = db_config()


@app.route("/signUp", methods=["POST"])
def add_new_user():
    return UsersMenuFunctions.create_new_user(write_connector, request.get_json(force=True))


@app.route("/signIn", methods=["POST"])
def get_exist_user():
    return UsersMenuFunctions.get_exist_user(write_connector, request.get_json(force=True))


@app.route("/by_keyword/<word>", methods=["GET"])
def get_by_keyword(word):
    return SearchMenuFunction.get_film_by_keyword(write_connector, read_connector, word)


@app.route("/genres", methods=["GET"])
def get_genres():
    return SearchMenuFunction.get_genres(read_connector)


@app.route("/films_by_genre_and_year/<genre>/<year>", methods=["GET"])
def get_by_genre_and_year(genre, year):
    return SearchMenuFunction.get_film_by_genre_and_release_year(write_connector, read_connector, genre, year)


@app.route("/films_or_actor/<category_type>/<name>", methods=["GET"])
def get_films_or_actors(category_type, name):
    return SearchMenuFunction.get_actors_or_films_by_actors(write_connector, read_connector, category_type, name)


@app.route("/top_queries", methods=["GET"])
def get_top_ten_query():
    return SearchMenuFunction.get_top_search_query(write_connector)


@app.route("/favorites_films", methods=["POST"])
def get_favorites_list():
    return SearchMenuFunction.get_films_by_id(write_connector, read_connector, request.get_json(force=True))


@app.route("/manage_list_of_favorites", methods=["POST"])
def manage_favorites():
    return WriteMenuFunctions.manage_favorites(write_connector, request.get_json(force=True))


@app.route("/del_all_favorites", methods=["POST"])
def dell_all_favorites():
    return WriteMenuFunctions.del_all_favorites(write_connector, request.get_json(force=True))


if __name__ == "__main__":
    read_connector = ReadConnector(read)
    write_connector = WriteConnector(write)
    app.run(debug=True)
