import React from "react";
import styled from "styled-components";
import { useActivePopups } from "../../hooks/usePopup";
import { Popup } from "./Popup";

const FixedPopupColumn = styled.div`
  position: fixed;
  bottom: 30px;
  right: 1rem;
  max-width: 355px;
  width: 100%;
  z-index: 3;
`;

export const Popups = () => {
  const activePopups = useActivePopups();
  return (
    <FixedPopupColumn>
      {activePopups.map((item) => (
        <Popup
          key={item.key}
          popupType={item.type}
          message={item.message}
          popKey={item.key}
          removeAfterMs={item.removeAfterMs}
        />
      ))}
    </FixedPopupColumn>
  );
};
