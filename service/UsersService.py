class UsersService:

    @staticmethod
    def is_user_exist(db, email, user_name):
        db.cursor.execute(
            """
                SELECT IF(email=%s, True, False) AS user_email, IF(user_name LIKE %s, True, False) AS user_name 
                FROM users 
                WHERE email = %s OR user_name = %s;
            """, (email, user_name, email, user_name)
        )

        result = db.cursor.fetchone()

        db.cursor.reset()
        return result

    @staticmethod
    def add_new_user(db, data):
        user_name, email, user_id, password, registration_date = data
        db.cursor.execute(
            """
                INSERT INTO users (user_id, user_name, email, password, registration_data)
                VALUES (%s, %s, %s, %s, %s);
            """, (user_id, user_name, email, password, registration_date)
        )
        db.connection.commit()

        return True

    @staticmethod
    def get_user(db, email):
        db.cursor.execute(
            """
                SELECT user_id, user_name, password FROM users WHERE email = %s;
            """, (email,)
        )
        result = db.cursor.fetchone()

        if not result:
            return False
        else:
            return result

    @staticmethod
    def del_user():
        pass