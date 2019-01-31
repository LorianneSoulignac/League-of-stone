import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-responsive-modal'
import { SERVER_URL } from './consts';
import "./App.css";
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfRequest: [],
      listOfPlayers: [],
    };
   // this.handleChangeRequestMatchmakingId = this.handleChangeRequestMatchmakingId.bind(this);
  }
  // modal
  onOpenModal = () => {
    this.setState({open : true})
  }
  onCloseModal = () => {
    this.setState({open : false})
  }
   // refresh request Matchmaking and getALl
   componentDidMount(){
    this.intervalMatchmaking = setInterval(() => this.participate(),2000);
    this.intervalGetAll = setInterval(() => this.getAll(), 2000);
    this.intervalGetMatch = setInterval(() => this.getMatch(), 2000)
  }
  componentWillMount(){
    clearInterval(this.interval);
  }
  //  All request
  participate(){
    axios
      .get(
      SERVER_URL +
        "/matchmaking/participate?token="+this.props.location.state.token)
        .then(res => {
          if(res.data.status === "ok" && res.data.data.request !== 0){
            this.setState({listOfRequest : res.data.data.request})
          }
        });
  }
  getAll(){
    axios
    .get(
      SERVER_URL +
      "/matchmaking/getAll?token="+this.props.location.state.token)
      .then(res => {
          this.setState({listOfPlayers: res.data.data})
      });
  }
  request(userMid){
    axios
    .get(
      SERVER_URL +
      "/matchmaking/request?matchmakingId=" + userMid + "&token="+this.props.location.state.token
      ).then(res =>{
        if(res.data.status === "ok"){
          console.log("request send")
        } 
      })
  }
  acceptRequest(userMid){
    axios
      .get(
        SERVER_URL +
          "/matchmaking/acceptRequest?matchmakingId=" + userMid + "&token="+this.props.location.state.token)
          .then(res => {
            if (res.data.status === "ok") {
                console.log("accpet")
                this.props.history.push({pathname : process.env.PUBLIC_URL + "/Jeu",
                state: { player1 : res.data.player1, player2: res.data.player2, token: this.props.location.state.token}});
            }
        });
  }

  getMatch(){
    axios
    .get(
      SERVER_URL +
        "/match/getMatch?token="+this.props.location.state.token
    ).then(res => {
        if (res.data.status === "ok") {
            this.props.history.push({pathname : process.env.PUBLIC_URL + "/Jeu",
            state: { token: this.props.location.state.token}});
        }
      });
  }
  
  render() {
    const {open} = this.state;
    return(
      <div>
      <button onClick={this.onOpenModal}>JOUER</button>
      <Modal open={open} onClose={this.onCloseModal} className="modal" >
      <div className="backdropStyle">
      <div className="modalStyle">
        <div className="modal-child">
          <div className="modal-child-style">
            <div className="modal-header div-receive">
            <h2 className="modal-title">Demandes reçues</h2>
            </div>
            
            <ul className="list-group">
            {this.state.listOfRequest.map((item,index)=>(
              <li className="list-group-item" key={index}>{item.name}
                <button type="button" className="btn btn-success" onClick={() => this.acceptRequest(item.matchmakingId)}>
                  Accepter
                </button>
              </li>
            ))}
            </ul>
          </div>
        <div className="modal-child-style">
            <div className="modal-header div-players">
              <h2 className="modal-title">Joueurs connectés</h2>
            </div>
            <ul className="list-group">
              {this.state.listOfPlayers.map((item, index)=>(
                <li className="list-group-item" key={index}>{item.name}
                  <button type="button" className="btn btn-success"  onClick={() => this.request(item.matchmakingId)}>
                  Inviter
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="button">
          <button className="btn btn-dark" onClick={this.onCloseModal}>
            Quitter
          </button>
        </div>
      </div>
    </div>
      </Modal>
      
    </div>
    );
  }
}

export default Game;
