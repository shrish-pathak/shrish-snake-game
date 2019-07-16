import React, { Component } from "react";
import Axios from "axios";
class LeaderBoard extends Component {
  state = {
    playerlist: []
  };
  constructor() {
    super();

    this.leaderBoard();
  }

  leaderBoard() {
    Axios.get("/api/score")
      .then(res => {
        // console.log(res.data);
        const list = [];
        res.data.map(player => {
          list.push(player);
        });
        list.sort((x, y) => {
          return y.score - x.score;
        });

        this.setState({ playerlist: list });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Player Name</th>
              <th scope="col">SCORE</th>
            </tr>
          </thead>
          <tbody>
            {this.state.playerlist.map((player, key) => {
              return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{player.username}</td>
                  <td>{player.score}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default LeaderBoard;
