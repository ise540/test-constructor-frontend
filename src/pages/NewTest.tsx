import { Button } from "@mui/material";
import {  useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { v4 as uuidv4 } from "uuid";

import { QuestionForm } from "../components/QuestionForm";

export const NewTest = () => {
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);

  const addQuestion = () => {
    setQuestions([...questions, uuidv4()]);
  };

  return (
    <div>
      <div>
        {questions.map((item) => {
          return <QuestionForm id={item} />;
        })}
      </div>

      <Button onClick={() => addQuestion()}>Добавить вопрос</Button>
    </div>
  );
};
