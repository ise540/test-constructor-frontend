import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserAnswer } from "../../models/IUserAnswer";

interface answersState {
  answers: IUserAnswer[];
}

const initialState: answersState = {
  answers: [],
};

export const answersSlice = createSlice({
  name: "answers",
  initialState,
  reducers: {
    addAnswers(state, action: PayloadAction<IUserAnswer[]>) {
      action.payload.forEach((item) => state.answers.push(item));
    },
  },
});

export const { addAnswers } = answersSlice.actions;
export default answersSlice.reducer;
