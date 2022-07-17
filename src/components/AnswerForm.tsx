import { RadioGroup, FormGroup, Input, Button } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IAnswer } from "../models/IAnswer";
import { createCurrentAnswer } from "../store/currentTest/currentTestSlice";
import { QuestionTypes } from "../types/QuestionTypes";
import { RadioAnswer } from "./RadioAnswer";
import { CheckboxAnswer } from "./CheckboxAnswer";
import { InputAnswer } from "./InputAnswer";

interface AnswerFormProps {
  type: QuestionTypes;
  answers: IAnswer[];
  questionId: string;
}

export const AnswerForm: FC<AnswerFormProps> = ({ type, questionId }) => {
  const dispatch = useAppDispatch();
  const currentAnswers = useAppSelector(
    (state) =>
      state.currentTest.currentTest.questions.find(
        (item) => item.id === questionId
      )?.answers
  );

  const addAnswer = useCallback(() => {
    dispatch(createCurrentAnswer(questionId));
  }, [dispatch, questionId]);

  useEffect(() => {
    if (!currentAnswers?.length) addAnswer();
  }, [addAnswer, currentAnswers]);

  if (type === QuestionTypes.CHECKBOX && currentAnswers) {
    return (
      <FormGroup>
        {currentAnswers.map((item) => {
          return <CheckboxAnswer key={item.id} answer={item} />;
        })}
        <Button onClick={() => addAnswer()}>Add answer</Button>
      </FormGroup>
    );
  } else if (type === QuestionTypes.RADIO && currentAnswers) {
    return (
      <RadioGroup>
        {currentAnswers.map((item) => {
          return <RadioAnswer key={item.id} answer={item} />;
        })}
        <Button onClick={() => addAnswer()}>Add answer</Button>
      </RadioGroup>
    );
  } else {
    return currentAnswers?.length ? (
      <InputAnswer answer={currentAnswers[0]} />
    ) : (
      <div>No answers</div>
    );
  }
};