from module.SearchHistory import SearchHistory


class StoreDataService:

    @staticmethod
    def is_exist_query(db, query):
        try:
            db.cursor.execute(
                "SELECT id, count FROM search_history WHERE query LIKE %s", (
                    query,)
            )

            result = db.cursor.fetchone()
            db.cursor.reset()

            if not result:
                StoreDataService.write_new_history_query(db, query)
            else:
                field_id, count = result[0]
                StoreDataService.update_existed_query(db, field_id, count + 1)
        except Exception as e:
            print(e)

    @staticmethod
    def update_existed_query(db, field_id, count):
        try:
            db.cursor.execute(
                "UPDATE search_history SET count = %s WHERE id = %s", (
                    count, field_id)
            )

            db.connection.commit()
        except Exception as e:
            print(e)

    @staticmethod
    def write_new_history_query(db, query, count=1):
        try:
            db.cursor.execute(
                "INSERT INTO search_history (query, count) VALUES (%s, %s);", (
                    query, count)
            )

            db.connection.commit()
        except Exception as e:
            print(e)

    @staticmethod
    def get_search_history(db):
        try:
            db.cursor.execute(
                "SELECT id, query, count FROM search_history ORDER BY count DESC LIMIT 10;")

            return {
                "result": True,
                "data": [SearchHistory(data) for data in db.cursor.fetchall()]
            }
        except Exception as e:
            return {
                "result": False
            }

    @staticmethod
    def add_to_favorites(db, user_id, film_id):

        try:
            db.cursor.execute(
                "INSERT INTO users_favorites (user_id, film_id) VALUES (%s, %s);", (
                    user_id, film_id)
            )

            db.connection.commit()

            return {
                "result": True
            }
        except Exception as e:
            return {
                "result": False
            }

    @staticmethod
    def get_list_of_favorites(db, user_id):

        try:
            db.cursor.execute(
                "SELECT film_id FROM users_favorites WHERE user_id = %s", (user_id,)
            )

            return {
                "result": True,
                "data": [film_id[0] for film_id in db.cursor.fetchall()]
            }
        except Exception as e:
            return {
                "result": False
            }

    @staticmethod
    def del_film_from_favorites(db, user_id, film_id):
        try:
            db.cursor.execute(
                "DELETE FROM users_favorites WHERE user_id = %s and film_id = %s", (user_id, film_id)
            )

            db.connection.commit()

            return {
                "result": True
            }
        except Exception as e:
            return {
                "result": False
            }

    @staticmethod
    def del_all_favorites(db, user_id):
        try:
            db.cursor.execute(
                "DELETE FROM users_favorites WHERE user_id = %s;", (user_id,)
            )

            db.connection.commit()

            return {
                "result": True
            }
        except Exception as e:
            return {
                "result": False
            }
