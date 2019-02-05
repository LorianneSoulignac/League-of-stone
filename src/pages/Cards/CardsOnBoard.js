import React, { Component } from 'react';
import axios from "axios";
import { SERVER_URL } from "../../consts";
import { Modal } from 'react-bootstrap';
import "./Cards.css";
import "../Jeu/Jeu.css";

class CardBoard extends Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		let id = "card"+this.props.lvl;
		let img = "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+this.props.name+"_1.jpg";
		return(
			<div>
				<div className={id}>          
					<div className="card_joueev2" style={{backgroundImage: "url("+img+")"}}>
						<div className="card_joueev3_1">
							<div className="infoAttCard">{Math.round(this.props.attack)}</div>
							<div className="infoDeffCard">{Math.round(this.props.deff)}</div>
							<div className="infoNomCard">{this.props.name}</div>
							<button type="button" class="btn_hidden" onClick={this.props.onClick}></button>
						</div>
					</div>
				</div>
            </div>
		)
	}
}

export default CardBoard;