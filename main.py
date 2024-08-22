from menuFunction.MenuFunctions import MenuFunction

from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

write_connector, read_connector = MenuFunction.init_app()


@app.route("/byKeyWord/<word>")
def get_by_keyword(word):

    temp_result = MenuFunction.get_film_by_keyword(
        write_connector, read_connector, word)

    if not temp_result:
        return {}

    result = list(map(lambda x: x .to_json(), temp_result))

    return jsonify({"result": result})


@app.route("/genres")
def get_genres():
    result = MenuFunction.get_genres(read_connector)
    return jsonify({"result": result})


@app.route("/byGenreAndYear/<genre>/<year>")
def get_by_genre_and_year(genre, year):

    temp_result = MenuFunction.get_film_by_genre_and_release_year(
        write_connector, read_connector, genre, year)

    if not temp_result:
        return {}

    result = list(map(lambda x: x.to_json(), temp_result))

    return jsonify({"result": result})


@app.route("/topTenQuery")
def get_top_ten_query():
    temp_result = MenuFunction.get_top_search_query(write_connector)

    if not temp_result:
        return {}

    result = list(map(lambda x: x.to_json(), temp_result))

    return jsonify({"result": result})


if __name__ == "__main__":
    app.run(debug=True)
