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
import { QuestionTypes } from "../../types/QuestionTypes";
import { useAppDispatch } from "../../hooks/redux";
import {
  deleteCurrentQuestion,
  updateCurrentQuestion,
} from "../../store/currentTest/currentTestSlice";
import { Box } from "@mui/system";
import { IQuestion } from "../../models/IQuestion";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface QuestionFormProps {
  question: IQuestion;
  onDragStart: (e:any)=>void;
  onDrop: (e:any) => void; 
}

const StyledQuestion = styled(Paper)`
  min-height: 50px;
  margin: 10px auto;
  border: 2px solid black;
  padding: 10px;
  position:relative;
`;

export const QuestionForm: FC<QuestionFormProps> = ({ question, onDragStart, onDrop }) => {
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
    <StyledQuestion
      draggable={true}
      onDragStart={onDragStart}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => e.preventDefault()}
      onDragLeave={(e) => e.preventDefault()}
      onDrop = {onDrop}
    >
      <h2>{`Вопрос №${question.order}`}</h2>
      <h4>Описание</h4>
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
      <IconButton
      sx={{position:"absolute", top:0, right:0}}
      color="error"
        onClick={() => {
          dispatch(deleteCurrentQuestion(question.id));
        }}
      >
        <DeleteForeverIcon />
      </IconButton>
    </StyledQuestion>
  );
};
