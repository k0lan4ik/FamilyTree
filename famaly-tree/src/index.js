import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import UserStore from "./store/UserStore";
import PersoneStore from "./store/PersoneStore";
import { MAIN_ROUTE } from "./utils/consts";
import LinkStore from "./store/LinkStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Context.Provider
    value={{
      link: new LinkStore(),
      user: new UserStore(),
      persone: new PersoneStore(),
    }}
  >
    <App />
  </Context.Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
