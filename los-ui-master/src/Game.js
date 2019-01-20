import React, { Component } from "react";
import "./App.css";
import axios from "axios";

// import { Link } from 'react-router-dom';

import Modal from 'react-responsive-modal';
import { SERVER_URL } from './consts';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      token : this.props.location.state.token,
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      joueurs: []
    };
    console.log ("token :" + this.state.token);
    console.log ("id :" + this.state.id);
    console.log("name : " + this.state.name)
  }
 
  onOpenModal = () => {
    this.setState({ open: true });
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
  
  makingMatch(){
    let tab = []
    axios
      .get(
        SERVER_URL +
          "/matchmaking/participate?userid="+this.state.id+"&name="+this.state.name+"&token="+this.state.token
      ).then(res => {
        if (res.data.status === "ok") { 
          tab.push({name : this.state.name, userid: this.state.id})
          
        }
        this.setState({joueurs: tab})
        
        
      });
      
      
  }

  render() {
    // const { open } = this.state;
    
    return(
      <div>
        <button onClick={()=>{this.makingMatch()}}>JOUER</button>
        <ul>
          <div>
            {this.state.joueurs.map((recipe)=>{
              return <li key={recipe.userid}>{recipe.name}</li>
            })}
          </div>
        {/* <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Match-making</h2>
          <div className="requete">
            <ul>
              {this.renderTools()}
            </ul>
          </div>
          <div className="searchChampion"></div>
          <button onClick={this.onCloseModal}>Open modal</button>
        </Modal> */}
        </ul>
      </div>
    );
  }
}

export default Game;
