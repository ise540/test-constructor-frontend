import { useCallback, useState } from "react";

export const useFetching = (cb: () => Promise<any>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async () => {
    try {
      setIsLoading(true);
      await cb();
    } catch (error: any) {
      console.error(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  const callbackFetching = useCallback(fetching, []);
  return [callbackFetching, isLoading, error] as const;
};
