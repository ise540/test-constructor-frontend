import { useCallback, useState } from "react";
import { useAddPopup } from "./usePopup";

export const useFetching = (cb: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const showPopup = useAddPopup();

  const fetching = async (args?: any) => {
    try {
      setIsLoading(true);
      await cb(args);
    } catch (error: any) {
      console.error(error);
      showPopup(error.response.data.message)
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
      setError("")
    }
  };
  const callbackFetching = useCallback(fetching, [cb, showPopup]);
  return [callbackFetching, isLoading, error] as const;
};
