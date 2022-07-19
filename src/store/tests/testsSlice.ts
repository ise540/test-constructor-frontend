import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAnswer } from "../../models/IAnswer";
import { IQuestion } from "../../models/IQuestion";
import { ITest } from "../../models/ITest";

interface TestsState {
  tests: ITest[];
}

const initialState: TestsState = {
  tests: []
};

export const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setTests(state, action: PayloadAction<ITest[]>) {
      state.tests = [];
      action.payload.forEach(test=> state.tests.push(test));
    },


    updateTest(state, action: PayloadAction<ITest>) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload.id
      );
      state.tests[currentTestIndex] = action.payload;
    },
    removeTest(state, action: PayloadAction<string>) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload
      );
      state.tests.splice(currentTestIndex, 1);
    },

    createQuestion(state, action: PayloadAction<IQuestion>) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload.testId
      );
      state.tests[currentTestIndex].questions.push(action.payload);
    },

    updateQuestion(state, action: PayloadAction<IQuestion>) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload.testId
      );
      const currentQuestionIndex = state.tests[
        currentTestIndex
      ].questions.findIndex((item) => item.id === action.payload.id);
      state.tests[currentTestIndex].questions[currentQuestionIndex] =
        action.payload;
    },

    deleteQuestion(state, action: PayloadAction<IQuestion>) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload.testId
      );
      const currentQuestionIndex = state.tests[
        currentTestIndex
      ].questions.findIndex((item) => item.id === action.payload.id);
      state.tests[currentTestIndex].questions.splice(currentQuestionIndex, 1);
    },

    createAnswer(
      state,
      action: PayloadAction<{ answer: IAnswer; testId: string }>
    ) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload.testId
      );
      const currentQuestionIndex = state.tests[
        currentTestIndex
      ].questions.findIndex(
        (item) => item.id === action.payload.answer.questionId
      );

      state.tests[currentTestIndex].questions[
        currentQuestionIndex
      ].answers.push(action.payload.answer);
    },

    updateAnswer(
      state,
      action: PayloadAction<{ answer: IAnswer; testId: string }>
    ) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload.testId
      );
      const currentQuestionIndex = state.tests[
        currentTestIndex
      ].questions.findIndex(
        (item) => item.id === action.payload.answer.questionId
      );
      const currentAnswerIndex = state.tests[currentTestIndex].questions[
        currentQuestionIndex
      ].answers.findIndex((item) => item.id === action.payload.answer.id);

      state.tests[currentTestIndex].questions[currentQuestionIndex].answers[
        currentAnswerIndex
      ] = action.payload.answer;
    },

    deleteAnswer(
      state,
      action: PayloadAction<{ answer: IAnswer; testId: string }>
    ) {
      const currentTestIndex = state.tests.findIndex(
        (item) => item.id === action.payload.testId
      );
      const currentQuestionIndex = state.tests[
        currentTestIndex
      ].questions.findIndex(
        (item) => item.id === action.payload.answer.questionId
      );
      const currentAnswerIndex = state.tests[currentTestIndex].questions[
        currentQuestionIndex
      ].answers.findIndex((item) => item.id === action.payload.answer.id);

      state.tests[currentTestIndex].questions[
        currentQuestionIndex
      ].answers.splice(currentAnswerIndex, 1);
    },
  },
});

export const {
  setTests,
  createQuestion,
  createAnswer,
  updateAnswer,
  updateQuestion,
  updateTest,
  deleteAnswer,
  deleteQuestion,
  removeTest,
} = testsSlice.actions;
export default testsSlice.reducer;
