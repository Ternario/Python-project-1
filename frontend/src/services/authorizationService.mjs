import RequestsMethods from "./methods.mjs";

export default class AuthorizationService extends RequestsMethods {
    async checkUser(data) {
        const url = "authorization/check_user";

        return await super.postResource(url, data);
    }

    async signUp(data) {
        const url = "authorization/sign_up";

        return await super.postResource(url, data);
    }

    async signIn(data) {
        const url = "authorization/sign_in";

        return await super.postResource(url, data);
    }

    async deleteConfirmation(data) {
        const url = "authorization/compare_password";

        return await super.postResource(url, data);
    }

    async deleteUser(data) {
        const url = "authorization/delete";

        return await super.deleteResource(url, data);
    }
}
