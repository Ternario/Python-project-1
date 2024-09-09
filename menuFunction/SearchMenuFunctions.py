from flask import jsonify

from service.SakilaService import SakilaService
from service.StoreDataService import StoreDataService


class SearchMenuFunction:

    @staticmethod
    def get_film_by_keyword(write_connector, read_connector, word):
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

    @staticmethod
    def get_genres(read_connector):
        check_response = SakilaService.get_genres(read_connector)
        if not check_response["result"]:
            return jsonify({"result": []}), 500
        elif not check_response["data"]:
            return jsonify({"result": []}), 200
        else:
            return jsonify({"result": check_response["data"]}), 200

    @staticmethod
    def get_film_by_genre_and_release_year(write_connector, read_connector, genre, year):
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

    @staticmethod
    def get_films_by_id(write_connector, read_connector, data):

        user_id = data["user_id"]

        if not user_id:
            return jsonify({"result": []}), 400

        films_id = StoreDataService.get_list_of_favorites(write_connector, user_id)

        if not films_id["result"]:
            return jsonify({"result": []}), 500
        elif not films_id["data"]:
            return jsonify({"result": []}), 200
        else:
            check_response = SakilaService.get_films_by_id(read_connector, films_id["data"])

        if not check_response["result"]:
            return jsonify({"result": []}), 500
        elif not check_response["data"]:
            return jsonify({"result": []}), 200
        else:
            return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200

    @staticmethod
    def get_actors_or_films_by_actors(write_connector, read_connector, category_type, name):
        if not name:
            return jsonify({"result": []}), 400

        if category_type == "actors":
            check_response = SakilaService.get_actor(read_connector, name)
        else:
            check_response = SakilaService.get_films_by_actor(read_connector, name)

        if not check_response["result"]:
            return jsonify({"result": []}), 500
        elif not check_response["data"]:
            return jsonify({"result": []}), 200
        else:
            StoreDataService.is_exist_query(write_connector, name)

            return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200

    @staticmethod
    def get_top_search_query(connector):

        check_response = StoreDataService.get_search_history(connector)

        if not check_response["result"]:
            return jsonify({"result": []}), 500
        elif not check_response["data"]:
            return jsonify({"result": []}), 200
        else:
            return jsonify({"result": list(map(lambda x: x.to_json(), check_response["data"]))}), 200
