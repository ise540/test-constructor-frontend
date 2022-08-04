import $api from "../api";
import { IComplitedTest } from "../models/IComplitedtest";
import { ITest } from "../models/ITest";

export default class TestService {
  static async getAll() {
    return $api.get<ITest[]>("/test");
  }

  static async getAllTests() {
    return $api.get<ITest[]>("/test/getAllTests");
  }

  static async createTest(data: ITest) {
    return $api.post<ITest>("/test", data);
  }

  static async updateTest(data: ITest) {
    return $api.put<ITest>("/test", data);
  }

  static async deleteTest(testId: string) {
    return $api.delete<ITest>(`/test/${testId}`);
  }

  static async getTestById(testId: string) {
    return $api.get<ITest>(`/test/${testId}`);
  }
  static async getAllComplited() {
    return $api.get<IComplitedTest[]>("/test/completed");
  }
  static async getComplitedById(testId: string) {
    return $api.get<IComplitedTest>(`/test/completed/${testId}`);
  }
}
