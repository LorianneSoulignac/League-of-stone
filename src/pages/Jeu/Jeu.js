import React, { Component } from "react";
import axios from "axios";
import Modal from 'react-responsive-modal'
import { SERVER_URL } from '../../consts';
import Card from "../Cards/Cards"
import CardBoard from "../Cards/CardsOnBoard"
import "./Jeu.css";




class Jeu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // general info
            token: this.props.location.state.token,
            // token: "JgUY9ZDH347l_7mXbzXZBHSSx3iejNF5",
            yourPseudo: this.props.location.state.pseudo,
            // pseudo: "11",

            //Deck info
            champions: [],
            deck: true,

            // board info
            adverseHp: null,
            yourHp: null,
            card_j1_played: [],
            nbCardj2: null,
            hands: [],
            nbCardHand:null,
            BoardJ1: [],
            BoardJ2: [],
            data: null,
            yourTurn: null,
            adverseTurn: null,

            //your action

        };
      }


componentDidMount=()=>{
this.getChampfromBack();
this.getDeckLoad();
this.getMatch();
this.intervalGetMatch = setInterval(() => this.getMatch(), 5000);

    
}

componentWillMount(){
    clearInterval(this.intervalGetMatch);
  }

//Partie de l'init deck 
transformInfoChamp=()=>{
    let iChamps = [];
    for (let i = 0; i < this.state.champions.length ; i++) {	
        iChamps.push({ "id" : this.state.champions[i].key ,"name": this.state.champions[i].name, "img":  this.state.champions[i].key + "_0.jpg" ,"attack": this.state.champions[i].info.attack,"defense": this.state.champions[i].info.defense}); 
           
        }
    return iChamps;
}
getTwentyRandomChamp=(champs)=>{

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
        "/match/getMatch?token="+this.state.token
    ).then(res => {
        if (res.data.data.status === "Deck is pending") {
            this.setState({deck: false})
        }else {
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
    axios
    
        .get(SERVER_URL + "/match/initDeck?deck=" +
        JSON.stringify(champ.value) +
            "&token=" +
            this.state.token
        )
        .then(
            (result) => {
                if(result.statusText=== "OK"){
                    this.setState({deck: true})
            }},)
}


//Partie de la gestion du plateau

pickCard = () => {
    if(this.canDoaction()){
        axios
      .get(
        SERVER_URL + "/match/pickCard?token=" + 
        // replace with own token
        this.state.token
      )
      .then(res => {
        if(res.data.status === "ok"){
          // change the property of state
          
          this.setState({data: res.data.data})
          this.getMatch();
        }
      else if(res.data.status == "error" & res.data.message=="Card already picked"){
        alert("deja pioché")
      }
    })
    } else{
        this.canDoactionAlertNot()
    }
    
}

playCard = (nameChamp) => {
    if(this.canDoaction()){
        axios
      .get(
        SERVER_URL + "/match/playCard?token=" + 
        // replace with own token
        this.state.token
        + "&card=" + nameChamp
      )
      .then(res => {
        if(res.data.status === "ok"){
          // change the property of state
          
          this.setState({data: res.data.data})
          this.getMatch();
        }
      else {
        // alert error
      }
    })
    } else{
        this.canDoactionAlertNot()
    }
    
}
  
  temp = (id,event) =>{
    alert("Vous allez joué le champion: "+id)
  }
  
  
  componentDidMount(){
    this.getMatch();
    // this.intervalGetMatch2 = setInterval(() => this.getMatch(), 5000);
  }
  
  getMatch(){
    axios
      .get(
        SERVER_URL + "/match/getMatch?token=" + 
        // replace with own token
        this.state.token
      )
      .then(res => {
        if(res.data.status === "ok"){
          // change the property of state
          
          this.setState({data: res.data.data})
          this.test2();
        }
      else {
        // alert error
      }
    
    })
  }
  
  abandon = () =>{
  
    axios
    .get(
      SERVER_URL + "/match/finisMatch"
    )
    .then(res => {
      if(res.data.status === "ok"){
        console.log("fin partie")
      }
    else {
      // alert error
    }
  
  })
  
  }
  
 
  canDoaction=()=>{
    let getAll = this.state.data;   
    let p1 = null;
    let p2 = null;
    if(this.state.yourPseudo == getAll['player1']['name']){
        p1 = 'player1'
        p2 = 'player2'
    }else{
        p2 = 'player1'
        p1 = 'player2'
    }
    return getAll[p1]['turn'];
  }
  canDoactionAlertNot=()=>{
    let getAll = this.state.data;
 
    let p1 = null;
    let p2 = null;
    if(this.state.yourPseudo == getAll['player1']['name']){
        p1 = 'player1'
        p2 = 'player2'
    }else{
        p2 = 'player1'
        p1 = 'player2'
    }

    if(!getAll[p1]['turn']){
        alert("Ce n'est pas votre tour")
    };
  }
  
    endTurn = () => {
        if(this.canDoaction()){
      axios
    .get(
      SERVER_URL + "/match/endTurn?token=" + 
      // replace with own token
      this.state.token
    )
    .then(res => {
      if(res.data.status === "ok"){
        alert("changement turn")
      }
  
    })
    }else{
        this.canDoactionAlertNot()
    }
    }

 
test2=()=>{
    let getAll = this.state.data;
    let p1 = null;
    let p2 = null;
    if(this.state.yourPseudo === getAll['player1']['name']){
        p1 = 'player1'
        p2 = 'player2'
    }else{
        p2 = 'player1'
        p1 = 'player2'
    }
        let yourhp = getAll[p1]['hp']
        let adverseHp = getAll[p2]['hp']
        let hands = getAll[p1]['hand']
        let BoardJ1 = getAll[p1]['board']
        let BoardJ2 = getAll[p2]['board']
        let finalHands = []
        let finalBoardj1 = []
        let finalBoardj2 = []
        let nbCardj2 = getAll[p2]['hand']
        let yourTurn = getAll[p1]['turn']
        let adverseTurn = getAll[p2]['turn']
        let i=1;
        for (let card in hands){
            let nameChamp= hands[card]['name'].replace(/\s/g, '');
          finalHands.push(
            <Card lvl={i}
            name= {nameChamp}
            attack= {hands[card]['stats']['attackdamage']}
            deff = {hands[card]['stats']['armor']}
            onClick={this.playCard.bind(this, nameChamp)}
            />
            
          );
          i = i+1;
        }
        i=1;
        for (let card in BoardJ1){
            let nameChamp= BoardJ1[card]['name'].replace(/\s/g, '');
          finalBoardj1.push(
            <CardBoard lvl={i}
            name= {nameChamp}
            attack= {BoardJ1[card]['stats']['attackdamage']}
            deff = {BoardJ1[card]['stats']['armor']}
            onClick={this.temp.bind(this,nameChamp)}
            />
            
          );
          i = i+1;
        }
        i=1;
        for (let card in BoardJ2){
            let nameChamp= BoardJ2[card]['name'].replace(/\s/g, '');
          finalBoardj2.push(
            <CardBoard lvl={i}
            name= {nameChamp}
            attack= {BoardJ2[card]['stats']['attackdamage']}
            deff = {BoardJ2[card]['stats']['armor']}
            />
            
          );
          i = i+1;
        };
        this.setState({
            yourHp: yourhp,
            adverseHp: adverseHp,
            hands: finalHands,
            nbCardHand: finalHands.length+1,
            BoardJ1: finalBoardj1,
            BoardJ2: finalBoardj2,
            nbCardj2: nbCardj2,
            yourTurn: yourTurn,
            adverseTurn: adverseTurn,
        })
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
                
                <div class="test">
                {/* bouton de test au cas ou  */}
                <div class="init_test">
                <button type="button" class="btn_hidden" onClick={this.test2}></button>
                </div>
      
                {/* div contenant le plateau centrale */}
                <div class="center_board">
                <div class="endTurn">
                </div>
                <div class="plateauJ1">
                  {this.state.BoardJ1}
                </div>
                <div class="plateauJ2">
                  {this.state.BoardJ2}
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
                
                {this.state.hands}
      
                </div>
      
              </div>
              
              
      );
    }
    }
}

export default Jeu;