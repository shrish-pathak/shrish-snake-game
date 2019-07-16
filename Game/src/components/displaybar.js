import React, { Component } from "react";

class displayBar extends Component {
  render() {
    let txt = "";
    if (this.props.name === null) {
      txt = "Sign In to Save Your Score";
    } else {
      txt = this.props.name;
    }
    return (
      <div className="display-bar">
        <h6 className="display-bar-name">PLAYER: {txt} </h6>
        <h6 className="display-bar-score">SCORE: {this.props.score}</h6>
      </div>
    );
  }
}

export default displayBar;
