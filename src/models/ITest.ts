import { IQuestion } from "./IQuestion";

export interface ITest {
    title: string;
    id: string;
    authorId: string;
    createdAt?: string;
    updatedAt?: string;
    questions: IQuestion[];
}