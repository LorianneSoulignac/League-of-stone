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
            console.log("deck pending")
            this.setState({deck: false})
        }else {
            console.log("ok")
            this.setState({deck: true})
        }
        });
}

handleCreateDeck=()=>{
    let cards = this.getTwentyRandomChamp(this.state.champions);
    
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
            encodeURI(temp) +
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

    render() {
        if(!this.state.deck){
            return (
                <div>
            <div className="button-modal" onClick={this.handleCreateDeck}>
                <span className="title-jouer">Deck&nbsp;&nbsp;</span>
                <span className="title-jouer shift">›</span>
                <div className="mask"></div>
            </div>  
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