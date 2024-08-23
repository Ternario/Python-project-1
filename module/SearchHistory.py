class SearchHistory:
    def __init__(self, date):
        self.id, self.query = date

    def __str__(self):
        return f"Query: {self.query}"

    def to_json(self):
        return {
            "id": self.id,
            "title": self.query
        }
