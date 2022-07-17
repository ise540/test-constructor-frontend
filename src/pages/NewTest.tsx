import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { QuestionForm } from "../components/QuestionForm";
import { createCurrentQuestion } from "../store/currentTest/currentTestSlice";
import { useParams } from "react-router";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";

export const NewTest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(
    (state) => state.currentTest.currentTest.questions
  );
  const currentTest = useAppSelector(state => state.currentTest.currentTest)

  const addQuestion = () => {
    if (id) dispatch(createCurrentQuestion(id));
  };

  const [createTest, isLoading, error] = useFetching(async ()=> {await TestService.createTest(currentTest)})

  const saveTest = async () => {
    createTest()
  } 

  return (
    <div>
      <div>
        {questions.map((item, index) => {
          return <QuestionForm key={index} question={item} />;
        })}
      </div>

      <Button onClick={() => addQuestion()}>Добавить вопрос</Button>
      <Button onClick={() => saveTest()}>Сохранить вопрос</Button>
      <div>{isLoading?"Загрузка":""}</div>
      <div>{error}</div>
    </div>
  );
};
