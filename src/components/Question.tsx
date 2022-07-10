import { CheckBox } from "@mui/icons-material";
import { Card, Checkbox, FormControlLabel, Paper } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";

interface QuestionProps {
  id: string;
  description: string;
  type: "CHECKBOX" | "RADIO" | "TEXT";
  answers?: [];
}

const StyledQuestion = styled(Paper)`
  max-width: 80%;
  min-height: 50px;
`;

export const Question: FC<QuestionProps> = ({id, description, type, answers}) => {
  return <StyledQuestion id={id}>
    <h3>{description}</h3>
    <FormControlLabel control={<Checkbox  />} label="12312312321" />
  </StyledQuestion>;
};

