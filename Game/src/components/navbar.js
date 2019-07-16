import React, { Component } from "react";
import { Link } from "react-router-dom";

let signInOrOut = null;
class Navbar extends Component {
  render() {
    if (this.props.loginInfo === null) {
      signInOrOut = (
        <a
          className="nav-link"
          href="https://shrish-snake-game.herokuapp.com/api/user/google"
        >
          Sign In
        </a>
      );
    } else {
      signInOrOut = (
        <a
          className="nav-link"
          href="https://shrish-snake-game.herokuapp.com/api/user/logout"
        >
          Sign Out
        </a>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">
            Snake Game
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">{signInOrOut}</li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  Leader Board
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
