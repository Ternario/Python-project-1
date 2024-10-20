import RequestsMethods from "./methods.mjs";

export default class SearchQueries extends RequestsMethods {
    async getSearchHistory() {
        const url = "top_queries";

        return await super.getResource(url);
    }
}
