import {
  IconButton,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import { AnswerForm } from "./AnswerForm";
import { QuestionTypes } from "../types/QuestionTypes";
import { useAppDispatch } from "../hooks/redux";
import { deleteCurrentQuestion, updateCurrentQuestion } from "../store/currentTest/currentTestSlice";
import { Box } from "@mui/system";
import { IQuestion } from "../models/IQuestion";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface QuestionFormProps {
  question: IQuestion;
}

const StyledQuestion = styled(Paper)`
  max-width: 80%;
  min-height: 50px;
  margin: 5px;
  border: 2px solid black;
  padding: 10px;
`;

export const QuestionForm: FC<QuestionFormProps> = ({ question }) => {
  const dispatch = useAppDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(
      updateCurrentQuestion({
        ...question,
        type: event.target.value as QuestionTypes,
      })
    );
  };

  return (
    <StyledQuestion>
      <h3>Описание вопроса</h3>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          value={question.description}
          onChange={(event) => {
            dispatch(
              updateCurrentQuestion({
                ...question,
                description: event.target.value,
              })
            );
          }}
          multiline
          variant="standard"
          placeholder="New question"
          sx={{ marginBottom: "20px", fontSize: "20px", minWidth: "70%" }}
        />
        <FormControl sx={{ minWidth: "25%" }}>
          <InputLabel sx={{ fontSize: "16px" }}>Тип</InputLabel>
          <Select value={question.type} label="Type" onChange={handleChange}>
            <MenuItem value={QuestionTypes.RADIO}>Один ответ</MenuItem>
            <MenuItem value={QuestionTypes.CHECKBOX}>
              Несколько ответов
            </MenuItem>
            <MenuItem value={QuestionTypes.INPUT}>Свободный ответ</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <AnswerForm
        type={question.type}
        answers={question.answers}
        questionId={question.id}
      />
      <IconButton onClick={
        ()=> {
          dispatch(deleteCurrentQuestion(question.id))
        }
      }>
        <DeleteForeverIcon/>
      </IconButton>
    </StyledQuestion>
  );
};
