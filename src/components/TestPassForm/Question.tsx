import { Paper } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";
import { IQuestion } from "../../models/IQuestion";
import { Answers } from "./Answers";

interface QuestionProps {
  question: IQuestion;
}

const StyledQuestion = styled(Paper)`
  min-height: 50px;
  margin: 10px auto;
  border: 2px solid black;
  padding: 10px;
  position: relative;
`;

export const Question: FC<QuestionProps> = ({ question }) => {
  return (
    <StyledQuestion>
      <h2>Вопрос №{question.order}</h2>
      <h3>{question.description}</h3>
      <Answers key={question.id} questionType={question.type} answers={question.answers} />
    </StyledQuestion>
  );
};
