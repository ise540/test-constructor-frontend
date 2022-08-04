import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavButton } from "../components/Button";
import { CreateTestModal } from "../components/CreateTestModal";
import { Loader } from "../components/Loader";
import { UserTestTable } from "../components/Tables/UserTestTable";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";
import { setTests } from "../store/tests/testsSlice";

const StyledH1 = styled.h1`
  text-align: center;
`;

export const MyTests = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setOpen] = useState(false);
  const tests = useAppSelector((state) => state.tests.tests);

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const response = await TestService.getAll();
    dispatch(setTests(response.data));
  });

  useEffect(() => {
    testFetching();
  }, [testFetching]);

  return (
    <div>
      <StyledH1>Мои тесты</StyledH1>
      {isTestLoading ? <Loader /> : <UserTestTable tests={tests} />}
      <NavButton onClick={() => setOpen(true)}>Create new test</NavButton>
      <CreateTestModal open={isOpen} setOpen={setOpen} />
    </div>
  );
};
