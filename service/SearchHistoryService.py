from module.SearchHistory import SearchHistory


class SearchHistoryService:

    @staticmethod
    def is_exist_query(db, query):
        db.cursor.execute(
            "SELECT id, count FROM search_history WHERE query LIKE %s", (
                query,)
        )

        result = db.cursor.fetchall()
        update = SearchHistoryService.update_existed_query
        write = SearchHistoryService.write_new_history_query

        if not result:
            write(db, query)
        else:
            field_id, count = result[0]
            update(db, field_id, count + 1)

    @staticmethod
    def update_existed_query(db, field_id, count):
        db.cursor.execute(
            "UPDATE search_history SET count = %s WHERE id = %s", (
                count, field_id)
        )
        db.connection.commit()

    @staticmethod
    def write_new_history_query(db, query, count=1):
        db.cursor.execute(
            "INSERT INTO search_history (query, count) VALUES (%s, %s);", (
                query, count)
        )
        db.connection.commit()

    @staticmethod
    def get_search_history(db):
        db.cursor.execute(
            "SELECT id, query FROM search_history ORDER BY count DESC LIMIT 10;")

        return [SearchHistory(date) for date in db.cursor.fetchall()]
