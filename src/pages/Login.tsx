import { Button, Input } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserLogin } from "../store/auth/asyncActions";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function login() {
    dispatch(fetchUserLogin(email, password));
    navigate('/')
  }

  return (
    <div>
      <Input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="email"
      />
      <Input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="password"
      />
      <Button onClick={login}>Авторизация</Button>
      <div>
        {userState.isLoading ? (
          "loading..."
        ) : (
          <div>
            <div>{userState.user?.email}</div>
            <div>{userState.user?.id}</div>
            <div>{userState.user?.isActivated}</div>
            <div>{userState.token}</div>
            <div>{userState.error}</div>
          </div>
        )}
      </div>
    </div>
  );
};
