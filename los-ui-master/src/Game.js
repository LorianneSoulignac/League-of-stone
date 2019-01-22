import React, { Component } from "react";
import Modal from './Modal';

import logo from "./logo.svg";
import "./App.css";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>League of Stones</h2>
          <p>Bienvenue</p>
        
          <button onClick={this.toggleModal}>
            Open the modal
          </button>
        </header>

        <Modal show={this.state.isOpen}
          onClose={this.toggleModal}>
          <h1>Selection de joueur</h1>
        </Modal>
      </div>
    );
  }
}

export default Game;
