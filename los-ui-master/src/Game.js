import React, { Component } from "react";
import "./App.css";
// import { Link } from 'react-router-dom';

import Modal from 'react-responsive-modal';

class Game extends Component {
  state = {
    open: false,
  };
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
 
  render() {
    const { open } = this.state;
    return (
      <div>
        <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Match-making</h2>
          <div className="requete"></div>
          <div classeName="searchChampion"></div>
          <button onClick={this.onCloseModal}>Open modal</button>
        </Modal>
      </div>
    );
  }
}

export default Game;
