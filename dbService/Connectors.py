import mysql.connector


class ReadConnector:
    def __init__(self, config):
        try:
            self.connection = mysql.connector.connect(**config)
            self.cursor = self.connection.cursor()
            self.database_name = self.connection.database
        except mysql.connector.Error as e:
            print(f"Connect error: {e}")

    def close_connect(self):
        self.cursor.close()
        self.connection.close()


class WriteConnector(ReadConnector):
    def __init__(self, config):
        try:
            super().__init__(config)
            self.connect_or_create_users_table()
            self.connect_or_create_user_to_favorites_table()
            self.connect_or_create_history_table()
        except mysql.connector.Error as e:
            print(f"Connect error: {e}")

    def check_table(self, table):
        self.cursor.execute("SHOW TABLES LIKE %s", (table,))
        return self.cursor.fetchone()

    def connect_or_create_users_table(self):
        table = self.check_table("users")

        if not table:
            request = """CREATE TABLE users (
                    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                    user_id VARCHAR(10) NOT NULL UNIQUE,
                    user_name VARCHAR(20) NOT NULL UNIQUE CHECK ( LENGTH(user_name) > 0),
                    email VARCHAR(40) NOT NULL UNIQUE CHECK ( LENGTH(email) > 0),
                    password VARCHAR(40) NOT NULL UNIQUE CHECK ( LENGTH(password) > 0),
                    registration_data DATE NOT NULL );
                """
            try:
                self.cursor.execute(request)

            except mysql.connector.Error as e:
                print(f"Failed to create \"users\" table : {e}")

    def connect_or_create_user_to_favorites_table(self):
        table = self.check_table("users_favorites")

        if not table:
            request = """CREATE TABLE users_favorites (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id VARCHAR(10) NOT NULL,
                    film_id INT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(user_id))
                """
            try:
                self.cursor.execute(request)

            except mysql.connector.Error as e:
                print(f"Failed to create \"$users_favorites\" table : {e}")

    def connect_or_create_history_table(self):
        table = self.check_table("search_history")

        if not table:
            request = """CREATE TABLE search_history (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    query VARCHAR(80),
                    count INT)
                """
            try:
                self.cursor.execute(request)

            except mysql.connector.Error as e:
                print(f"Failed to create \"search_history\" table : {e}")
