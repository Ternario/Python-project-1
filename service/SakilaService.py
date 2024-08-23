from module.Film import Film
from module.Actor import Actor


class SakilaService:

    @staticmethod
    def gte_film_by_keyword(db, word):
        db.cursor.execute(
            """
                SELECT film_id, title,release_year, description
                FROM film 
                WHERE title LIKE %s 
                LIMIT 10
            """, ("%" + word + "%",)
        )

        return [Film(date) for date in db.cursor.fetchall()]

    @staticmethod
    def get_genres(db):
        db.cursor.execute("SELECT name FROM category;")

        return [name for name in db.cursor.fetchall()]

    @staticmethod
    def get_film_by_genre_and_release_year(db, genre, year):
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

        return [Film(date) for date in db.cursor.fetchall()]

    @staticmethod
    def get_actor(db, name):
        db.cursor.execute(
            """
                SELECT actor_id, first_name, last_name
                FROM actor 
                WHERE first_name LIKE %s or last_name LIKE %s 
                LIMIT 10
            """, (name, name)
        )

        return [Actor(date) for date in db.cursor.fetchall()]

    @staticmethod
    def get_films_by_actor(db, name):
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

        return [Film(date) for date in db.cursor.fetchall()]
