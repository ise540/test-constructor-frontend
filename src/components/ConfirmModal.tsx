import { Button } from "@mui/material";
import { FC, ReactNode } from "react";
import styled from "styled-components";
import { BasicModal } from "./Modal";

interface ConfirmModalProps {
  open: boolean;
  setOpen: (param: boolean) => void;
  children: ReactNode;
  onConfirm: () => void;
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  setOpen,
  children,
  onConfirm,
}) => {
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <h3>{children}</h3>
      <StyledDiv>
        <Button
          sx={{ width: "45%", fontSize:"14px" }}
          variant="outlined"
          onClick={() => setOpen(false)}
        >
          Отмена
        </Button>
        <Button
           sx={{ width: "45%", fontSize:"14px" }}
          color="error"
          variant="contained"
          onClick={() => {
            onConfirm();
            setOpen(false);
          }}
        >
          Подтвердить
        </Button>
      </StyledDiv>
    </BasicModal>
  );
};
