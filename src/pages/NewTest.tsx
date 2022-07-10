import { Button, Input } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/redux";
import { createQuestion } from "../store/tests/testsSlice";
import { v4 as uuidv4 } from "uuid";
import { Question } from "../components/Question";

export const NewTest = () => {
  const [description,setDescription] = useState('') 
  const dispatch = useDispatch();
 
  const user = useAppSelector((state) => state.user.user);



  const addQuestion = (title: string, userId: string) => {
    dispatch(
      createQuestion({ description, type: 'CHECKBOX', order: 1, testId: userId, id: uuidv4(), answers: [] })
    );
  };

  // id: string;
  // description: string;
  // type: 'CHECKBOX' | 'RADIO' | 'TEXT';
  // order: number;
  // testId: string;
  // answers: IAnswer[];

  return (
    <div>
      {user ? (
        <>
          <Input value={description} onChange={(event)=> {setDescription(event.target.value)}}/>
          <Button onClick={() => addQuestion(description, user.id)}>
            Добавить вопрос
          </Button>
          <Question id={"22"} description={"Вопрос?"} type={"CHECKBOX"}/>
        </>
      ) : (
        <div>Not authorized</div>
      )}
    </div>
  );
};
