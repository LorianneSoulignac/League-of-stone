import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-responsive-modal'
import { SERVER_URL } from '../../consts';




class Jeu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.location.state.token,
            player1:this.props.location.state.player1,
            player2:this.props.location.state.player2,

            error: null,
			isLoaded: false,
            champions: [],
            
            req: [],
            deck: false
        };
      }

//deck
	
recupererinfoenanglais() {
    let iChamps = [];
    for (let i = 0; i < 120 ; i++) {	
        iChamps.push({ "id" : this.state.champions[i].key ,"name": this.state.champions[i].name, "img":  this.state.champions[i].key + "_0.jpg" ,"attack": this.state.champions[i].info.attack,"defense": this.state.champions[i].info.defense}); 
            // console.log(iChamps[i]);
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
        // console.log("in deckcards")
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
    
    
    axios
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

            this.getMatch()

}

handleCreateDeck() {
    let cards = this.deckcards(this.state.champions);
    let req = cards;
    let temp = "["
    for(let c in cards){
        temp+="{key:\""
        temp+=cards[c]
        temp+="\"}, "
    }
    
    temp = temp.substring(0, temp.length - 1);
    temp = temp.substring(0, temp.length - 1);
    temp+="]"

    axios
    
        .get(SERVER_URL + "/match/initDeck?deck=" +
            JSON.stringify(temp)
        )
        .then(
            (result) => {
                console.log(result)
                if(result.statusText=== "OK"){
                    
                    this.setState({deck: true})
                    
                    
            }},)
        }


deck = () =>{
this.handleCreateDeck()
}



    getMatch(){
        axios
        .get(
          SERVER_URL +
            "/match/getMatch?token="+this.props.location.state.token
        ).then(res => {
            console.log(res)
            if (res.data.data.status === "ok") {
               this.setState({deck: true})
            }else if(res.data.data.status === "Deck is pending"){
                
            }
          });
      }


    render() {
        if(!this.state.deck){
            return (
                <div>
            <div className="button-modal" onClick={this.deck}>
                <span className="title-jouer">Deck&nbsp;&nbsp;</span>
                <span className="title-jouer shift">›</span>
                <div className="mask"></div>
            </div>
            {this.state.req.map((key,index) => key.key)}
            </div>
            );
        }else{
        return (
            <div>
                <button>Piocher une carte</button>
                <button>Changer tour</button>
                <button>Attaquer</button>
            </div>
        );}
    }
}

export default Jeu;