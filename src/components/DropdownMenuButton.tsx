import { FC, useState, MouseEvent, useRef } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Menu, MenuItem } from "@mui/material";
import { useAppDispatch } from "../hooks/redux";
import { fetchUserLogout } from "../store/auth/asyncActions";
import { useNavigate } from "react-router";

interface DropdownMenuButtonProps {}

const StyledIconButton = styled(IconButton)`
  color: black;
`;

export const DropdownMenuButton: FC<DropdownMenuButtonProps> = () => {
  const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null);
  const anchorRef = useRef<HTMLButtonElement | null>(null)

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(fetchUserLogout());
  };

  const navToProfile = () => {
    navigate("/profile", { replace: true });
  };

  const navToCompletedTests = () => {
    navigate("/completed-tests", { replace: true });
  };

  const navToMyTests = () => {
    navigate("/my-tests", { replace: true });
  };

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        ref={anchorRef}
      >
        <AccountCircleIcon sx={{ width: "1.5em", height: "1.5em" }} />
      </StyledIconButton>
      <Menu
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: 50 }}
        anchorEl={anchorRef.current}
      >
        <MenuItem onClick={navToMyTests}>Мои тесты</MenuItem>
        <MenuItem onClick={navToCompletedTests}>Завершенные</MenuItem>
        <MenuItem onClick={navToProfile}>Профиль</MenuItem>
        <MenuItem onClick={logout}>Выйти</MenuItem>
      </Menu>
    </>
  );
};
