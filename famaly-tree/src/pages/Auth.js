import React, { useContext, useState } from "react";
import { Form, Container } from "react-bootstrap/";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user, link } = useContext(Context);
  const location = useLocation();
  const history = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password);
      }
      user.setUser(data);
      user.setIsAuth(true);
      history(link.link);
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600, backgroundColor: "#e3e3e3" }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column">
          <Form.Control
            className="mt-3"
            style={{ backgroundColor: "#f0f0f0" }}
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            style={{ backgroundColor: "#f0f0f0" }}
            placeholder="Введите ваш password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 ps-3 pe-3">
            {isLogin ? (
              <div>
                Нет аккаунта?{" "}
                <NavLink
                  to={REGISTRATION_ROUTE}
                  style={{ textDecoration: "none", fontWeight: 600 }}
                >
                  Зарегистрируйся!
                </NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт?{" "}
                <NavLink
                  to={LOGIN_ROUTE}
                  style={{ textDecoration: "none", fontWeight: 600 }}
                >
                  Войдите!
                </NavLink>
              </div>
            )}
            <Button
              variant={"outline-success"}
              onClick={click}
              className="w-auto ms-auto"
            >
              {isLogin ? "Войти" : "Регистрация"}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
