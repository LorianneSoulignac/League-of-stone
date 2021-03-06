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
            token: this.props.location.state.token,
            yourPseudo: this.props.location.state.pseudo,
            adversePseudo: null,
            isLoaded: false,
            champions: [],
            deck: true,
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
            havePlay: false,
            colorTurn: "",
            textTurn: "",
            infoAttack: "none",
            championAttack: "",
            targetByAttack: "",
            finMatch: false,
            gagnant: null,
            p1: null,
            p2: null,
        };
    }

    componentDidMount=()=>{
    this.getChampfromBack();
    this.getDeckLoad();
    this.getMatch();
    this.intervalGetMatch = setInterval(() => this.getMatch(), 1000);   
    }

    componentWillMount(){
        clearInterval(this.intervalGetMatch);
    }

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
                    }
                },
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
                    }
                },
            )
    }

    pickCard = () => { 
        if(this.canDoaction() && this.state.hands.length <5){
            axios
                .get(
                    SERVER_URL + "/match/pickCard?token=" + 
                    this.state.token
                )
                .then(res => {
                    if(res.data.status === "ok"){          
                    this.setState({data: res.data.data})
                    this.getMatch();
                    }

                    else if(res.data.status == "error" & res.data.message=="Card already picked"){
                        alert("deja pioché")
                    }
                })
        }else{
            if(this.state.hands.length==5){
                alert("pioche impossible vous avez deja 5 cartes")
            }
            this.canDoactionAlertNot()
        }   
    }

    playCard = (nameChamp) => {
        if(this.canDoaction() && !this.state.havePlay){
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
                    
                    this.setState({data: res.data.data, havePlay: true})
                    this.getMatch();
                    }

                    else {
                        // alert error
                    }
                })
        }else{
            if(this.state.havePlay){
                alert("Vous avez déjà jouer une carte!")
            }else{
                this.canDoactionAlertNot()
            }
        }     
    }
    
    temp = (id,event) =>{
        alert("Vous allez joué le champion: "+id)
    }
  
    getMatch(){
        axios
            .get(
                SERVER_URL + "/match/getMatch?token=" + 
                this.state.token
            )
            .then(res => {
                if(res.data.status === "ok"){              
                    if(res.data.data.status === "Player 1 won" || res.data.data.status === "Player 2 won"){
                        this.setState({
                            finMatch: true,
                            gagnant: res.data.data.status
                        })
                    }else{
                        this.setState({data: res.data.data})
                        this.test2();
                    }
                }else {
                    if(res.message == "There is no match associated"){
                        this.props.history.push({pathname : process.env.PUBLIC_URL + "/game",
                        state: { pseudo: this.state.pseudo , token: this.state.token}}); 
                    }
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
                        this.setState({havePlay: false})
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
        let adversePseudo = getAll[p2]['name']
        let i=1;
        for (let card in hands){
            finalHands.push(
                <Card lvl={i}
                    name= {hands[card]['key']}
                    attack= {hands[card]['stats']['attackdamage']}
                    deff = {hands[card]['stats']['armor']}
                    onClick={this.playCard.bind(this, hands[card]['key'])}
                />             
            );
            i = i+1;
        }
        i=1;
        for (let card in BoardJ1){
            finalBoardj1.push(
                <CardBoard lvl={i}
                    name= {BoardJ1[card]['key']}
                    attack= {BoardJ1[card]['stats']['attackdamage']}
                    deff = {BoardJ1[card]['stats']['armor']}
                    onClick={this.attackFromCard.bind(this,BoardJ1[card]['key'])}
                />       
            );
            i = i+1;
        }
        i=1;
        for (let card in BoardJ2){
            finalBoardj2.push(
                <CardBoard lvl={i}
                    name= {BoardJ2[card]['key']}
                    attack= {BoardJ2[card]['stats']['attackdamage']}
                    deff = {BoardJ2[card]['stats']['armor']}
                    onClick={this.targetCard.bind(this,BoardJ2[card]['key'])}
                />            
            );
            i = i+1;
        };
            
        let colorTurn;
        let textTurn;
            if(yourTurn){
                colorTurn="#339933"
                textTurn="Your turn"
            }else{
                colorTurn="#990000"
                textTurn="adverse turn"
            }
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
            colorTurn: colorTurn,
            textTurn: textTurn,
            adversePseudo: adversePseudo,
            p1: p1,
            p2: p2
        })
    }


    attackFromCard=(champName)=>{
        this.setState({
            championAttack: champName,
            infoAttack: "block"
        })
    }

    targetCard=(champName)=>{
        this.setState({
            targetByAttack: champName,
            infoAttack: "block"
        })
    }

    targetPlayer=()=>{
        let champName = this.state.adversePseudo;
        this.setState({
            targetByAttack: champName,
            infoAttack: "block"
        })
    }

    infoAttack=()=>{
        this.setState({
            infoAttack: "block"
        })
    }

    attaquer=()=>{
        if(this.state.yourTurn){
            if(this.state.championAttack == "" || this.state.targetByAttack == ""){
                if(this.state.championAttack == ""){
                    alert("Selectionnes un attaquant!")
                }else{
                    alert("Selectionnes une cible!")
                }
            }else{
                if(this.state.targetByAttack == this.state.adversePseudo){
                    if(this.state.BoardJ2.length != 0){
                        alert("Vous devez vider le board adverse d'abord")
                    }else{
                        this.attaqueChampJoueur(this.state.championAttack)
                    }
                }else{
                    this.attaqueChampChamp(this.state.championAttack,this.state.targetByAttack)
                }           
            }
        }else{
            this.canDoactionAlertNot();
        }     
    }


    attaqueChampChamp=(champName,targetChamp)=>{
        axios
            .get(
                SERVER_URL + "/match/attack?card=" + champName
                + "&ennemyCard="+targetChamp +
                "&token="+this.state.token
            )
            .then(res => {
                if(res.data.status === "ok"){
                }
                else {
                    if(res.data.message === "This card has already attacked"){
                        alert("Nous ne pouvez pas encore attaquer avec cette carte")
                    }else{
                        alert("error attaque champ")
                    }
                }     
            })
    }

    attaqueChampJoueur=(champName)=>{
        axios
            .get(
            SERVER_URL + "/match/attackPlayer?card=" + champName +
            "&token="+this.state.token
            )
            .then(res => {
                if(res.data.status === "ok"){
                }
                else {
                alert("error attaque adverse")
                }   
            })
    }

    finMatch=()=>{
        clearInterval(this.intervalGetMatch);
        axios
            .get(
                SERVER_URL + "/match/finishMatch?token="+this.state.token
            )
            .then(res => {
                if(res.status === "ok"){
                    this.props.history.push({pathname : process.env.PUBLIC_URL + "/game",
                    state: {pseudo: this.state.pseudo, token: this.state.token}});
                    
                }
                else {                    
                    this.props.history.push({pathname : process.env.PUBLIC_URL + "/game",
                    state: {pseudo: this.state.pseudo, token: this.state.token}});
                }    
            })
    }

    render() {
        if(this.state.isLoaded){
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
                if(this.state.finMatch == true){
                    console.log(this.state.gagnant)
                        return(
                            <div className="finPartie">
                                La partie est finie merci d'avoir joué
                                <br/>
                                {this.state.gagnant}
                                <div className="button-modal" onClick={this.finMatch}>
                                    <span className="title-jouer">Retour à l'accueil&nbsp;&nbsp;</span>
                                    <span className="title-jouer shift">›</span>
                                    <div className="mask"></div>
                                </div>
                            </div>
                        )
                }else{
                    return (    
                        <div className="test">
                            <div className="center_board">
                                <div className="endTurn">
                                </div>
                                <div className="plateauJ1">
                                    {this.state.BoardJ1}
                                </div>
                                <div className="plateauJ2">
                                    {this.state.BoardJ2}
                                </div>
                                <div className="endTurn">
                                    <button type="button" className="btn_hidden" onClick={this.endTurn}></button>
                                </div>
                            </div>           
                            <div className="player2">
                                <button type="button" className="btn_hidden" onClick={this.targetPlayer}></button>
                                <div className="life">{Math.round(this.state.adverseHp)}</div>
                            </div>
                            <div className="player1">
                                <div className="life">{Math.round(this.state.yourHp)}</div>
                            </div>       
                            <div className="pioche_j2">
                                <div className="nbCardJ2">{this.state.nbCardj2}</div>
                            </div>
                            <div className="turn" style={{backgroundColor: this.state.colorTurn}}>
                                <div className="turnText">{this.state.textTurn}</div>
                            </div>
                            <div className="deck">
                                <button type="button" className="btn_hidden" onClick={this.pickCard}></button>
                            </div>         
                            <div className="hand">                   
                                {this.state.hands}   
                            </div>        
                            <div className="infoCombat" style={{display: this.state.infoAttack}}>
                                <div className="infoAttack">
                                    <div className="textInfoAttack">Attaquant: <br/>{this.state.championAttack}</div>
                                </div>
                                <div className="infoTarget">
                                    <div className="textInfoAttack">Cible: <br/>{this.state.targetByAttack}</div>
                                </div>
                            </div>      
                            <div className="attaquer" style={{display: this.state.infoAttack}} onClick={this.attaquer}>
                                <button type="button" className="btn_hidden" style={{color: "white",fontSize: "2vw",fontWeight: "900"}}>Attaquer</button>
                            </div>
                        </div>         
                    );
                }
            }
        }else{
            return(
                <div>Loading... </div>
            )
        }
    }
}

export default Jeu;