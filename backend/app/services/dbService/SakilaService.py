from app.models.Film import Film
from app.models.Actor import Actor
from app.services.loggerService.loggerService import LoggerService


class SakilaService:
    @staticmethod
    def get_film_by_keyword(db, word):
        try:
            db.cursor.execute(
                """
                    SELECT film_id, title,release_year, description
                    FROM film
                    WHERE title LIKE %s 
                    LIMIT 10
                """, ("%" + word + "%",)
            )

            return {
                "result": True,
                "data": [Film(data) for data in db.cursor.fetchall()]
            }
        except Exception as e:
            LoggerService.write_error_into_log_file(e)

            return {
                "result": False
            }

    @staticmethod
    def get_films_by_id(db, film_ids):

        try:
            db.cursor.execute(
                "SELECT film_id, title, release_year, description FROM film WHERE film_id in ({});".format(
                    str(film_ids).replace("[", "").replace("]", ""))

            )

            return {
                "result": True,
                "data": [Film(data) for data in db.cursor.fetchall()]
            }
        except Exception as e:
            LoggerService.write_error_into_log_file(e)

            return {
                "result": False
            }

    @staticmethod
    def get_genres(db):
        try:
            db.cursor.execute("SELECT name FROM category;")

            return {
                "result": True,
                "data": [name for name in db.cursor.fetchall()]
            }
        except Exception as e:
            LoggerService.write_error_into_log_file(e)

            return {
                "result": False
            }

    @staticmethod
    def get_film_by_genre_and_release_year(db, genre, year):
        try:
            db.cursor.execute(
                """
                    SELECT f.film_id, f.title, f.release_year, f.description
                    FROM film AS f
                    JOIN film_category AS fc
                    on f.film_id = fc.film_id
                    JOIN category AS c
                    on c.category_id = fc.category_id
                    WHERE c.name = %s and f.release_year = %s
                    LIMIT 10
                """, (genre, year)
            )

            return {
                "result": True,
                "data": [Film(data) for data in db.cursor.fetchall()]
            }
        except Exception as e:
            LoggerService.write_error_into_log_file(e)

            return {
                "result": False
            }

    @staticmethod
    def get_films_from_favorites(db, film_ids):
        try:
            db.cursor.execute(
                """
                    SELECT film_id, title, release_year, description
                    FROM film
                    WHERE film_id in (%s)
                """, (film_ids,)
            )

            return {
                "result": True,
                "data": [Film(data) for data in db.cursor.fetchall()]
            }
        except Exception as e:
            LoggerService.write_error_into_log_file(e)

            return {
                "result": False
            }

    @staticmethod
    def get_actor(db, name):
        try:
            db.cursor.execute(
                """
                    SELECT actor_id, first_name, last_name
                    FROM actor 
                    WHERE first_name LIKE %s or last_name LIKE %s 
                    LIMIT 10
                """, (name, name)
            )

            return {
                "result": True,
                "data": [Actor(data) for data in db.cursor.fetchall()]
            }
        except Exception as e:
            LoggerService.write_error_into_log_file(e)

            return {
                "result": False
            }

    @staticmethod
    def get_films_by_actor(db, name):
        try:
            db.cursor.execute(
                """
                    SELECT f.film_id, f.title, f.release_year, f.description
                    FROM film AS f
                    JOIN film_actor AS fa
                    ON f.film_id = fa.film_id
                    JOIN actor AS a
                    ON a.actor_id = fa.actor_id
                    
                    WHERE a.first_name = %s or a.last_name = %s
                    LIMIT 10
                """, (name, name)
            )

            return {
                "result": True,
                "data": [Film(data) for data in db.cursor.fetchall()]
            }
        except Exception as e:
            LoggerService.write_error_into_log_file(e)

            return {
                "result": False
            }
