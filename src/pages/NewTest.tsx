import { Button, Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { QuestionForm } from "../components/QuestionForm";
import {
  createCurrentQuestion,
  emptyCurrentTest,
  swapCurrentQuestionsOrder,
  updateCurrentTest,
} from "../store/currentTest/currentTestSlice";
import { useParams } from "react-router";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";

import { ITest } from "../models/ITest";

export const NewTest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentTest = useAppSelector((state) => state.currentTest.currentTest);

  const addQuestion = () => {
    if (id) {
      dispatch(createCurrentQuestion(id));
    }
  };

  const [createTest, isLoading, error] = useFetching(async (test: ITest) => {
    await TestService.createTest(test);
  });

  const saveTest = async () => {
    createTest(currentTest);
  };

  return (
    <div>
      <h2>Название теста</h2>
      <Input
        value={currentTest.title}
        onChange={(event) => {
          dispatch(updateCurrentTest(event.target.value));
        }}
      />
      <div>
        {currentTest.questions.map((item, index) => {
          return (
            <QuestionForm
              key={index}
              question={item}
              onDragStart={(e) => {
                e.dataTransfer.setData("draggedQuestionId", item.id);
              }}
              onDrop={(e) => {
                let draggedQuestion =
                  e.dataTransfer.getData("draggedQuestionId");
                dispatch(
                  swapCurrentQuestionsOrder({
                    firstQuestionId: draggedQuestion,
                    secondQuestionId: item.id,
                  })
                );
              }}
            />
          );
        })}
      </div>
      <Button onClick={() => addQuestion()}>Добавить вопрос</Button>
      <Button onClick={() => saveTest()}>Сохранить новый тест</Button>
      <div>{isLoading ? "Загрузка" : ""}</div>
      <div>{error}</div>
    </div>
  );
};
