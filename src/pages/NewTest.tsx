import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/redux";
import { createQuestion } from "../store/tests/testsSlice";
import { v4 as uuidv4 } from "uuid";
import { Question } from "../components/Question";
import { QuestionForm } from "../components/QuestionForm";

export const NewTest = () => {
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState<string[]>([]);
  const dispatch = useDispatch();

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

// id: string;
// description: string;
// type: 'CHECKBOX' | 'RADIO' | 'TEXT';
// order: number;
// testId: string;
// answers: IAnswer[];
