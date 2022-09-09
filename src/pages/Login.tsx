import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "../components/Form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserLogin } from "../store/auth/asyncActions";
import KeyIcon from "@mui/icons-material/Key";
import { useAddPopup } from "../hooks/usePopup";

export const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const showPopup = useAddPopup()

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function login() {
    if(!email || !password) {
      showPopup("Введите логин и пароль!")
    } else dispatch(fetchUserLogin(email, password));
  }


  return (
    <Form header={"Авторизация"} onSubmit={login}>
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
      <Button
        sx={{ width: "200px" }}
        onClick={() => navigate("recover", { replace: true })}
      >
        Забыли пароль?
      </Button>
      <Button type="submit" variant="contained" color="success">
        Войти
      </Button>
    </Form>
  );
};
