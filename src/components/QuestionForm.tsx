import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AnswerForm } from "./AnswerForm";
import { Types } from "../types/QuestionTypes";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import {
  createCurrentQuestion,
  updateCurrentQuestion,
} from "../store/currentTest/currentTestSlice";

interface QuestionFormProps {
  id: string;
  answers?: [];
}

const StyledQuestion = styled(Paper)`
  max-width: 80%;
  min-height: 50px;
  margin: 5px;
  border: 2px solid black;
  padding: 10px;
`;

export const QuestionForm: FC<QuestionFormProps> = ({ id }) => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  const [type, setType] = useState<Types>(Types.RADIO);
  const dispatch = useAppDispatch();
  const currentTest = useAppSelector((state) => state.currentTest.currentTest);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as any);
  };

  const saveData = {
    description,
    type,
    id,
    order: 1,
    testId: "sss",
    answers: [
      { id: "string", value: "string", correct: true, questionId: "123" },
    ],
  };

  const saveQuestion = () => {
    if (currentTest.questions.findIndex((item) => item.id === id) === -1) {
      dispatch(createCurrentQuestion(saveData));
    } else {
      dispatch(updateCurrentQuestion(saveData));
    }
  };

  const addAnswer = () => {
    setAnswers([...answers, uuidv4()]);
  };

  return (
    <StyledQuestion id={id}>
      <TextField
        value={description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
        multiline
        variant="standard"
        defaultValue="New question"
        sx={{ marginBottom: "20px", fontSize: "20px", minWidth: "50%" }}
      />
      <FormControl fullWidth>
        <InputLabel sx={{ fontSize: "16px" }}>Тип вопроса</InputLabel>
        <Select value={type} label="Type" onChange={handleChange}>
          <MenuItem value={Types.RADIO}>Один ответ</MenuItem>
          <MenuItem value={Types.CHECKBOX}>Несколько ответов</MenuItem>
          <MenuItem value={Types.INPUT}>Свободный ответ</MenuItem>
        </Select>
      </FormControl>
      <div>
        {type === Types.INPUT ? (
          <>
            <Button onClick={() => saveQuestion()}>Save question</Button>
            <AnswerForm type={type} answers={answers} />
          </>
        ) : (
          <>
            <AnswerForm type={type} answers={answers} />
            <Button onClick={() => saveQuestion()}>Save question</Button>
            <Button onClick={() => addAnswer()}>Add answer</Button>
          </>
        )}
      </div>
    </StyledQuestion>
  );
};
