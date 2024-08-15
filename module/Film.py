class Film:
    def __init__(self, title):
        self.title = title

    def __str__(self):
        return f"Title: {self.title}"


class FilmByReleaseYear(Film):
    def __init__(self, data):
        super().__init__(data[0])
        self.release_year = data[1]

    def __str__(self):
        return f"{super().__str__()}, release year: {self.release_year}"
