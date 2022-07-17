import { Routes, Route } from "react-router";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { useAppSelector } from "../hooks/redux";
import { CompletedTests } from "../pages/CompletedTests";
import { Login } from "../pages/Login";
import { MyTests } from "../pages/MyTests";
import { NewTest } from "../pages/NewTest";
import { Profile } from "../pages/Profile";
import { Registration } from "../pages/Registration";

export const AppRouter = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="*" element={<Main />} />
        {!isAuth ? (
          <>
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="profile" element={<Profile />} />
            <Route path="completed-tests" element={<CompletedTests />} />
            <Route path="my-tests" element={<MyTests />} />
            <Route path="my-tests/:id" element={<NewTest />} />
            <Route path="my-tests/new-test/:id" element={<NewTest />} />
            
          </>
        )}
      </Route>
    </Routes>
  );
};
