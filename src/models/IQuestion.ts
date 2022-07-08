import { IAnswer } from "./IAnswer";

export interface IQuestion {
    id: string;
    description: string;
    type: 'CHECKBOX' | 'RADIO' | 'TEXT';
    order: number;
    testId: string;
    answers: IAnswer[];
}