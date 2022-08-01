import { Input } from "@mui/material";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { IAnswer } from "../../models/IAnswer";
import { updateCurrentAnswer } from "../../store/currentTest/currentTestSlice";

interface InputAnswerFormProps {
  answer: IAnswer;
}

export const InputAnswerForm: FC<InputAnswerFormProps> = ({ answer }) => {
  const dispatch = useAppDispatch();

  return (
    <Input
      value={answer.value}
      onChange={(event) => {
        dispatch(
          updateCurrentAnswer({
            id: answer.id,
            questionId: answer.questionId,
            correct: true,
            value: event.target.value,
          })
        );
      }}
    />
  );
};
