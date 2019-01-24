import React, { Component } from 'react';
import { Link } from "react-router-dom";
import'./home.css';
import axios from "axios";
import { SERVER_URL } from "./consts";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: this.props.location.state.email,
          pseudo: this.props.location.state.pseudo,
        };
        this.profilePage = this.profilePage.bind(this);
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
                    connect : false,
                    })
                }
            });
    }
profilePage(){
    this.props.history.push({pathname : process.env.PUBLIC_URL + "/profile", state: { pseudo : this.state.pseudo, email :this.state.email}});
}

rulesPage(){
    this.props.history.push({pathname : process.env.PUBLIC_URL + "/rules", state: { pseudo : this.state.pseudo, email :this.state.email}});
}

  render() {
        return (
            <div>
                    <div>
                        <header>  
                            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-info bg-dark ">
                                <a className="nav-item nav-link  text-warning" >
                                <Link to="/Home">Accueil</Link>
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
                    </div>
                    <div >
                        <video id="background-video"   loop autoPlay>
                        <source src="hero-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                        
                        <div id="button">
                            <img src= "280px-Hearthstone_(2016)_Logo.png"/>
                        </div>
                    </div>
            </div>          
        );
    }
}


 
export default Home;
