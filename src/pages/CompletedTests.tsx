import { useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { StyledH1 } from "../components/styled";
import { CompletedTable } from "../components/Tables/CompletedTable";
import { useAppSelector } from "../hooks/redux";
import { useFetching } from "../hooks/useFetch";
import { IComplitedTest } from "../models/IComplitedtest";
import TestService from "../services/TestService";

export const CompletedTests = () => {
  const userId = useAppSelector((state) => state.user.user?.id);
  const [result, setResult] = useState<IComplitedTest[]>([]);

  const [resultsFetching, isResultsLoading, resultsError] = useFetching(
    async () => {
      if (userId) {
        const response = await TestService.getAllComplited();
        setResult(response.data);
      }
    }
  );

  useEffect(() => {
    resultsFetching();
  }, []);

  return (
    <div>
      <StyledH1>Завершенные тесты</StyledH1>
      {isResultsLoading ? <Loader /> : <CompletedTable tests={result} />}
    </div>
  );
};
