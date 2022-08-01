import React, { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {  useAppSelector } from "../hooks/redux";
import { NavButton } from "./Button";
import { DropdownMenuButton } from "./DropdownMenuButton";
import { Logo } from "./Logo";

interface HeaderProps {}

const StyledHeader = styled.nav<HeaderProps>`
  width: 100%;
  background-color: #b3b3b3;
  display: flex;
  justify-content: space-between;
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

  const navToMain = () => {
    navigate("/", { replace: true });
  };

  return (
    <StyledHeader>
      <Logo onClick={navToMain}/>
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
