from module.Film import Film, FilmByReleaseYear


class SakilaService:

    @staticmethod
    def gte_film_by_keyword(db, word):
        db.cursor.execute(
            """
            SELECT title
            FROM film 
            WHERE title LIKE %s 
            LIMIT 10
            """, ("%" + word + "%",)
        )

        return [Film(title[0]) for title in db.cursor.fetchall()]

    @staticmethod
    def get_genres(db):
        db.cursor.execute("SELECT name FROM category;")

        return [name for name in db.cursor.fetchall()]

    @staticmethod
    def get_film_by_genre_and_release_year(db, genre, year):
        db.cursor.execute(
            """
            SELECT f.title, f.release_year
            FROM film AS f
            JOIN film_category AS fc
            on f.film_id = fc.film_id
            JOIN category AS c
            on c.category_id = fc.category_id
            WHERE c.name = %s and f.release_year = %s
            LIMIT 10
            """, (genre, year)
        )

        return [FilmByReleaseYear(date) for date in db.cursor.fetchall()]
