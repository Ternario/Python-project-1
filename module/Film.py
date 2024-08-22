class Film:
    def __init__(self, date):
        self.id = date[0]
        self.title = date[1]
        self.release_year = date[2]
        self.description = date[3]

    def __str__(self):
        return f"Title: {self.title}"

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "release_year": self.release_year,
            "description": self.description
        }


# class FilmByReleaseYear(Film):
#     def __init__(self, data):
#         super().__init__(data[0])
#         self.release_year = data[1]

#     def __str__(self):
#         return f"{super().__str__()}, release year: {self.release_year}"
