import React, { Component } from 'react';
import axios from "axios";
import { SERVER_URL } from "../../consts";
import Modal from 'react-modal';
import "./Cards.css";
import "../Jeu/Jeu.css";

class Card extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		let id = "card"+this.props.lvl;
		return(
			<div>
			<div class={id}>
	
			  <div class="card_hand">
			  <button type="button" class="btn_hidden" onClick={this.props.onClick}></button>
			  </div>
	
			  </div>
			  </div>
		)
	}
}

export default Card;