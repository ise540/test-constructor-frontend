import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Form } from "../components/Form";
import { useFetching } from "../hooks/useFetch";
import AuthService from "../services/AuthService";
import KeyIcon from "@mui/icons-material/Key";
import { Navigate, useNavigate, useParams } from "react-router";

export const ResetPassword = () => {
  const { link } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  if (!link) navigate("/", { replace: true });

  const [resetFetching, isLoading, resetError] = useFetching(
    async (password: string) => {
      if (!link) return;
      await AuthService.setNewPassword(link, password);
    }
  );
  const reset = () => {
    if (password === repeatPassword) resetFetching(password);
    else console.log("passwords dont match");
  };

  return (
    <Form header="Забыли пароль?" onSubmit={reset}>
      <TextField
        label="Пароль"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
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
        label="Повторите пароль"
        value={repeatPassword}
        type="password"
        onChange={(event) => setRepeatPassword(event.target.value)}
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
        type="submit"
        variant="contained"
        color="success"
      >
        Сменить пароль
      </Button>
    </Form>
  );
};
