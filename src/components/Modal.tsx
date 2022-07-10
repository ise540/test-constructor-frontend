import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

const StyledBox = styled(Box)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  border: 2px solid #000;
  box-shadow: 24;
  padding: 20;
  background-color: white;
`;

interface BasicModalProps {
  open: boolean;
  setOpen: (param: boolean) => void;
  children: React.ReactNode;
}

export const BasicModal: React.FC<BasicModalProps> = ({
  open,
  setOpen,
  children,
}) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <StyledBox>{children}</StyledBox>
    </Modal>
  );
};
