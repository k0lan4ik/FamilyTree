import React from "react";
import {  Container, Image, NavLink } from "react-bootstrap";
import { REACT_APP_API_URL } from "../utils/consts";

class MainPage extends React.Component {
  render() {
    return (
      <div>
        <Container className="d-flex flex-column">
          <div className="m-4">
            <h2 className="fw-bold">Что такое FamilyTree?</h2>
            <p className="fs-5">
              Это сайт для создания своего генеологического дерева с удобным
              интрерфейсом
            </p>
            <Image fluid src={REACT_APP_API_URL + "tree.png"}></Image>
            <p className="fs-5">
              Здесь вы можете персонально настроить анкету каждого члена вашей
              семьи
            </p>
            <Image fluid src={REACT_APP_API_URL + "persone.png"}></Image>
            <p className="fs-5">
              И это только начало, много ещё впереди, так как сайт всё ещё в
              разработке, и если хотите следить за нашими успехами, то
              подписывайтесь на наш телеграм канал
            </p>
            <NavLink
              className="text-primary"
              onClick={() => {
                window.open("https://t.me/FamilyTreeInside");
              }}
            >
              Ссылка на телеграм канал
            </NavLink>
          </div>
        </Container>
      </div>
    );
  }
}

export default MainPage;
