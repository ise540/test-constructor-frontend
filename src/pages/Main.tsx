import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";
import { setTests } from "../store/tests/testsSlice";
import { Loader } from "../components/Loader";
import { TestTable } from "../components/TestTable";
import styled from "styled-components";

const LoaderContainer = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledH1 = styled.h1`
     text-align: center;
`;

export const Main = () => {
  const dispatch = useAppDispatch();
  const tests = useAppSelector((state) => state.tests.tests);

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const response = await TestService.getAllTests();
    dispatch(setTests(response.data));
  });

  useEffect(() => {
    testFetching();
  }, [testFetching]);

  return (
    <div>
      <StyledH1>All User`s Tests across The World</StyledH1>
      {isTestLoading ? (
        <LoaderContainer>
          <Loader />
        </LoaderContainer>
      ) : (
        <TestTable tests={tests} />
      )}
    </div>
  );
};
