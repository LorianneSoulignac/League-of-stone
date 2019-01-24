import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "./consts";
import {
    Redirect
  } from "react-router-dom";
  
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pseudo : this.props.location.state.pseudo,
            email : this.props.location.state.email,
          };


        this.homePage = this.homePage.bind(this);
        this.handleDisconnection = this.handleDisconnection.bind(this);
        this.rulesPage = this.rulesPage.bind(this);
    }

    handleDisconnection(e) {
        e.preventDefault();
        axios
            .get(
                SERVER_URL +
                "/users/disconnect")
            .then(res => {
                if (res.data.status === "ok") {
                    this.props.history.push(process.env.PUBLIC_URL + "/signin");
                    this.setState({
                    })
                }
            });
    }
    homePage(){
        this.props.history.push({pathname : process.env.PUBLIC_URL + "/home", state: { pseudo : this.state.pseudo, email :this.state.email}});
    }
    rulesPage(){
        this.props.history.push({pathname : process.env.PUBLIC_URL + "/rules", state: { pseudo : this.state.pseudo, email :this.state.email}});
    }

    render() {

    return ( 
        <body>
            <header>  
                <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-info bg-dark ">
                    <a className="nav-item nav-link  text-warning" >
                    <button onClick = {this.homePage}>Accueil</button>
                    </a>
                    <a className="nav-item nav-link  text-warning"> 
                        <button onClick = {this.profilePage}>Profil</button> 
                    </a>
                    <a className="nav-item nav-link  text-warning" >
                    <button onClick = {this.rulesPage}>Règles du jeu</button>
                    </a> 
                    <a className="nav-item nav-link  text-warning" onClick={this.handleDisconnection}>Deconnexion</a>
                </nav>
            </header>
            <h1>Mon Profil </h1>
            <div>
                <h2>Mon pseudo : {this.state.pseudo} </h2>
                <h2>Mon mail : {this.state.email} </h2>
            </div>
        </body>  
    );

//}
    }
}

export default Profile;