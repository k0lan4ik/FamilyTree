import { Component } from "react";
import {
  ABOUT_ROUTE,
  ADD_ROUNTE,
  LOGIN_ROUTE,
  MAIN_ROUTE,
  PERSONE_ROUTE,
  REGISTRATION_ROUTE,
  TREE_ROUTE,
} from "./utils/consts";
import MainPage from "./pages/MainPage";
import Add from "./pages/Add";
import Tree from "./pages/Tree";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Persone from "./pages/Persone";

export const checkId = (url = window.location.pathname) => {
  const slice = url.split("/");
  const id = slice[slice.length - 1];
  return id;
};

export const authRoutes = [
  {
    path: ADD_ROUNTE,
    Component: Add,
  },
];
export const publicRouties = [
  {
    path: TREE_ROUTE + "/" + checkId(),
    Component: Tree,
  },

  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: ABOUT_ROUTE,
    Component: About,
  },
  {
    path: PERSONE_ROUTE + "/" + checkId(),
    Component: Persone,
  },
];
