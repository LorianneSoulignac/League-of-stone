
import React, {Component} from "react";

import Card from "../card/Card";
import Axios from "axios";
import { SERVER_URL } from "../consts";

class Board extends Component {


	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			champions: [],
			token: this.props.token
		
		};
		

	}

	
		
	
	recupererinfoenanglais() {
		let iChamps = [];
		for (let i = 0; i < 120 ; i++) {	
			iChamps.push({ "id" : this.state.champions[i].key ,"name": this.state.champions[i].name, "img":  this.state.champions[i].key + "_0.jpg" ,"attack": this.state.champions[i].info.attack,"defense": this.state.champions[i].info.defense}); 
				console.log(iChamps[i]);
			}
		return iChamps;
		
	}

	deckcards(champs) {
		console.log("bonjour")

		let cards = [];
		// for (let i = 0; i < 20; i++) {
		// 	cards.push(
		// 		<Card id={champs[i].id}
		// 			  name={champs[i].name}
		// 			  img={champs[i].key +"_0.jpg"}
		// 			  attack={champs[i].info.attack}
		// 			  defense={champs[i].info.defense}
					  
		// 			  />);

		// 		console.log(cards[i])
		// }
		let i = 0;
		for(let c in champs){
			console.log("in deckcards")
			cards.push(
				champs[c]["key"]
			)
			i++
			if(i==20){
				break;
			}
		}

		return cards;
	}



	componentDidMount() {
		
		
		Axios
			.get(SERVER_URL + "/cards/getAll")

			.then(
				(result) => {
					
					
					if(result.data.status=== "ok"){
						this.setState({
							isLoaded:true,
							champions :result.data.data
							
						})
						let champions = this.recupererinfoenanglais(this.state.champions);
						
				}},
				
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
				);

	}

	handleCreateDeck() {
		let cards = this.deckcards();
		let req = encodeURI(cards);

		Axios
			.get(SERVER_URL + "/match/initDeck?token=" +
				this.state.token +
				"&deck=" +
				req
			)
			.then(
				(result) => {
					
					
					if(result.data.status=== "ok"){
						console.log(result.data.data);
						
						
				}},)
			}


	render() {

		const {error, isLoaded, champions} = this.state;

		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>veuillez attendre .</div>;
		} else {
			console.log(champions)
			let cards = this.deckcards(champions);
			return (
				<section className="row" classID="board">
					<button onClick={this.handleCreateDeck()}></button>
					{cards}
				</section>
			);
		}
	}
}

export default Board;
