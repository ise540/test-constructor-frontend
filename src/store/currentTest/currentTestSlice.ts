import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer } from "../../models/IAnswer";
import { IPartialTest } from "../../models/IPartialTest";
import { IQuestion } from "../../models/IQuestion";
import { ITest } from "../../models/ITest";

interface CurrentTestState {
  currentTest: IPartialTest;
}

const initialState: CurrentTestState = {
  currentTest: {
    id: "",
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

    createCurrentQuestion(state, action: PayloadAction<IQuestion>) {
      state.currentTest.questions.push(action.payload);
    },

    updateCurrentQuestion(state, action: PayloadAction<IQuestion>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload.id
      );
      state.currentTest.questions[currentQuestionIndex] = action.payload;
    },

    deleteCurrentQuestion(state, action: PayloadAction<IQuestion>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload.id
      );
      state.currentTest.questions.splice(currentQuestionIndex, 1);
    },

    createCurrentAnswer(state, action: PayloadAction<IAnswer>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload.questionId
      );

      state.currentTest.questions[currentQuestionIndex].answers.push(
        action.payload
      );
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

    deleteCurrentAnswer(state, action: PayloadAction<IAnswer>) {
      const currentQuestionIndex = state.currentTest.questions.findIndex(
        (item) => item.id === action.payload.questionId
      );
      const currentAnswerIndex = state.currentTest.questions[
        currentQuestionIndex
      ].answers.findIndex((item) => item.id === action.payload.id);

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
} = currentTestSlice.actions;
export default currentTestSlice.reducer;
