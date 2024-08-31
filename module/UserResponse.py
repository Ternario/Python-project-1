class UserResponce:
    def __init__(self, user_id, user_name, email):
        self.user_id = user_id
        self.user_name = user_name
        self.email = email

    def __str__(self):
        return f"Username: ${self.user_name}, Email: ${self.email}"

    def to_json(self):
        return {
            "is_success": True,
            "user_id": self.user_id,
            "user_name": self.user_name,
            "email": self.email
        }
