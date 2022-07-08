import { Button, Input } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserRegistration } from "../store/auth/asyncActions";

export const Registration: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function registration() {
    dispatch(fetchUserRegistration(email, password));
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
      <Button onClick={registration}>Регистрация</Button>
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
