import $api from "../api";
import { ITest } from "../models/ITest";

export default class TestService {

    static async getAll() {
        return $api.get<ITest[]>("/test");
    }

    static async createTest(data:ITest) {
        return $api.post<ITest>("/test", data);
    }
}