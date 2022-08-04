import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { Form } from "../components/Form";
import { useAppDispatch } from "../hooks/redux";
import { fetchUserRegistration } from "../store/auth/asyncActions";
import KeyIcon from '@mui/icons-material/Key';

export const Registration: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function registration() {
    if(password===repeatPassword && password) {
      dispatch(fetchUserRegistration(email, password));
      navigate("/");
    }
  }

  return (
    <Form header="Регистрация">
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
      <Button  variant="contained" color="success" onClick={registration}>Зарегистрировать</Button>
    </Form>
  );
};
