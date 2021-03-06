import $api from "../api";
import { ITest } from "../models/ITest";

export default class TestService {

    static async getAll() {
        return $api.get<ITest[]>("/test");
    }

    static async createTest(data:ITest) {
        return $api.post<ITest>("/test", data);
    }

    static async updateTest(data:ITest) {
        return $api.put<ITest>("/test", data);
    }

    static async deleteTest(data:string) {
        return $api.delete<ITest>(`/test/${data}`);
    }
}