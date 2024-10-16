import RequestsMethods from "./methods.mjs";

export default class FavoritesListService extends RequestsMethods {
    async getFavoritesList(data) {
        const url = "favorites_list";

        return await super.postResource(url, data);
    }

    async getFavoritesFilms(data) {
        const url = "favorites_list/get_films";

        return await super.postResource(url, data);
    }

    async addToFavorites(data) {
        const url = "favorites_list/add";

        return await super.postResource(url, data);
    }

    async deleteFromFavorites(data) {
        const url = "favorites_list/delete";

        return await super.deleteResource(url, data);
    }

    async deleteEntireList(data) {
        const url = "favorites_list/delete_all";

        return await super.deleteResource(url, data);
    }
}
