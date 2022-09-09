import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "../components/Form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUserRegistration } from "../store/auth/asyncActions";
import KeyIcon from "@mui/icons-material/Key";
import { useAddPopup } from "../hooks/usePopup";

export const Registration: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const error = useAppSelector((state) => state.user.error);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const showPopup = useAddPopup();

  function registration() {
    if(password===repeatPassword && password && error) {
      dispatch(fetchUserRegistration(email, password))
    } else if (!password) {
      showPopup("Введите пароль!")
    } else if(password!==repeatPassword){
      showPopup("Пароли не совпадают!")
    } 
  }

  return (
    <Form header="Регистрация" onSubmit={registration}>
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
      <TextField
        value={repeatPassword}
        onChange={(event) => setRepeatPassword(event.target.value)}
        label="Повторите пароль"
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
      <Button type="submit" variant="contained" color="success">
        Зарегистрировать
      </Button>
    </Form>
  );
};
