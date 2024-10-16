import RequestsMethods from "./methods.mjs";

export default class Actors extends RequestsMethods {
    async getActors(name) {
        const url = `actors/${name}`;

        return await super.getResource(url);
    }
}
