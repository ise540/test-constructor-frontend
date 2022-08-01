import { RadioGroup, FormGroup, Button } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { IAnswer } from "../../models/IAnswer";
import { createCurrentAnswer } from "../../store/currentTest/currentTestSlice";
import { QuestionTypes } from "../../types/QuestionTypes";
import { RadioAnswerForm } from "./RadioAnswerForm";
import { CheckboxAnswerForm } from "./CheckboxAnswerForm";
import { InputAnswerForm } from "./InputAnswerForm";

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
          return <CheckboxAnswerForm key={item.id} answer={item} />;
        })}
        <Button onClick={() => addAnswer()}>Добавить ответ</Button>
      </FormGroup>
    );
  } else if (type === QuestionTypes.RADIO && currentAnswers) {
    return (
      <>
        <b>Ответы</b>
        <RadioGroup>
          {currentAnswers.map((item) => {
            return <RadioAnswerForm key={item.id} answer={item} />;
          })}
          <Button onClick={() => addAnswer()}>Добавить ответ</Button>
        </RadioGroup>
      </>
    );
  } else {
    return currentAnswers?.length ? (
      <InputAnswerForm answer={currentAnswers[0]} />
    ) : (
      <div>No answers</div>
    );
  }
};
