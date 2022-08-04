import { Paper } from "@mui/material";
import { FC } from "react";
import styled from "styled-components";

const StyledPaper = styled(Paper)`
  border: 2px solid black;
  width: 70%;
  height: fit-content;
  margin: 15% 15%;
  padding: 50px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledH1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

interface FormProps {
  header: string;
  children: React.ReactNode;
}

export const Form: FC<FormProps> = ({ header, children }) => {
  console.log(children);
  return (
    <StyledPaper>
      <StyledH1>{header}</StyledH1>
      <StyledDiv>{children}</StyledDiv>
    </StyledPaper>
  );
};
