import { Routes, Route } from "react-router";
import { Layout } from "../components/Layout";
import { Main } from "../pages/Main";
import { useAppSelector } from "../hooks/redux";
import { CompletedTests } from "../pages/CompletedTests";
import { EditTest } from "../pages/EditTest";
import { Login } from "../pages/Login";
import { MyTests } from "../pages/UserTests";
import { NewTest } from "../pages/NewTest";
import { Profile } from "../pages/Profile";
import { Registration } from "../pages/Registration";
import { PassingTest } from "../pages/PassingTest";

export const AppRouter = () => {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {!isAuth ? (
          <>
            <Route index element={<Login />} />
            <Route path="registration" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route index element={<Main />} />
            <Route path="profile" element={<Profile />} />
            <Route path="completed-tests" element={<CompletedTests />} />
            <Route path="my-tests" element={<MyTests />} />
            <Route path="my-tests/edit/:id" element={<EditTest />} />
            <Route path="my-tests/new-test/:id" element={<NewTest />} />
            <Route path="passing-test/:id" element={<PassingTest />} />
            <Route path="*" element={<Main />} />
          </>
        )}
      </Route>
    </Routes>
  );
};
