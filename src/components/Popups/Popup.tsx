import React, { FC, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useRemovePopup } from "../../hooks/usePopup";
import { PopupTypes } from "../../types/PopupTypes";

interface IStyledPopup {
  popupType: PopupTypes;
}

const StyledPopup = styled.div<IStyledPopup>`
  display: inline-block;
  width: 100%;
  padding: 1em;
  background-color: ${(props) =>
    props.popupType === PopupTypes.SUCCESS ? "#4bf456" : "#f15555"};
  position: relative;
  border-radius: 10px;
  padding: 20px;
  padding-right: 35px;
  overflow: hidden;
`;

interface PopupProps {
  popKey: string;
  removeAfterMs: number;
  message: string;
  popupType: PopupTypes;
}

export const Popup: FC<PopupProps> = ({
  popKey,
  removeAfterMs,
  message,
  popupType,
}) => {
  const removePopup = useRemovePopup();
  const removeThisPopup = useCallback(
    () => removePopup(popKey),
    [popKey, removePopup]
  );
  useEffect(() => {
    if (removeAfterMs === null) return undefined;

    const timeout = setTimeout(() => {
      removeThisPopup();
    }, removeAfterMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeAfterMs, removeThisPopup]);

  return (
    <StyledPopup popupType={popupType} onClick={() => removePopup(popKey)}>
      {message}
    </StyledPopup>
  );
};
