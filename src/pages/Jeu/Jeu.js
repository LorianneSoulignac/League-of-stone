import React, { Component } from 'react';
import axios from "axios";
import { SERVER_URL } from "../../consts";
import Modal from 'react-modal';
import "./Jeu.css";
import img from "../../plateau_v1.png";
import Card from "../Cards/Cards"
import champs from "../../champions-all-sort.json"



class Jeu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adverseHp: 35,
      yourHp: 35,
      card_j1_played: [],
      nbCardj2: 3,
      cards: [],
      nbCardHand:1,
    };
  }

pickCard = () => {
  if(this.state.nbCardHand <=5){
  let toto = this.state.cards;
  toto.push(
    <Card lvl={this.state.nbCardHand}
    onClick={this.temp.bind(this, this.state.nbCardHand)}
/>);
  this.setState({cards: toto, nbCardHand: this.state.nbCardHand+1})
  }
  }

temp = (id,event) =>{
  alert("la carte cliqué est"+id)
}

test = () =>{
  alert("btn test")
}

  endTurn = () => {
    alert("Fin du tour")
  }

  hpa = () => {
    this.setState({ adverseHp: this.state.adverseHp - 1 });
  }
    
      render() {
        function clicDeck (){
          alert("Clique sur le deck pour tirer une carte");
        }
        function endTurn (){
          alert("Clique sur fin du tour");
        }
      
        return (
          
          
          <div id="test">
          {/* bouton de test au cas ou  */}
          <div class="init_test">
          <button type="button" class="btn_hidden" onClick={this.test}></button>
          </div>

          {/* div contenant le plateau centrale */}
          <div class="center_board">
          <div class="endTurn">
          </div>
          <div class="plateauJ1">



          <div class="card1">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card2">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card3">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card4">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card5">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>

          </div>
          <div class="plateauJ2">

         <div class="card1">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card2">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card3">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card4">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          <div class="card5">

          <div class="card_joueev2">
          <button type="button" class="btn_hidden" onClick={clicDeck}></button>
          </div>

          </div>
          
          </div>
          <div class="endTurn">
          <button type="button" class="btn_hidden" onClick={this.endTurn}></button>
          </div>
          </div>

          <div class="player2">
          <div class="life">{this.state.adverseHp}</div>
          </div>
          <div class="player1">
          <div class="life">{this.state.yourHp}</div>
          </div>



          {/* div contenant une carte avec le nombre de cartes dans la main adverse */}
          <div class="pioche_j2">
          <div class="nbCardJ2">{this.state.nbCardj2}</div>
          </div>
          {/* representation du deck avec bouton pour piocher */}
          <div class="deck">
          <button type="button" class="btn_hidden" onClick={this.pickCard}></button>
          </div>

          <div class="hand">
          
          {this.state.cards}

          </div>

        </div>
        
        
);
        }
      }
export default Jeu;