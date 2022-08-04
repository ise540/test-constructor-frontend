import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Form } from "../components/Form";
import { useFetching } from "../hooks/useFetch";
import AuthService from "../services/AuthService";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [resetFetching, isLoading, resetError] = useFetching(async (email:string) => {
    await AuthService.recover(email);
  });

  const resetPassword = () => {
    resetFetching(email);
  };

  return (
    <Form header="Забыли пароль?">
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

      <Button
        variant="contained"
        color="success"
        onClick={() => resetPassword()}
      >
        Отправить ссылку для восстановления
      </Button>
    </Form>
  );
};
