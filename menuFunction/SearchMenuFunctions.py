from service.SakilaService import SakilaService
from service.StoreDataService import StoreDataService


class SearchMenuFunction:

    @staticmethod
    def get_film_by_keyword(write_connector, read_connector, word):
        result = SakilaService.get_film_by_keyword(read_connector, word)

        if not result:
            return {}

        StoreDataService.is_exist_query(write_connector, word)

        return list(map(lambda x: x.to_json(), result))

    @staticmethod
    def get_genres(read_connector):

        return SakilaService.get_genres(read_connector)

    @staticmethod
    def get_film_by_genre_and_release_year(write_connector, read_connector, genre, year):

        result = SakilaService.get_film_by_genre_and_release_year(
            read_connector, genre, year)

        if not result:
            return {}

        res = "{} {}".format(genre, year)

        StoreDataService.is_exist_query(write_connector, res)

        return list(map(lambda x: x.to_json(), result))

    @staticmethod
    def get_actors(write_connector, read_connector, name):
        result = SakilaService.get_actor(read_connector, name)

        if not result:
            return {}

        StoreDataService.is_exist_query(write_connector, name)

        return list(map(lambda x: x.to_json(), result))

    @staticmethod
    def get_films_by_actor(write_connector, read_connector, name):

        result = SakilaService.get_films_by_actor(read_connector, name)

        if not result:
            return {}

        StoreDataService.is_exist_query(write_connector, name)

        return list(map(lambda x: x.to_json(), result))

    @staticmethod
    def get_top_search_query(connector):

        result = StoreDataService.get_search_history(connector)

        if not result:
            return {}

        return list(map(lambda x: x.to_json(), result))
