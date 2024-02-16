import React, { useContext } from "react";
import { Context } from "..";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE, MAIN_ROUTE, TREE_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";

const NavBar = observer(() => {
  const { user, link } = useContext(Context);
  const history = useNavigate();

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavLink
          style={{ color: "white", textDecoration: "none", fontWeight: "600" }}
          to={MAIN_ROUTE}
        >
          FamilyTree
        </NavLink>
        {user.isAuth && user.user.id ? (
          <Nav className="ms-auto">
            <Button
              variant={"outline-light"}
              onClick={() => {
                if (user.user.id) {
                  history(TREE_ROUTE + "/" + user.user.id);
                } else {
                  link.setLink(window.location.pathname);
                  history(LOGIN_ROUTE);
                }
              }}
            >
              Моё Дерево
            </Button>
            <Button
              variant={"outline-light"}
              onClick={() => logOut()}
              className="ms-2"
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ms-auto">
            <Button
              variant={"outline-light"}
              onClick={() => {
                link.setLink(window.location.pathname);
                history(LOGIN_ROUTE);
              }}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
