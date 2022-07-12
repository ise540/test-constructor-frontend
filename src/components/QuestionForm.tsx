import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC, useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { AnswerForm } from "./AnswerForm";
import { Types } from "../types/QuestionTypes";

interface QuestionFormProps {
  id: string;
  answers?: [];
}

const StyledQuestion = styled(Paper)`
  max-width: 80%;
  min-height: 50px;
  margin: 5px;
`;

export const QuestionForm: FC<QuestionFormProps> = ({ id }) => {
  const [answers, setAnswers] = useState<string[]>([]);

  const [type, setType] = useState<Types>(Types.RADIO);

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as any);
  };

  const addAnswer = () => {
    setAnswers([...answers, uuidv4()]);
  };

  return (
    <StyledQuestion id={id}>
      <h5>Описание вопроса</h5>
      <Input sx={{ marginBottom: "10px" }} />
      <FormControl fullWidth>
        <InputLabel>Тип вопроса</InputLabel>
        <Select value={type} label="Type" onChange={handleChange}>
          <MenuItem value={Types.RADIO}>Один ответ</MenuItem>
          <MenuItem value={Types.CHECKBOX}>Несколько ответов</MenuItem>
          <MenuItem value={Types.INPUT}>Свободный ответ</MenuItem>
        </Select>
      </FormControl>
      <div>
        {type === Types.INPUT ? (
          <AnswerForm type={type} answers={answers} />
        ) : (
          <>
            <AnswerForm type={type} answers={answers} />
            <Button onClick={() => addAnswer()}>Add answer</Button>
          </>
        )}
      </div>
    </StyledQuestion>
  );
};
