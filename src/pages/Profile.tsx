import styled from "styled-components";
import { Form } from "../components/Form";
import { useAppSelector } from "../hooks/redux";


export const Profile = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <Form header={"Профиль"}>
      <h1>{user?.email}</h1>
      <h3>
        {!user?.isActivated ? "Аккаунт не активирован" : "Аккаунт активирован"}
      </h3>
      <p>{user?.id}</p>
    </Form>
  );
};
