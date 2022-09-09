import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const StyledBox = styled(Box)`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: space-evenly;
  flex-direction: column;
  top: 50%;
  left: 50%;
  padding: 50px;
  min-width: 300px;
  min-height: 300px;

  transform: translate(-50%, -50%);
  border-radius: 15px;
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
      <StyledBox>
        {children}
        <IconButton color="error"
          size="large"
          sx={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </StyledBox>
    </Modal>
  );
};
