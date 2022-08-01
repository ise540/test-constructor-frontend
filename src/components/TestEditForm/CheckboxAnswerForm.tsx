import { Checkbox, FormControlLabel, Input, IconButton } from "@mui/material";
import { FC } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { IAnswer } from "../../models/IAnswer";
import {
  deleteCurrentAnswer,
  updateCurrentAnswer,
} from "../../store/currentTest/currentTestSlice";
import ClearIcon from "@mui/icons-material/Clear";

interface CheckboxAnswerFormProps {
  answer: IAnswer;
}

export const CheckboxAnswerForm: FC<CheckboxAnswerFormProps> = ({ answer }) => {
  const dispatch = useAppDispatch();

  return (
    <div id={answer.id}>
      <FormControlLabel
        value={answer.value}
        control={
          <Checkbox
            checked={answer.correct}
            onChange={(event) => {
              dispatch(
                updateCurrentAnswer({
                  id: answer.id,
                  questionId: answer.questionId,
                  correct: event.target.checked,
                  value: event.target.value,
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
        color="error"
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
