import { FC } from "react";
import styled from "styled-components";
import logo from "../assets/imgs/logo.png";

const StyledImg = styled.div`
  height: 50px;
  width: 100px;
  background-size: 100px 100px;
  background-position: center;
  background-image: url(${logo});
  cursor: pointer;
`;

interface LogoProps {
  onClick: ()=>void
}

export const Logo: FC<LogoProps> = ({onClick}) => {
  return <StyledImg onClick={onClick}/>;
};
