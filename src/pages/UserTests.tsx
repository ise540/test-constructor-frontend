import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavButton } from "../components/Button";
import { Loader } from "../components/Loader";
import { StyledH1 } from "../components/styled";
import { UserTestTable } from "../components/Tables/UserTestTable";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";
import { setTests } from "../store/tests/testsSlice";
import { v4 as uuidv4 } from "uuid";
import { createCurrentTest } from "../store/currentTest/currentTestSlice";
import { useNavigate } from "react-router";

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 100vw;
  display: flex;
  justify-content: center;
`;

export const MyTests = () => {
  const dispatch = useAppDispatch();
  const tests = useAppSelector((state) => state.tests.tests);
  const userId = useAppSelector((state) => state.user.user?.id);
  const navigate = useNavigate();

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const response = await TestService.getAll();
    dispatch(setTests(response.data));
  });

  const fetchTest = async () => {
    await testFetching();
  };

  const addTest = () => {
    const id = uuidv4();
    if (userId) {
      dispatch(
        createCurrentTest({ title: "", authorId: userId, id, questions: [] })
      );
      navigate(`new-test/${id}`);
    }
  };

  useEffect(() => {
    fetchTest();
  }, []);

  return (
    <div>
      <StyledH1>Мои тесты</StyledH1>
      {isTestLoading ? (
        <StyledDiv>
          <Loader />
        </StyledDiv>
      ) : (
        <UserTestTable tests={tests} />
      )}
      <NavButton onClick={addTest}>Создать новый тест</NavButton>
    </div>
  );
};
