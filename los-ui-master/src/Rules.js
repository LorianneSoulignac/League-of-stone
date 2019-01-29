import React, { Component } from "react";
import './Rules.css';
import Menu from './menu.js';

class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            pseudo: this.props.pseudo,
        };
    }

    render() {
       
        return(
            <div>
                <h1>Règles de League of Stone</h1>
                <p>Les joueurs jouent chacun leur tour dans l’objectif de réduire les points de vie de l’adversaire à 0 pour gagner la partie. Au début de la partie, les deux joueurs piochent 4 cartes. Durant son tour, un joueur peut effectuer 3 actions dans l’ordre qu’il le souhaite :</p>
                <ul>
                    <li>Piocher une carte (une fois par tour)</li>
                    <li>Poser une carte sur le plateau (au maximum 5 par joueur sur le plateau)</li>
                    <li>Attaquer (une fois par carte sur le plateau)</li>
                </ul>
                <p>Une carte posée sur le plateau durant ce tour ne pourra attaquer qu’au tour suivant. Au tour suivant la carte peut attaquer un monstre sur le plateau adverse. Résolution de l’attaque :</p>
                <ul>
                    <li>Si la valeur d’attaque de la carte qui attaque est supérieure à la valeur de défense de la carte adverse alors cette dernière est supprimée et la différence entre les deux valeurs de carte est retirée aux points de vie de l’adversaire.</li>
                    <li>Si les deux cartes ont une attaque et une défense égales alors les deux cartes sont détruites.</li>
                    <li>Si la valeur d’attaque est inférieure à la valeur de défense alors la carte attaquante est détruite.</li>
                    <li>S’il n’y a aucune carte sur le plateau adverse alors la carte peut directement attaquer les points de vie de l’adversaire.</li>
                </ul>
                <p>Une fois qu’une carte a attaqué, elle devra attendre le tour suivant pour attaquer de nouveau.</p>
            </div>
        );
    }
}

export default Rules;