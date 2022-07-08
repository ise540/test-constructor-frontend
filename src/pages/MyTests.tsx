import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import TestService from "../services/TestService";

export const MyTests = () => {
  const [tests, setTests] = useState<any>([]);

  const [testFetching, isTestLoading, testError] = useFetching(async () => {
    const fetchedTests = await TestService.getAll();
    setTests(fetchedTests);
  });

  useEffect(() => {
    testFetching()
  }, [testFetching])
  

  return <div>MyTests</div>;
};
