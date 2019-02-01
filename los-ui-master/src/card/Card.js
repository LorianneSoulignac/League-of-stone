
import React, {Component} from "react";

import "./card.css";

class Card extends Component {
	constructor(props) {
		super(props);

	}
	render() {
		
		return (
			<div className="col-lg-3 col-md-4 col-xs-6 thumb flip" >
				
					<div className="face front">
						<img className="card-img-top"
							 src={"http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + this.props.img}
							 alt="Card  cap"/>
						<div className="card-body">
							<p className="card-text">{this.props.name} attack : {this.props.attack}  defense : {this.props.defense}</p>
						</div>
					
					
				</div>
			</div>

		);
	}
}

export default Card;
