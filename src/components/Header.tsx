import React, { FC } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useAppDispatch } from "../hooks/redux";
import { fetchUserLogout } from "../store/auth/asyncActions";
import { NavButton } from "./Button";

interface HeaderProps {}

const StyledHeader = styled.nav<HeaderProps>`
  width: 100%;
  background-color: #b3b3b3;
`;

export const Header: FC<HeaderProps> = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(fetchUserLogout());
  };

  const navToRegistration = () => {
    navigate("/registration", { replace: true });
  };

  const navToLogin = () => {
    navigate("/login", { replace: true });
  };

  return (
    <StyledHeader>
      <NavButton onClick={navToRegistration} fontSize="15px" margin="2px">
        Регистрация
      </NavButton>
      <NavButton onClick={navToLogin} fontSize="15px" margin="2px">
        Вход
      </NavButton>
      <NavButton onClick={logout} fontSize="15px" margin="2px">
        ВЫХОД
      </NavButton>
    </StyledHeader>
  );
};
