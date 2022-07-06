import React from "react";
import { Routes, Route } from "react-router";
import { Layout } from "../components/Layout";
import { Main } from "../components/Main";
import { Login } from "../pages/Login";
import { Registration } from "../pages/Registration";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="registration" element={<Registration />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};
