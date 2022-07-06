import { Button, Input } from "@mui/material";
import { FC, useState } from "react";

export const Registration: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
      <Button>Регистрация</Button>
    </div>
  );
};
