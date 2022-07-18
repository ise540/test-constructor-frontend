import React, { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {  useAppSelector } from "../hooks/redux";
import { NavButton } from "./Button";
import { DropdownMenuButton } from "./DropdownMenuButton";

interface HeaderProps {}

const StyledHeader = styled.nav<HeaderProps>`
  width: 100%;
  background-color: #b3b3b3;
  display: flex;
  justify-content: flex-end;
`

export const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();

  const isAuth = useAppSelector((state) => state.user.isAuth);

  const navToRegistration = () => {
    navigate("/registration", { replace: true });
  };

  const navToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <StyledHeader>
      {!isAuth ? (
        <>
          <NavButton onClick={navToRegistration}>Регистрация</NavButton>
          <NavButton onClick={navToLogin}>Вход</NavButton>
        </>
      ) : (
        <DropdownMenuButton/>
      )}
    </StyledHeader>
  );
};
