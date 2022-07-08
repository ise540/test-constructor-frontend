import $api from "../api";

export default class TestService {

    static async getAll() {
        return $api.get<any>("/test");
    }
}