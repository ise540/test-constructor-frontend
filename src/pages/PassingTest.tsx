import { Button, Paper } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import { StyledH1 } from "../components/styled";
import { Question } from "../components/TestPassForm/Question";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import { useAddPopup } from "../hooks/usePopup";
import AnswerService from "../services/AnswerService";
import TestService from "../services/TestService";
import { addAnswers } from "../store/answers/answerSlice";
import { setCurrentTest } from "../store/currentTest/currentTestSlice";
import { PopupTypes } from "../types/PopupTypes";

const LoaderContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPage = styled(Paper)`
  padding: 10px 30px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const PassingTest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentTest = useAppSelector((state) => state.currentTest.currentTest);
  const navigate = useNavigate();
  const showPopup = useAddPopup();

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    if (id) {
      const response = await TestService.getTestById(id);
      dispatch(setCurrentTest(response.data));
    }
  });

  const [answersFetching, isAnswersLoading, answersError] = useFetching(
    async () => {
      if (id) {
        const response = await AnswerService.getAll(id);
        dispatch(addAnswers(response.data));
      }
    }
  );

  const [submitFetching, isSubmitLoading, submitError] = useFetching(
    async () => {
      if (id) await AnswerService.submit(id);
    }
  );

  const submitAnswers = () => {
    submitFetching()
    if (!submitError) {
      navigate("/", { replace: true });
      showPopup("Тест успешно отправлен", PopupTypes.SUCCESS)
    }
  };

  useEffect(() => {
    testFetching();
    answersFetching();
  }, []);

  return (
    <div>
      {isTestLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <StyledPage>
          <StyledH1>{currentTest.title}</StyledH1>
          {currentTest.questions.map((item) => {
            return <Question key={item.id} question={item} />;
          })}
          <StyledDiv>
            <Button variant="contained" onClick={() => submitAnswers()}>
              Отправить
            </Button>
          </StyledDiv>
        </StyledPage>
      )}
    </div>
  );
};
