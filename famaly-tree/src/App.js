import React, { useContext, useEffect, useState } from "react";
import "./css/main.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./moduls/AppRouter";
import NavBar from "./moduls/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      check()
        .then((data) => {
          user.setUser(data);
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false));
    } catch {
      user.setUser(undefined);
      user.setIsAuth(false);
    }
  }, []);

  if (loading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
