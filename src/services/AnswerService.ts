import $api from "../api";
import { IUserAnswer } from "../models/IUserAnswer";

export default class AnswerService {
  static async sendAnswer(answerId:string, data: IUserAnswer) {
    return $api.post<IUserAnswer[]>(`/answer/${answerId}`, data);
  }
  static async getAll(testId: string) {
    return $api.get<IUserAnswer[]>(`/answer/${testId}`);
  }
}
