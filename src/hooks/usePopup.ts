import { useCallback, useMemo } from "react";
import { addPopup, removePopup } from "../store/popups/popupSlice";
import { PopupTypes } from "../types/PopupTypes";
import { useAppDispatch, useAppSelector } from "./redux";


export function useAddPopup(): (
  message: string,
  type?: PopupTypes,
  show?: boolean,
  key?: string,
  removeAfterMs?: number
) => void {
  const dispatch = useAppDispatch();

  return useCallback(
    (message, type, show, key, removeAfterMs) => {
      dispatch(addPopup({ message, type, show, key, removeAfterMs }));
    },
    [dispatch]
  );
}

export function useRemovePopup(): (key: string) => void {
  const dispatch = useAppDispatch();
  return useCallback(
    (key: string) => {
      dispatch(removePopup({ key }));
    },
    [dispatch]
  );
}

export function useActivePopups() {
  const list = useAppSelector((state) => state.popups.popups);
  return useMemo(() => list.filter((item) => item.show), [list]);
}
