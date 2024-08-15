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

        print("Hello user, let's get started!")
        return write_connector, read_connector

    @staticmethod
    def get_film_by_keyword(write_connector, read_connector):
        res = input("Enter a keyword: ")

        result = SakilaService.gte_film_by_keyword(read_connector, res)

        if not result:
            print("The is nothing with this word ({}) =(".format(res))
            return True if input("Want to search for more movies? (y/n)").lower() == "y" else False

        SearchHistoryService.is_exist_query(write_connector, res)

        for film in result:
            print(film)

        return True if input("Want to search for more movies? (y/n)").lower() == "y" else False

    @staticmethod
    def get_film_by_genre_and_release_year(write_connector, read_connector):

        print("Our list of genres:")
        print("-" * 85)

        result = SakilaService.get_genres(read_connector)

        for it, name in enumerate(result):
            if it % 5 == 0 and it != 0:
                print("|{:{fill}{align}{width}}".format(name[0], fill=" ", align="^", width="12"))
            else:
                print("|{:{fill}{align}{width}}".format(name[0], fill=" ", align="^", width="12"), end=" ")
        print("-" * 85)

        genre = input("Enter a genre: ")
        year = input("Enter a year: ")

        while len(genre) < 3 or genre.lower() not in [name[0].lower() for name in result]:
            print("Invalid genre name, try again")
            genre = input("Enter a genre: ")

        while len(year) != 4:
            print("Invalid year, please write full year number")
            year = input("Enter a year: ")

        res = "{} {}".format(genre, year)

        result = SakilaService.get_film_by_genre_and_release_year(read_connector, genre, year)

        if not result:
            print("The is nothing with this word ({}) =(".format(res))
            return True if input("Want to search for more movies? (y/n)").lower() == "y" else False

        SearchHistoryService.is_exist_query(write_connector, res)

        for film in result:
            print(film)

        return True if input("Want to search for more movies? (y/n)").lower() == "y" else False

    @staticmethod
    def get_top_search_query(connector):

        result = SearchHistoryService.get_search_history(connector)

        if not result:
            print("There are no search queries yet")
            return

        for query in result:
            print(query)

    @staticmethod
    def close_app(write_connector, read_connector):
        write_connector.close_connect()
        read_connector.close_connect()
        print("Bye, have a nice day!")
