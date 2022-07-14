import { Types } from "../types/QuestionTypes";
import { IAnswer } from "./IAnswer";

export interface IQuestion {
    id: string;
    description: string;
    type: Types;
    order: number;
    testId: string;
    answers: IAnswer[];
}