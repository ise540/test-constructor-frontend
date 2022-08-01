import { Input } from "@mui/material";
import { FC, useState } from "react";
import { useAppSelector } from "../../hooks/redux";
import { useFetching } from "../../hooks/useFetch";
import { IAnswer } from "../../models/IAnswer";
import { IUserAnswer } from "../../models/IUserAnswer";
import AnswerService from "../../services/AnswerService";
import { v4 as uuidv4 } from "uuid";

interface InputAnswerProps {
  answer: IAnswer;
}

export const InputAnswer: FC<InputAnswerProps> = ({ answer }) => {
  const testId = useAppSelector((state) => state.currentTest.currentTest.id);
  const answers = useAppSelector((state) => state.answers.answers);
  const value = answers.find(item => item.answerId === answer.id)!.value;
  const [inputValue, setValue] = useState(value)

  const [userAnswerFetching, isUserAnswerLoading, userAnswerError] =
    useFetching(async (userAnswer: IUserAnswer) => {
      const response = await AnswerService.sendAnswer(answer.id, userAnswer);
      console.log("data response", response);
    });

  const sendInputAnswer = (userAnswer: IUserAnswer) => {
    userAnswerFetching(userAnswer);
  };
  return (
    <Input
    value={inputValue}
      onChange={(event) => {
        setValue(event.target.value)
        sendInputAnswer({ testId, value: event.target.value, id: uuidv4(), answerId: answer.id });
      }}
    />
  );
};
