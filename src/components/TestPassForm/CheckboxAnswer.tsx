import { Checkbox, FormControlLabel } from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useFetching } from "../../hooks/useFetch";
import { IAnswer } from "../../models/IAnswer";
import { IUserAnswer } from "../../models/IUserAnswer";
import AnswerService from "../../services/AnswerService";
import { v4 as uuidv4 } from "uuid";

interface CheckboxAnswerProps {
  answer: IAnswer;
}

export const CheckboxAnswer: FC<CheckboxAnswerProps> = ({ answer }) => {
  const testId = useAppSelector((state) => state.currentTest.currentTest.id);
  const answers = useAppSelector((state) => state.answers.answers);
  
  const isChecked = !!answers.find(item => item.answerId === answer.id);
  const [checked, setChecked] = useState(isChecked)

  const [userAnswerFetching, isUserAnswerLoading, userAnswerError] =
    useFetching(async (userAnswer: IUserAnswer) => {
      const response = await AnswerService.sendAnswer(answer.id, userAnswer);
      console.log("data response", response);
    });

  const sendCheckboxAnswer = (userAnswer: IUserAnswer) => {
    userAnswerFetching(userAnswer);
  };

  return (
    <FormControlLabel
      value={answer.value}
      control={
        <Checkbox
          checked={checked}
          onChange={() => {
            setChecked(!checked)
            sendCheckboxAnswer({ testId, value: answer.value, id: uuidv4(), answerId: answer.id });
          }}
        />
      }
      label={answer.value}
    />
  );
};
