class SearchHistory:
    def __init__(self, date):
        self.id = date[0]
        self.query = date[1]

    def __str__(self):
        return f"{self.query}"

    def to_json(self):
        return {
            "id": self.id,
            "title": self.query
        }
