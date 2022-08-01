import { Button, Input, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { QuestionForm } from "../components/TestEditForm/QuestionForm";
import {
  createCurrentQuestion,
  swapCurrentQuestionsOrder,
  updateCurrentTest,
} from "../store/currentTest/currentTestSlice";
import { useNavigate, useParams } from "react-router";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";
import { useState } from "react";
import { ITest } from "../models/ITest";
import styled from "styled-components";

const StyledPage = styled(Paper)`
  padding: 10px 30px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EditTest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(
    (state) => state.currentTest.currentTest.questions
  );
  const navigate = useNavigate();
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
    navigate("/my-tests", { replace: true });
  };

  return (
    <StyledPage>
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
      <StyledDiv>
        <Button onClick={() => addQuestion()}>Добавить вопрос</Button>
        <Button color="success" variant="contained" onClick={() => saveTest()}>
          Сохранить изменения
        </Button>
      </StyledDiv>

      <div>{isLoading ? "Загрузка" : ""}</div>
      <div>{error}</div>
    </StyledPage>
  );
};
