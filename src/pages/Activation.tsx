import styled from "styled-components";
import { StyledH1, StyledPaper } from "../components/styled";

const StyledDiv = styled.div`
  font-size: 20px;
  text-align: center;
`;

export const Activation = () => {
  return (
    <StyledPaper>
      <StyledH1>Поздравляем!</StyledH1>
      <StyledDiv>Аккаунт успешно активирован</StyledDiv>
    </StyledPaper>
  );
};
