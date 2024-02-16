import React from "react";
import TextButton from "./TextButton";

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <TextButton link="/" title="Главная" />
        <TextButton link="/mytree" title="Моё дерево" />
        <TextButton link="/about" title="О нас" />
        <div className="login">
          <TextButton link="/login" title="Вход/Ргистрация" />
        </div>
      </header>
    );
  }
}

export default Header;
