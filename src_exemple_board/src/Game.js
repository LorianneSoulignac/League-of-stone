import React, { Component } from "react";
import { Link } from "react-router-dom";

import logo from "./logo.svg";
import "./App.css";

class Game extends Component {
  render() {
    return (
      <div className="App">
        Coucou
        <Link to="/jeu"><button >Jouer !</button></Link>
      </div>
    );
  }
}

export default Game;
