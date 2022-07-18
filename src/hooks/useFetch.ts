import { useCallback, useState } from "react";

export const useFetching = (cb: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetching = async (args?: any) => {
    try {
      setIsLoading(true);
      await cb(args);
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
