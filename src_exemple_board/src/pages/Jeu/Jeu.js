import React, { Component } from 'react';
import axios from "axios";
import { SERVER_URL } from "../../consts";
import Modal from 'react-modal';
import "./Jeu.css";
import img from "../../plateau_v1.png";



class Jeu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adverseHp: 35,
      yourHp: 35
    };
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
          <div>
          <div id="test">
            <img id="img"src="https://static.wixstatic.com/media/db8260_f9114645cd75404a9b86e268dd3495de~mv2_d_2560_1440_s_2.png/v1/fill/w_950,h_538,al_c,usm_0.66_1.00_0.01/plateau_v1.png" alt="" useMap="#m1"/>
            <map id="m1" name="m1">
              <button onClick={endTurn} id="a2" shape="rect" coords="762.9999616777344,222.00000745410154,856.9332956777343,261.93334145410154" title="endTurn"/>
              <button onClick={clicDeck} id="a3" shape="rect" coords="836.9999616777344,292.00000745410154,934.9332956777343,428.93334145410154" title="deck"/>
              <text id="a4" shape="rect" coords="457.99997693652347,467.0000227128906,489.93331093652347,479.9333567128906" title="Ta vie">{this.state.adverseHp}</text>
              <text id="a1"shape="rect" coords="458.99997693652347,161.99999219531247,493.93331093652347,180.93332619531247" title="Vie adverse">{this.state.yourHp}</text>
            </map>
        </div>
        <button onClick={this.hpa}>Baisser les pv adverse</button>
        </div>
);
      }
    }

export default Jeu;