import { FC, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

interface ButtonProps {
  margin?: string;
  fontSize?: string;
  children?: ReactNode;
  onClick: () => void;
}

const StyledButton = styled(Button)<ButtonProps>`
  margin: ${(props) => props.margin};
  font-family: 'Roboto Slab', serif;
  font-size: ${(props) => props.fontSize};
  border:1px solid black;
  color: black;
  :hover {
    background-color: #787878;
  }
`;

export const NavButton: FC<ButtonProps> = ({
  onClick,
  fontSize,
  margin,
  children,
}) => {
  return (
    <StyledButton onClick={onClick} fontSize={fontSize} margin={margin}>
      {children}
    </StyledButton>
  );
};
