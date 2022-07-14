import { Input } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { NavButton } from "./Button";
import { BasicModal } from "./Modal";
import { createCurrentTest } from "../store/currentTest/currentTestSlice";
import { v4 as uuidv4 } from "uuid";

interface CreateTestModalProps {
  open: boolean;
  setOpen: (param: boolean) => void;
}

export const CreateTestModal: FC<CreateTestModalProps> = ({
  open,
  setOpen,
}) => {
  const [title, setTitle] = useState("");

  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const addTest = (title: string, userId: string) => {
    dispatch(
      createCurrentTest({ title, authorId: userId, id: uuidv4(), questions: [] })
    );
    navigate("new-test");
  };

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="title"
      ></Input>
      <NavButton onClick={()=>addTest(title, user?.id as string)}>Создать тест</NavButton>
    </BasicModal>
  );
};
