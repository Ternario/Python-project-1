import RequestsMethods from "./methods.mjs";

export default class Movies extends RequestsMethods {
    async getMoviesByKeyword(word) {
        const url = `films/by_keyword/${word}`;

        return await super.getResource(url);
    }

    async getMoviesByGenreAndYear(data) {
        const url = `films/by_genre_and_year/${data.genre}/${data.year}`;

        return await super.getResource(url);
    }

    async getMoviesByActorsName(name) {
        const url = `films/by_actors/${name}`;

        return await super.getResource(url);
    }

    async getGenres() {
        const url = "genres";

        return await super.getResource(url).then((response) => {
            if (!response) {
                return false;
            }

            return response.map(this._transformGenres);
        });
    }

    _transformGenres(item) {
        return {
            id: item[0],
            title: item[0],
        };
    }
}
