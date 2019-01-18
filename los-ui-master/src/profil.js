import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "./consts";
import {
    Redirect
  } from "react-router-dom";
  
class Profil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connect: true
          };


        this.disconnection = this.disconnection.bind(this);
    }

    disconnection() {
    axios
      .get(
        SERVER_URL +
          "/users/disconnect")
      .then(res => {
        if (res.data.status === "ok") {
            this.setState({ connect: false })
            //<Route path="/Regle" component={Regle} />

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
                    <button onClick={this.deconnexion}>Deconnexion</button>  
            </nav>
            <h1>Mon Profil </h1>
            <div>
                <h2>Mon pseudo : </h2>
                <h2>Mon mail : </h2>
            </div>
        </body>  
    );

//}
    }
}

export default Profil;