import { Button, Input, Paper } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { QuestionForm } from "../components/TestEditForm/QuestionForm";
import {
  createCurrentQuestion,
  emptyCurrentTest,
  swapCurrentQuestionsOrder,
  updateCurrentTest,
} from "../store/currentTest/currentTestSlice";
import { useNavigate, useParams } from "react-router";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";

import { ITest } from "../models/ITest";
import styled from "styled-components";

const StyledPage = styled(Paper)`
  padding: 10px 30px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NewTest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentTest = useAppSelector((state) => state.currentTest.currentTest);
  const navigate = useNavigate();

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
    navigate("/my-tests", { replace: true });
  };

  return (
    <StyledPage>
      <h1>Название теста</h1>
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
      <StyledDiv>
        <Button onClick={() => addQuestion()}>Добавить вопрос</Button>
        <Button color="success" variant="contained" onClick={() => saveTest()}>
          Сохранить новый тест
        </Button>
      </StyledDiv>

      <div>{isLoading ? "Загрузка" : ""}</div>
      <div>{error}</div>
    </StyledPage>
  );
};
