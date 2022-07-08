import styled from "styled-components";
import { useAppSelector } from "../hooks/redux";

const StyledProfile = styled.div``;

export const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <StyledProfile>
      <h1>{user?.email}</h1>
      <h3>
        {user?.isActivated ? "Аккаунт не активирован" : "Аккаунт активирован"}
      </h3>
      <p>{user?.id}</p>
    </StyledProfile>
  );
};
