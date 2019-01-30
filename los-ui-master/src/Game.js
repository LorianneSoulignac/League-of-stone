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
              // console.log(this.state.joueurs)
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
    this.accepteRequest()
}

  // refresh request Matchmaking and getALl
  componentDidMount(){
    this.intervalMatchmaking = setInterval(() => this.participate(), 5000);
    this.intervalGetAll = setInterval(() => this.getAll(), 5000);
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
  // reloadParticipate(){
  //   let part = []
  //   if(this.state.match !== ""){
  //     axios.get(
  //       SERVER_URL + "/matchmaking/participate?token="+this.state.token
  //     ).then(res =>{
  //       if(res.data.status === "ok"){
  //         console.log(res.data.data)
  //         part.push(res.data.data.request)
  //         if(res.data.data.request !== 0){
  //           console.log(res.data.data.request);
  //         }
  //         if(res.data.data.match){
  //           console.log(res.data.data.match)
             

  //         }
  //       }else{
  //         console.log(res.data.message)
  //       }
  //     })
  //   }
  //   this.setState({players : part})
  // }

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
      SERVER_URL + "'/matchmaking/unparticipate?token="+this.state.token
    ).then(res => {
      if(res.data.status == "ok"){
        console.log("refuser")
      }
    })
  }

  
  render() {
    const {open} = this.state;
    console.log(this.state.players)
    console.log(this.state.joueurs)
    console.log(this.state.MematchmakingId)
    
    return(
      <div>
        <button onClick={this.onOpenModal}>JOUER</button>
        <Modal open={open} onClose={this.onCloseModal} className="modal" >
        <div className="backdropStyle">
        <div className="modalStyle">
          <div className="modal-child">
            <div className="modal-child-style">
              <div classeName="modal-header div-receive">
              <h2 classeName="modal-title">Demandes reçues</h2>
              </div>
              
              <ul className="list-group">
              {this.state.players.map((item)=>{
                return <li className="list-group-item" key={item.userId}>{item.name} <button type="button" className="btn btn-danger" onClick={this.acceptRequest}>Refuser</button>
                <button type="button" className="btn btn-success" value= {item.matchmakingId} onClick={this.handleChangeYourMatchmakingId}>Accepter</button></li>
              })}
              </ul>
            </div>
          <div className="modal-child-style">
              <div classeName="modal-header div-players">
                <h2 classeName="modal-title">Joueurs connectés</h2>
              </div>
          <ul className="list-group">
          {this.state.joueurs.map((item)=>{
            return <li className="list-group-item" key={item.name}>{item.name} <button type="button" className="btn btn-success" value={item.matchmakingId} onClick={this.handleChangeMatchmakingId}>Inviter </button></li>
          })}
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
