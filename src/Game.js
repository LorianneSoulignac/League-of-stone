import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-responsive-modal'
import { SERVER_URL } from './consts';
import './Game.css';
import Rules from './Rules';




class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfRequest: [],
      listOfPlayers: [],
      open: false,
      openP: false,
      openR: false,
      pseudo: this.props.location.state.pseudo,
      email: this.props.location.state.email
    };
  }
  // modal
  onOpenModal = () => {
    this.setState({open : true})
  }
  onCloseModal = () => {
    this.setState({open : false})
  }
  // modal
  onOpenModalProfils = () => {
    this.setState({openP : true})
  }
  onCloseModalProfils = () => {
    this.setState({openP : false})
  }
   // modal
   onOpenModalRules = () => {
    this.setState({openR : true})
  }
  onCloseModalRules = () => {
    this.setState({openR : false})
  }
  // request deconnexion and delet
  disconnection() {
    axios
      .get(
        SERVER_URL +
        "/users/disconnect")
      .then(res => {
          if (res.data.status === "ok") {
              this.props.history.push(process.env.PUBLIC_URL + "/signin");
              this.setState({
              })
          }
      });
  }
  
  deleted(){
    this.props.history.push({pathname : process.env.PUBLIC_URL + "/delet", state: { pseudo : this.state.pseudo, email :this.state.email, token:this.props.location.state.token}});
  }

   // refresh request Matchmaking and getALl
  componentDidMount(){
    this.intervalMatchmaking = setInterval(() => this.participate(),2000);
    this.intervalGetAll = setInterval(() => this.getAll(), 2000);
    this.intervalGetMatch = setInterval(() => this.getMatch(), 2000)
  }
  componentWillmount(){
    clearInterval(this.interval);
    clearInterval(this.intervalGetAll);
    clearImmediate(this.intervalGetMatch);
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


                // this.props.history.push({pathname : process.env.PUBLIC_URL + "/Jeu",
                // state: { player1 : res.data.player1, player2: res.data.player2, token: this.props.location.state.token}});
                this.props.history.push({pathname : process.env.PUBLIC_URL + "/jeu",
                state: { pseudo: this.state.pseudo ,player1 : res.data.player1, player2: res.data.player2, token: this.props.location.state.token}});
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
            this.props.history.push({pathname : process.env.PUBLIC_URL + "/jeu",
            state: { pseudo: this.state.pseudo ,player1 : res.data.player1, player2: res.data.player2, token: this.props.location.state.token}});
                 }
      });
  }

  render() {
    const {open} = this.state;
    const {openP} = this.state;
    const {openR} = this.state;
    return(
      <div>
        <div className='div-img'><img alt="league of stone" src="backgroung1.png" className="back-img"/></div>
        <div className="button-modal" onClick={this.onOpenModalProfils}>
            <span className="title-jouer">PROFIL&nbsp;&nbsp;</span>
            <span className="title-jouer shift">›</span>
            <div className="mask"></div>
        </div>
        <Modal open={openP} onClose={this.onCloseModalProfils}>
          <div className="profil">
            <h1>Profil</h1>
            Pseudo : {this.state.pseudo}<br/>
            Email : {this.state.email}
          </div>
          <div>
            <button type="button" className="btn btn-danger" onClick={() => this.disconnection()}>
              Deconnexion
            </button>
            <button type="button" className="btn btn-danger" onClick={() => this.deleted()}>
              Supprimer compte
            </button>
          </div>
        </Modal>
       
        <div className="button-modal" onClick={this.onOpenModalRules}>
          <span className="title-jouer">Régles de jeux&nbsp;&nbsp;</span>
          <span className="title-jouer shift">›</span>
          <div className="mask"></div>
        </div>
        <Modal open={openR} onClose={this.onCloseModalRules}>
          <Rules/>
        </Modal>

        <div className="button-modal" onClick={this.onOpenModal}>
            <span className="title-jouer">JOUER&nbsp;&nbsp;</span>
            <span className="title-jouer shift">›</span>
            <div className="mask"></div>
        </div>
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
