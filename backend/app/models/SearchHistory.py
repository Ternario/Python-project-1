class SearchHistory:
    def __init__(self, data):
        self.id, self.query, self.count = data

    def __str__(self):
        return f"Query: {self.query}"

    def to_json(self):
        return {
            "id": self.id,
            "title": self.query,
            "count": self.count
        }
