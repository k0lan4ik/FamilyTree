import React from "react";

class TextButton extends React.Component {
  render() {
    return (
      <a className="textbutton" href={this.props.link}>
        {this.props.title}
      </a>
    );
  }
}

export default TextButton;
