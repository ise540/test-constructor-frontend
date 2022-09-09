import { Paper } from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";
import { StyledH1, StyledPaper } from "./styled";

const StyledDiv = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

interface FormProps {
  header: string;
  children: React.ReactNode;
  onSubmit: () => void;
}

export const Form: FC<FormProps> = ({ header, children, onSubmit }) => {
  return (
    <StyledPaper>
      <StyledH1>{header}</StyledH1>
      <StyledDiv
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        {children}
      </StyledDiv>
    </StyledPaper>
  );
};
