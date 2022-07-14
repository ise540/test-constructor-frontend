import { IQuestion } from "./IQuestion";

export interface IPartialTest {
    title?: string;
    id: string;
    authorId?: string;
    questions: IQuestion[];
}