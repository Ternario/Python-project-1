class Actor:
    def __init__(self, data):
        self.id, self.first_name, self.last_name = data

    def __str__(self):
        return f"First name: {self.first_name} Last name: {self.last_name}"

    def to_json(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name
        }


