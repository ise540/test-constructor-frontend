import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useFetching } from "../../hooks/useFetch";
import { IAnswer } from "../../models/IAnswer";
import { IUserAnswer } from "../../models/IUserAnswer";
import AnswerService from "../../services/AnswerService";
import { v4 as uuidv4 } from "uuid";

interface RadioAnswerProps {
  answers: IAnswer[];
}

export const RadioAnswer: FC<RadioAnswerProps> = ({ answers }) => {
  const testId = useAppSelector((state) => state.currentTest.currentTest.id);
  const answersIds = answers.map((item) => item.id);
  const selectedAnswer = useAppSelector((state) => state.answers.answers).find((answer) =>
  answersIds.includes(answer.answerId)
);;
  const [radioValue, setRadioValue] = useState(
    selectedAnswer
      ? JSON.stringify({
          value: selectedAnswer?.value,
          answerId: selectedAnswer?.answerId,
        })
      : ""
  );

  const [userAnswerFetching, isUserAnswerLoading, userAnswerError] =
    useFetching(async (userAnswer: IUserAnswer) => {
      await AnswerService.sendAnswer(userAnswer.answerId, userAnswer);
    });

  const sendRadioAnswer = (userAnswer: IUserAnswer) => {
    userAnswerFetching(userAnswer);
  };

  return (
    <RadioGroup
      value={radioValue}
      onChange={(event) => {
        setRadioValue(event.target.value);
        const currentAnswer = JSON.parse(event.target.value);
        sendRadioAnswer({
          testId,
          value: currentAnswer.value,
          id: uuidv4(),
          answerId: currentAnswer.answerId,
        });
      }}
    >
      {answers.map((item) => (
        <FormControlLabel
          key={item.id}
          value={JSON.stringify({ value: item.value, answerId: item.id })}
          control={<Radio />}
          label={item.value}
        />
      ))}
    </RadioGroup>
  );
};
