import React, { Component } from "react";
import { Link } from "react-router-dom";

class WelcomeMenu extends Component {
  constructor(props) {
    super(props);
    this.setDifficulty = this.setDifficulty.bind(this);
  }

  setDifficulty(event) {
    event.preventDefault();
    //  console.log(event.target.value);
    this.props.setDifficulty(event.target.value);
  }

  render() {
    let score;
    if (this.props.getMsg.score > 0) {
      score = <p>Your Last Score: {this.props.getMsg.score}</p>;
    } else {
      score = "";
    }
    return (
      <div className="custom-padding text-center">
        <h1>{this.props.getMsg.msg} </h1>
        {score}
        <select
          className="form-control custom-margin"
          onChange={this.setDifficulty}
        >
          <option defaultValue>Select Difficulty</option>
          <option value="30">EASY</option>
          <option value="10">MEDIUM</option>
          <option value="5">HARD</option>
        </select>
        <Link className="btn btn-outline-primary custom-margin" to="/start">
          Play
        </Link>
      </div>
    );
  }
}

export default WelcomeMenu;
