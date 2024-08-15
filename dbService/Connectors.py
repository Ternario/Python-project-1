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


class WriteConnector:
    def __init__(self, config):
        try:
            self.connection = mysql.connector.connect(**config)
            self.cursor = self.connection.cursor()
            self.database_name = self.connection.database
            self.connect_or_create_table()

        except mysql.connector.Error as e:
            print(f"Connect error: {e}")

    def connect_or_create_table(self):
        table = self.check_table("search_history")

        if not table:
            request = "CREATE TABLE search_history (id INT AUTO_INCREMENT PRIMARY KEY, query VARCHAR(80), count INT)"

            try:
                self.cursor.execute(request)

            except mysql.connector.Error as e:
                print(f"Failed to create \"search_history\" table : {e}")

    def check_table(self, table):
        self.cursor.execute("SHOW TABLES LIKE %s", (table,))
        return self.cursor.fetchone()

    def close_connect(self):
        self.cursor.close()
        self.connection.close()
