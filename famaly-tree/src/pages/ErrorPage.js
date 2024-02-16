import React from "react";
import TextButton from "../moduls/TextButton";

class ErrorPage extends React.Component {
  render() {
    return (
      <main className="error">
        <p>Такой страницы не существует :(</p>
        <TextButton link="/" title="Вернуться на главную" />
      </main>
    );
  }
}

export default ErrorPage;
