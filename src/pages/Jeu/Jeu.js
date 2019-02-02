import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-responsive-modal'
import { SERVER_URL } from '../../consts';




class Jeu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.location.state.token,
            champions: [],
            deck: false
        };
      }


componentDidMount=()=>{
this.getChampfromBack();
this.getDeckLoad();
console.log(this.state.token)
    
}

transformInfoChamp=()=>{
    let iChamps = [];
    for (let i = 0; i < this.state.champions.length ; i++) {	
        iChamps.push({ "id" : this.state.champions[i].key ,"name": this.state.champions[i].name, "img":  this.state.champions[i].key + "_0.jpg" ,"attack": this.state.champions[i].info.attack,"defense": this.state.champions[i].info.defense}); 
           
        }
    return iChamps;
    
}

getTwentyRandomChamp=(champs)=>{
    console.log("bonjour")

    let cards = [];

    let i = 0;
    for(let c in champs){
        cards.push(
            champs[c]["key"]
        )
        i++
        if(i===20){
            break;
        }
    }

    return cards;
}

getChampfromBack=()=>{
    axios
        .get(SERVER_URL + "/cards/getAll")

        .then(
            (result) => {
                
                
                if(result.data.status=== "ok"){
                    this.setState({
                        isLoaded:true,
                        champions :result.data.data
                        
                    })
                    
                    let champions = this.transformInfoChamp();
                    
            }},
            
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
            );
}
getDeckLoad=()=>{
    axios
    .get(
        SERVER_URL +
        "/match/getMatch?token="+this.props.location.state.token
    ).then(res => {
        console.log(res.data.data.status)
        if (res.data.data.status === "Deck is pending") {
            this.setState({deck: false})
        }else {
            console.log("ok")
            this.setState({deck: true})
        }
        });
}

handleCreateDeck=()=>{
    let cards = this.getTwentyRandomChamp(this.state.champions);
    let champ = {
        value: []
    }
    
    for(let c2 in cards){
        let item = cards[c2]
        champ.value.push({
            "key" : item
        })
    }
    console.log(champ.value)
    
    
    axios
    
        .get(SERVER_URL + "/match/initDeck?deck=" +
        JSON.stringify(champ.value) +
            "&token=" +
            this.state.token
        )
        .then(
            (result) => {
                console.log(result)
                if(result.statusText=== "OK"){
                    
                    this.setState({deck: true})
                    
                    
            }},)
}

getNbCarte = () =>{
    axios
    
        .get(SERVER_URL + "/match/getMatch?token=" +
            this.state.token
        )
        .then(
            (result) => {
                console.log(result)
                if(result.statusText=== "OK"){
                    
                    console.log("ok")
                    
                    
            }},)
}

    render() {
        if(!this.state.deck){
            return (
                <div>
            <div className="button-modal" onClick={this.handleCreateDeck}>
                <span className="title-jouer">Deck&nbsp;&nbsp;</span>
                <span className="title-jouer shift">›</span>
                <div className="mask"></div>
            </div>  
            <div className="button-modal" onClick={this.handleCreateDeck}>
                <span className="title-jouer">(ne cliquer que si vous avez déjà fait initDeck)&nbsp;&nbsp;</span>
                <span className="title-jouer shift">›</span>
                <div className="mask"></div>
            </div>
            </div>
            );
        }else{
        return (
            <div>
                <button onClick={this.getNbCarte}>Piocher une carte</button>
                <button>Changer tour</button>
                <button>Attaquer</button>
            </div>
        );}
    }
}

export default Jeu;