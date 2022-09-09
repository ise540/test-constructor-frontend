import { StyledH1, StyledPaper } from "../components/styled";
import { useAppSelector } from "../hooks/redux";


export const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <StyledPaper>
      <StyledH1>Профиль</StyledH1>
      <h1>{user?.email}</h1>
      <h3>
        {!user?.isActivated ? "Аккаунт не активирован" : "Аккаунт активирован"}
      </h3>
      <p>{user?.id}</p>
    </StyledPaper>
  );
};
