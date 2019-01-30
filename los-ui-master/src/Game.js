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
      token : this.props.location.state.token,
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      joueurs: [],
      match: "",
      isOpen: false,
      players: [],
      MematchmakingId: "",
      Youmatch: ""
    };
    this.handleChangeMatchmakingId= this.handleChangeMatchmakingId.bind(this);
    this.handleChangeYourMatchmakingId= this.handleChangeYourMatchmakingId.bind(this);
    this.acceptRequest= this.acceptRequest.bind(this);
    this.unparticipate= this.unparticipate.bind(this);

   
  }

  
  onOpenModal = () => {
    this.setState({open : true})
  }
  onCloseModal = () => {
    this.setState({open : false})

  }
  getAll(){
    axios
      .get(
        SERVER_URL +
          "/matchmaking/getAll?token="+this.state.token
      ).then(res => {
        if (res.data.status === "ok") { 
              this.setState({joueurs: res.data.data.slice()})
            }
        }
      );
  }

  handleChangeMatchmakingId(e){
      console.log(e.target.value)
      this.setState({match : e.target.value})
      this.request()
  }

  handleChangeYourMatchmakingId(e){
    console.log(e.target.value)
    this.setState({Youmatch : e.target.value})
    this.acceptRequest()
}

  // refresh request Matchmaking and getALl
  componentDidMount(){
    this.intervalMatchmaking = setInterval(() => this.participate(), 2000);
    this.intervalGetAll = setInterval(() => this.getAll(), 2000);
  }
  componentWillMount(){
    clearInterval(this.interval);
  }

  participate(){
    // let part = []
      axios.get(
      SERVER_URL + "/matchmaking/participate?token="+this.state.token
    ).then(res =>{
      if(res.data.status === "ok"){
        console.log(res)
        console.log(res.data.data.matchmakingId)
        this.setState({MematchmakingId: res.data.data.matchmakingId})
        if(res.data.data.request !== 0){
          // part.push(res.data.data.request)
          this.setState({players: res.data.data.request.slice()})
        }
        if(res.data.data.match){

        }
    }
    // this.setState({players: part})
    })    
  }

  request(){
      axios
      .get(
        SERVER_URL +
          "/matchmaking/request?matchmakingId="+this.state.match+"&token="+this.state.token
      ).then(res => {
        if (res.data.status === "ok") {
          console.log("request envoyé")
          }
        });
    }
  
  acceptRequest(){
    axios
    .get(
      SERVER_URL + "/matchmaking/acceptRequest?matchmakingId="+this.state.Youmatch+"&token="+this.state.token
    ).then(res => {
      if (res.data.status === "ok") { 
        this.props.history.push({pathname : process.env.PUBLIC_URL + "/Jeu",
        state : {token : res.data.data.token}});
          }
      }
    );
  }

  unparticipate(){
    axios
    .get(
      SERVER_URL + "/matchmaking/unparticipate?token="+this.state.token
    ).then(res => {
      if(res.data.status === "ok"){
        console.log("refuser")
      }
    })
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
              {this.state.players.map((item)=>(
               <li className="list-group-item" key={item.userId}>{item.name} <button type="button" className="btn btn-danger" onClick={()=> {this.unparticipate()}}>Refuser</button>
                <button type="button" className="btn btn-success" value= {item.matchmakingId} onClick={this.handleChangeYourMatchmakingId}>Accepter</button></li>
              ))}
              </ul>
            </div>
          <div className="modal-child-style">
              <div className="modal-header div-players">
                <h2 className="modal-title">Joueurs connectés</h2>
              </div>
          <ul className="list-group">
          {this.state.joueurs.map((item)=>(
            <li className="list-group-item" key={item.name}>{item.name} <button type="button" className="btn btn-success" value={item.matchmakingId} onClick={this.handleChangeMatchmakingId}>Inviter </button></li>
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
