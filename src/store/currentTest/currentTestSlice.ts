import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer } from "../../models/IAnswer";
import { IQuestion } from "../../models/IQuestion";
import { ITest } from "../../models/ITest";
import { v4 as uuidv4 } from "uuid";
import { QuestionTypes } from "../../types/QuestionTypes";

interface CurrentTestState {
  currentTest: ITest;
}

const initialState: CurrentTestState = {
  currentTest: {
    id: "",
    title: "",
    authorId: "",
    questions: [],
  },
};

export const currentTestSlice = createSlice({
  name: "currentTest",
  initialState,
  reducers: {
    createCurrentTest(state, action: PayloadAction<ITest>) {
      state.currentTest = action.payload;
    },

    createCurrentQuestion(state, action: PayloadAction<string>) {
      state.currentTest.questions.push({
        id: uuidv4(),
        description: "",
        type: QuestionTypes.RADIO,
        order: 1,
        testId: action.payload,
        answers: []
      });
    },

    updateCurrentQuestion(state, action: PayloadAction<IQuestion>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload.id
      );
      state.currentTest.questions[currentQuestionIndex] = action.payload;
    },

    deleteCurrentQuestion(state, action: PayloadAction<string>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload
      );
      state.currentTest.questions.splice(currentQuestionIndex, 1);
    },

    createCurrentAnswer(state, action: PayloadAction<string>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload
      );

      state.currentTest.questions[currentQuestionIndex].answers.push({
        id: uuidv4(),
        questionId: action.payload,
        correct: false,
        value: "",
      });
    },

    updateCurrentAnswer(state, action: PayloadAction<IAnswer>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload.questionId
      );
      const currentAnswerIndex = state.currentTest.questions[
        currentQuestionIndex
      ].answers.findIndex((item) => item.id === action.payload.id);

      state.currentTest.questions[currentQuestionIndex].answers[
        currentAnswerIndex
      ] = action.payload;
    },

    setCorrectCurrentAnswer(
      state,
      action: PayloadAction<{ answerId: string; questionId: string }>
    ) {
      state.currentTest.questions
        .find((question) => question.id === action.payload.questionId)!
        .answers.forEach((answer) => {
          answer.correct = false;
        });

      state.currentTest.questions
        .find((question) => question.id === action.payload.questionId)!
        .answers.find(
          (answer) => answer.id === action.payload.answerId
        )!.correct = true;
    },

    deleteCurrentAnswer(state, action: PayloadAction<{answerId:string, questionId: string}>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload.questionId
      );
      const currentAnswerIndex = state.currentTest.questions[
        currentQuestionIndex
      ].answers.findIndex((item) => item.id === action.payload.answerId);

      state.currentTest.questions[currentQuestionIndex].answers.splice(
        currentAnswerIndex,
        1
      );
    },
  },
});

export const {
  createCurrentTest,
  createCurrentQuestion,
  createCurrentAnswer,
  updateCurrentAnswer,
  updateCurrentQuestion,
  deleteCurrentAnswer,
  deleteCurrentQuestion,
  setCorrectCurrentAnswer,
} = currentTestSlice.actions;
export default currentTestSlice.reducer;
