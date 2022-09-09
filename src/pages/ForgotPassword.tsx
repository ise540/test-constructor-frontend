import { AccountCircle } from "@mui/icons-material";
import { Button, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Form } from "../components/Form";
import { useFetching } from "../hooks/useFetch";
import { useAddPopup } from "../hooks/usePopup";
import AuthService from "../services/AuthService";
import { PopupTypes } from "../types/PopupTypes";

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [resetFetching, isLoading, resetError] = useFetching(
    async (email: string) => {
      await AuthService.recover(email);
    }
  );
  const showPopup = useAddPopup()

  const resetPassword = () => {
    resetFetching(email);
    console.log(resetError)
    if(!resetError)
    showPopup("Ссылка на смену пароля отправлена!", PopupTypes.SUCCESS)
  };

  return (
    <Form header="Забыли пароль?" onSubmit={resetPassword}>
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

      <Button type="submit" variant="contained" color="success">
        Отправить ссылку для восстановления
      </Button>
    </Form>
  );
};
