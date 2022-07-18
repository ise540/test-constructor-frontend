import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { NavButton } from "../components/Button";
import { CreateTestModal } from "../components/CreateTestModal";
import { TestTable } from "../components/TestTable";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import { ITest } from "../models/ITest";
import TestService from "../services/TestService";
import { setTests } from "../store/tests/testsSlice";

export const MyTests = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setOpen] = useState(false);
  const tests = useAppSelector(state => state.tests.tests)

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const response = await TestService.getAll();
    dispatch(setTests(response.data));
  });

  useEffect(() => {
    testFetching();
  }, [testFetching]);

  return (
    <div>
      <h1>My tests</h1>
      {isTestLoading ? <div>Загрузка...</div> : <TestTable tests={tests} />}
      <NavButton onClick={() => setOpen(true)}>Create new test</NavButton>
      <CreateTestModal open={isOpen} setOpen={setOpen} />
    </div>
  );
};
