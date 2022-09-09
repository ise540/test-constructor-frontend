import { Paper } from "@mui/material";
import styled from "styled-components";

export const StyledH1 = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

export const StyledPaper = styled(Paper)`
  border: 2px solid black;
  min-width: 60%;
  height: fit-content;
  margin: 10% 20%;
  padding: 50px;

  @media (max-width: 800px) {
    min-width: 90%;
    margin: 10% 5%;
    padding: 30px;
  }
`;
