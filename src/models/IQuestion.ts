import { QuestionTypes } from "../types/QuestionTypes";
import { IAnswer } from "./IAnswer";

export interface IQuestion {
    id: string;
    description: string;
    type: QuestionTypes;
    order: number;
    testId: string;
    answers: IAnswer[];
}