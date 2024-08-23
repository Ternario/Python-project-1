from dbService.dbconfig import db_config
from dbService.Connectors import ReadConnector, WriteConnector
from service.SakilaService import SakilaService
from service.SearchHistoryService import SearchHistoryService


class MenuFunction:
    @staticmethod
    def init_app():
        read, write = db_config()
        read_connector = ReadConnector(read)
        write_connector = WriteConnector(write)

        return write_connector, read_connector

    @staticmethod
    def get_film_by_keyword(write_connector, read_connector, word):
        result = SakilaService.gte_film_by_keyword(read_connector, word)

        if not result:
            return

        SearchHistoryService.is_exist_query(write_connector, word)

        return result

    @staticmethod
    def get_genres(read_connector):

        return SakilaService.get_genres(read_connector)

    @staticmethod
    def get_film_by_genre_and_release_year(write_connector, read_connector, genre, year):

        result = SakilaService.get_film_by_genre_and_release_year(
            read_connector, genre, year)

        if not result:
            return

        res = "{} {}".format(genre, year)

        SearchHistoryService.is_exist_query(write_connector, res)

        return result

    @staticmethod
    def get_top_search_query(connector):

        result = SearchHistoryService.get_search_history(connector)

        if not result:
            return

        return result

    @staticmethod
    def get_actors(write_connector, read_connector, name):
        result = SakilaService.get_actor(read_connector, name)

        if not result:
            return

        SearchHistoryService.is_exist_query(write_connector, name)

        return result

    @staticmethod
    def get_films_by_actor(write_connector, read_connector, name):

        result = SakilaService.get_films_by_actor(read_connector, name)

        if not result:
            return

        SearchHistoryService.is_exist_query(write_connector, name)

        return result

    @staticmethod
    def close_app(write_connector, read_connector):
        write_connector.close_connect()
        read_connector.close_connect()
