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


        this.handleDisconnection = this.handleDisconnection.bind(this);
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

    render() {

//if(!this.props.connect){
  //  return <Redirect to ='/signIn'/>
//}
//else{
    return ( 
        <body>
            <header>League of Stones</header>
            <nav>
                    <Link to="/accueil">Accueil</Link>
                    <Link to="/profile">Mon profil</Link>
                    <button onClick={this.handleDisconnection}>Deconnexion</button>  
            </nav>
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