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
  const navigate = useNavigate()
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  if(!link) navigate("/", {replace:true})

  const [resetFetching, isLoading, resetError] = useFetching(async () => {
    if(!link) return
    await AuthService.setNewPassword(link, password);
  });
  const reset = () => {
    resetFetching();
  };

  return (
    <Form header="Забыли пароль?">
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
        variant="contained"
        color="success"
        onClick={() => reset()}
      >
        Сменить пароль
      </Button>
    </Form>
  );
};
