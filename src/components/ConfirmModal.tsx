import { FC, ReactNode } from "react";
import { NavButton } from "./Button";
import { BasicModal } from "./Modal";

interface ConfirmModalProps {
  open: boolean;
  setOpen: (param: boolean) => void;
  children: ReactNode;
  onConfirm: () => void;
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  open,
  setOpen,
  children,
  onConfirm,
}) => {
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <h3>{children}</h3>
      <NavButton
        onClick={() => {
          onConfirm();
          setOpen(false);
        }}
      >
        Confirm
      </NavButton>
      <NavButton onClick={() => setOpen(false)}>Cancel</NavButton>
    </BasicModal>
  );
};
