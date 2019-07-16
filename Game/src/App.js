import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar";

import Leaderboard from "./components/leaderboard";
import Game from "./components/game";
import Menu from "./components/menu";

import Axios from "axios";

class App extends Component {
  state = {
    username: null,
    score: 0,
    difficulty: 30,
    msg: "Welcome to Snake Game"
  };

  constructor() {
    super();
    this.getusername = this.getusername.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
  }

  getusername() {
    let name = "";
    Axios.get("/api/user/logindetail")
      .then(res => {
        if (res.data.name) {
          //console.log(res.data.name);
          name = res.data.name;
          this.setState({ username: name });
        } else {
          console.log(res.data.msg);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateScore(score, txt) {
    //console.log(score, txt);
    this.setState({
      score: score,
      msg: txt
    });

    Axios.post("/api/score/update", { score: score })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  setDifficulty(level) {
    this.setState({ difficulty: parseInt(level) });
  }

  componentDidMount() {
    this.getusername();
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar loginInfo={this.state.username} />
          <Route exact path="/leaderboard" component={Leaderboard} />
          <Route
            exact
            path="/"
            render={routeProps => (
              <Menu
                {...routeProps}
                setDifficulty={this.setDifficulty}
                getMsg={this.state}
              />
            )}
          />
          <Route
            exact
            path="/start"
            render={routeProps => (
              <Game
                {...routeProps}
                updateScore={this.updateScore}
                getdifficulty={this.state.difficulty}
                playerName={this.state.username}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
