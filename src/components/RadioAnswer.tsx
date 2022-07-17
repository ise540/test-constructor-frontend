import { FormControlLabel, IconButton, Input, Radio } from "@mui/material";
import { FC } from "react";
import { useAppDispatch } from "../hooks/redux";
import { IAnswer } from "../models/IAnswer";
import {
  deleteCurrentAnswer,
  setCorrectCurrentAnswer,
  updateCurrentAnswer,
} from "../store/currentTest/currentTestSlice";
import ClearIcon from "@mui/icons-material/Clear";

interface RadioAnswerProps {
  answer: IAnswer;
}

export const RadioAnswer: FC<RadioAnswerProps> = ({ answer }) => {
  const dispatch = useAppDispatch();

  return (
    <div id={answer.id}>
      <FormControlLabel
        value={answer.value}
        control={
          <Radio
            checked={answer.correct}
            onChange={(event) => {
              dispatch(
                setCorrectCurrentAnswer({
                  answerId: answer.id,
                  questionId: answer.questionId,
                })
              );
            }}
          />
        }
        label=""
      />
      <Input
        value={answer.value}
        onChange={(event) => {
          dispatch(
            updateCurrentAnswer({
              id: answer.id,
              questionId: answer.questionId,
              correct: answer.correct,
              value: event.target.value,
            })
          );
        }}
      />
      <IconButton
        onClick={() => {
          dispatch(
            deleteCurrentAnswer({
              answerId: answer.id,
              questionId: answer.questionId,
            })
          );
        }}
      >
        <ClearIcon />
      </IconButton>
    </div>
  );
};
