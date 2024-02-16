import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRouties } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
import { Context } from "..";

const AppRouter = () => {
  const { user } = useContext(Context);

  return (
    <Routes>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => {
          return <Route key={path} path={path} Component={Component} exact />;
        })}
      {publicRouties.map(({ path, Component }) => {
        //console.log(path);
        //console.log(Component);
        return <Route key={path} path={path} Component={Component} exact />;
      })}
      <Route
        path={window.location.pathname}
        element={<Navigate to={MAIN_ROUTE} />}
      />
    </Routes>
  );
};

export default AppRouter;
