import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";

export const MyTests = () => {
  const [tests, setTests] = useState<any>([]);
  const [title, setTitle] = useState('')

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const fetchedTests = await TestService.getAll();
    setTests(fetchedTests);
  });

  useEffect(() => {
    testFetching();
  }, [testFetching]);

  const addQuestion = () => {
    
  }

  return (
    <div>
      <h1>My tests</h1>
        <Input value={title} onChange={(event)=>setTitle(event.target.value)}></Input>
        <Button onClick={addQuestion}>Добавить</Button>
    </div>
  );
};
