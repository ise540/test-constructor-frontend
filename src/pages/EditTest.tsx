import { Button, Input } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { QuestionForm } from "../components/QuestionForm";
import {
  createCurrentQuestion,
  swapCurrentQuestionsOrder,
  updateCurrentTest,
} from "../store/currentTest/currentTestSlice";
import { useParams } from "react-router";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";
import { useState } from "react";
import { ITest } from "../models/ITest";

export const EditTest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(
    (state) => state.currentTest.currentTest.questions
  );
  const currentTest = useAppSelector((state) => state.currentTest.currentTest);
  const [order, setOrder] = useState(1);

  const addQuestion = () => {
    if (id) dispatch(createCurrentQuestion(id));
    setOrder(order + 1);
  };

  const [updateTest, isLoading, error] = useFetching(async (test: ITest) => {
    await TestService.updateTest(test);
  });

  const saveTest = async () => {
    updateTest(currentTest);
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
        {questions.map((item, index) => {
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
      <Button onClick={() => saveTest()}>Сохранить изменения</Button>
      <div>{isLoading ? "Загрузка" : ""}</div>
      <div>{error}</div>
    </div>
  );
};
