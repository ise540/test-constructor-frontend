import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CreateTestModal } from "../components/CreateTestModal";
import { useFetching } from "../hooks/useFetch";
import { ITest } from "../models/ITest";
import TestService from "../services/TestService";

export const MyTests = () => {
  const [tests, setTests] = useState<ITest[]>([]);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const response = await TestService.getAll();
    setTests(response.data);
  });

  useEffect(() => {
    testFetching();
  }, [testFetching]);

  return (
    <div>
      <h1>My tests</h1>
      {tests.map((test) => {
        return (
          <div>
            <div onClick={() => navigate(`${test.id}`)}>{test.id}</div>
          </div>
        );
      })}
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <CreateTestModal open={isOpen} setOpen={setOpen} />
    </div>
  );
};
