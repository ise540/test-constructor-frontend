
import { useEffect, useState } from "react";
import { NavButton } from "../components/Button";
import { CreateTestModal } from "../components/CreateTestModal";
import { Loader } from "../components/Loader";
import { UserTestTable } from "../components/UserTestTable";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";
import { setTests } from "../store/tests/testsSlice";

export const MyTests = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setOpen] = useState(false);
  const tests = useAppSelector(state => state.tests.tests)

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const response = await TestService.getAll();
    dispatch(setTests(response.data));
    console.log("data response",response)
  });

  useEffect(() => {
    testFetching();
  }, [testFetching]);

  return (
    <div>
      <h1>My tests</h1>
      {isTestLoading ? <Loader/> : <UserTestTable tests={tests} />}
      <NavButton onClick={() => setOpen(true)}>Create new test</NavButton>
      <CreateTestModal open={isOpen} setOpen={setOpen} />
    </div>
  );
};
