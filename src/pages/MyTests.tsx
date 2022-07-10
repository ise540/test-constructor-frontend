import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { CreateTestModal } from "../components/CreateTestModal";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";

export const MyTests = () => {
  const [tests, setTests] = useState<any>([]);
  const [isOpen, setOpen] = useState(false);


  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const fetchedTests = await TestService.getAll();
    setTests(fetchedTests);
  });

  useEffect(() => {
    testFetching();
  }, [testFetching]);

  return (
    <div>
      <h1>My tests</h1>

      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <CreateTestModal open={isOpen} setOpen={setOpen}/>
    </div>
  );
};
