import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "../components/Form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserLogin } from "../store/auth/asyncActions";
import KeyIcon from '@mui/icons-material/Key';

export const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userState = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function login() {
    dispatch(fetchUserLogin(email, password));
    navigate("/");
  }

  return (
    <Form header={"Авторизация"}>
      <TextField
        label="Логин"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <TextField
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        label="Пароль"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <KeyIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Button  variant="contained" color="success" onClick={login}>Войти</Button>
    </Form>
  );
};
