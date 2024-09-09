class UsersService:

    @staticmethod
    def is_user_exist(db, email, user_name):
        try:
            db.cursor.execute(
                """
                    SELECT IF(email=%s, True, False) AS user_email, IF(user_name LIKE %s, True, False) AS user_name 
                    FROM users 
                    WHERE email = %s OR user_name = %s;
                """, (email, user_name, email, user_name)
            )

            result = db.cursor.fetchone()
            db.cursor.reset()

            return {
                "result": True,
                "data": result
            }
        except Exception as e:
            # make logging for e:
            return {
                "result": False
            }

    @staticmethod
    def add_new_user(db, name, email, new_data):
        user_name = name
        email = email
        user_id, password, registration_date = new_data

        try:
            db.cursor.execute(
                """
                    INSERT INTO users (user_id, user_name, email, password, registration_data)
                    VALUES (%s, %s, %s, %s, %s);
                """, (user_id, user_name, email, password, registration_date)
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
    def get_user(db, email):
        try:
            db.cursor.execute(
                """
                    SELECT user_id, user_name, password FROM users WHERE email = %s;
                """, (email,)
            )
            result = db.cursor.fetchone()
            db.cursor.reset()

            if not result:
                return {
                    "result": False
                }
            else:
                return {
                    "result": True,
                    "message": result
                }

        except Exception as e:

            return {
                "result": "error"
            }

    @staticmethod
    def del_user():
        pass
