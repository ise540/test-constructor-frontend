import { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Loader } from "../components/Loader";
import { Question } from "../components/TestPassForm/Question";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import AnswerService from "../services/AnswerService";
import TestService from "../services/TestService";
import { addAnswers } from "../store/answers/answerSlice";
import { setCurrentTest } from "../store/currentTest/currentTestSlice";

const LoaderContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PassingTest = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const currentTest = useAppSelector((state) => state.currentTest.currentTest);

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

  useEffect(() => {
    testFetching();
    answersFetching();
  }, [testFetching, answersFetching]);

  return (
    <div>
      {isTestLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <div>
          <h1>{currentTest.title}</h1>
          {currentTest.questions.map((item) => {
            return <Question key={item.id} question={item} />;
          })}
        </div>
      )}
    </div>
  );
};
