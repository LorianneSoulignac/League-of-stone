import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { SERVER_URL } from './consts';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token : this.props.location.state.token,
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      joueurs: [],
      match: ""
    };
    this.handleChangeMatchmakingId= this.handleChangeMatchmakingId.bind(this);
  }
  

  makingMatch(){
    axios
      .get(
        SERVER_URL +
          "/matchmaking/participate?userId="+this.state.id+"&name="+this.state.name+"&token="+this.state.token
      ).then(res => {
        if (res.data.status === "ok") { 
        
        }
        
      });
      
      
  }
  getAll(){
    axios
      .get(
        SERVER_URL +
          "/matchmaking/getAll?token="+this.state.token
      ).then(res => {
        if (res.data.status === "ok") { 
              this.setState({joueurs: res.data.data.slice()})
              console.log(this.state.joueurs)
            }
        }
      );
  }

  handleChangeMatchmakingId(e){
      this.setState({match : e.target.value})
     

  }
  request(){
    axios
    .get(
      SERVER_URL +
        "/matchmaking/request?matchmakingId="+this.state.match+"&token="+this.state.token
    ).then(res => {
      if (res.data.status === "ok") {
        console.log('sned request');
          }
      }
    );
  }

  accepteRequest(){
    axios
      .get(
        SERVER_URL +
        "/matchmaking/acceptRequest?matchmakingId="+this.state.matchmakingId+"&token="+this.state.token
      ).then(res => {
        if(res.data.status === "ok"){
          
        }
      })
  }
  // refresh request Matchmaking and getALl
  componentDidMount(){
    this.intervalMatchmaking = setInterval(() => this.makingMatch(), 5000);
    this.intervalGetAll = setInterval(() => this.getAll(), 5000);
  }
  componentWillMount(){
    clearInterval(this.interval);
  }
  render() {
    console.log(this.state.match)
    return(
      
      <div>

        <button onClick={this.onOpenModal}>JOUER</button>
        <ul>
          {this.state.joueurs.map((recipe)=>{
           return <li key={recipe.name}>{recipe.name} | <button value={recipe.matchmakingId} onClick={this.handleChangeMatchmakingId}>Jouer</button></li>
          })}
        </ul>
        {this.request()}
      </div>
    );
  }
}

export default Game;
