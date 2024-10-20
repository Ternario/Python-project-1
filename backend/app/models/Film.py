class Film:
    def __init__(self, data):
        self.id, self.title, self.release_year, self.description = data

    def __str__(self):
        return f"Id: {self.id}, Title: {self.title}, release year: {self.release_year}\nDescription: {self.description}"

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "release_year": self.release_year,
            "description": self.description
        }
