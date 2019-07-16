import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import Snake from "./snake";
import Food from "./food";
import DisplayBar from "./displaybar";

const snakeSteps = 2;
let gameOver = false;

const respawnFood = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return x;
};

let intervalRef = null;

class Game extends Component {
  state = {
    direction: "UP",
    foodPosition: {
      left: respawnFood(),
      top: respawnFood()
    },
    snakeBody: [
      {
        left: 50,
        top: 50
      }
    ],
    score: 0
  };

  constructor(props) {
    super(props);
    gameOver = false;
    this.updateScore = this.updateScore.bind(this);
  }

  updateScore() {
    this.props.updateScore(this.state.score, "Your Snake Died in Last Game");
  }

  render() {
    let redirect = null;
    if (gameOver) {
      redirect = <Redirect to="/" />;
    } else {
      redirect = <div />;
    }
    return (
      <div>
        <div className="game-area">
          <DisplayBar name={this.props.playerName} score={this.state.score} />
          <Snake className="game-area" position={this.state.snakeBody} />
          <Food position={this.state.foodPosition} />
        </div>

        {redirect}
      </div>
    );
  }

  componentDidMount() {
    this.intervalRef = setInterval(
      this.moveSnake,
      10 * this.props.getdifficulty
    );
    document.onkeydown = this.onkeyDown;
  }

  componentWillUnmount() {
    clearInterval(this.intervalRef);
    document.onkeydown = null;
  }

  componentDidUpdate() {
    this.checkSnakeAlive();
    this.didSnakeGotFood();
  }

  onkeyDown = e => {
    e = e || window.event;

    const lastDirection = this.state.direction;

    if (e.key === "ArrowUp" && lastDirection !== "DOWN") {
      this.setState({ direction: "UP" });
    }
    if (e.key === "ArrowDown" && lastDirection !== "UP") {
      this.setState({ direction: "DOWN" });
    }
    if (e.key === "ArrowLeft" && lastDirection !== "RIGHT") {
      this.setState({ direction: "LEFT" });
    }
    if (e.key === "ArrowRight" && lastDirection !== "LEFT") {
      this.setState({ direction: "RIGHT" });
    }
  };

  moveSnake = () => {
    const newsnakeBody = this.state.snakeBody;
    const bodyLength = newsnakeBody.length;
    //    console.log(bodyLength);
    if (this.state.direction === "UP") {
      for (let index = bodyLength - 1; index > 0; index--) {
        //to move rest of its body
        newsnakeBody[index].top = newsnakeBody[index - 1].top;
        newsnakeBody[index].left = newsnakeBody[index - 1].left;
      }
      newsnakeBody[0].top = newsnakeBody[0].top - snakeSteps; //to move snake head

      this.setState({
        snakeBody: newsnakeBody
      });
    }
    if (this.state.direction === "DOWN") {
      for (let index = bodyLength - 1; index > 0; index--) {
        //to move rest of its body
        newsnakeBody[index].top = newsnakeBody[index - 1].top;
        newsnakeBody[index].left = newsnakeBody[index - 1].left;
      }
      newsnakeBody[0].top = newsnakeBody[0].top + snakeSteps; //to move snake head

      this.setState({
        snakeBody: newsnakeBody
      });
    }
    if (this.state.direction === "LEFT") {
      for (let index = bodyLength - 1; index > 0; index--) {
        //to move rest of its body
        newsnakeBody[index].top = newsnakeBody[index - 1].top;
        newsnakeBody[index].left = newsnakeBody[index - 1].left;
      }
      newsnakeBody[0].left = newsnakeBody[0].left - snakeSteps; //to move snake head

      this.setState({
        snakeBody: newsnakeBody
      });
    }
    if (this.state.direction === "RIGHT") {
      for (let index = bodyLength - 1; index > 0; index--) {
        //to move rest of its body
        newsnakeBody[index].top = newsnakeBody[index - 1].top;
        newsnakeBody[index].left = newsnakeBody[index - 1].left;
      }
      newsnakeBody[0].left = newsnakeBody[0].left + snakeSteps; //to move snake head

      this.setState({
        snakeBody: newsnakeBody
      });
    }
  };

  didSnakeGotFood() {
    const newScore = this.state.score;
    if (
      this.state.snakeBody[0].left === this.state.foodPosition.left &&
      this.state.snakeBody[0].top === this.state.foodPosition.top
    ) {
      const newfood = {
        left: respawnFood(),
        top: respawnFood()
      };
      this.setState({ foodPosition: newfood, score: newScore + 10 });
      this.growSnake();
    }
  }

  growSnake() {
    const newSnakeBody = this.state.snakeBody;
    const len = this.state.snakeBody.length;

    const node = {
      left: newSnakeBody[len - 1].left,
      top: newSnakeBody[len - 1].top
    };
    newSnakeBody.push(node);
  }

  checkSnakeAlive() {
    const snakeHead = this.state.snakeBody[0];

    if (
      snakeHead.left < 0 ||
      snakeHead.left >= 100 ||
      snakeHead.top < 0 ||
      snakeHead.top >= 100
    ) {
      this.gameOver();
    } else {
      this.checkSnakeBitItself();
    }
  }

  checkSnakeBitItself() {
    const snakeBody = this.state.snakeBody;
    const snakeHead = snakeBody[0];

    for (let index = 1; index < snakeBody.length; index++) {
      if (
        snakeBody.length > 4 &&
        snakeHead.top === snakeBody[index].top &&
        snakeHead.left === snakeBody[index].left
      ) {
        this.gameOver();
      }
    }
  }

  gameOver() {
    gameOver = true;
    this.updateScore();
    this.setState({
      direction: "UP",
      foodPosition: {
        left: respawnFood(),
        top: respawnFood()
      },
      snakeBody: [
        {
          left: 50,
          top: 50
        }
      ],
      score: 0
    });
  }

  //===========class ends here======================================================
}

export default Game;
