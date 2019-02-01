import React, { Component } from 'react';
import { Link } from "react-router-dom";
import'./Game.css';
import axios from "axios";
import { SERVER_URL } from "./consts";
import Board from "./board/Board";





class Game extends Component {
    
	constructor(props) {
		super(props);
		this.state = {
			
			token: this.props.location.state.token
		
		};
		

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
    return (
        
      <div>
      <div>
          <header>
        
              <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-info bg-dark ">
                  <a className="nav-item nav-link  text-warning" >
                  <Link to="/Game">Accueil</Link>
                  </a>
                  <a className="nav-item nav-link  text-warning"> 
                  <Link to="/Profile">Profil</Link> 
                  </a>
                    <a className="nav-item nav-link  text-warning" >
                    <Link to="/Réglesdejeux">Régles de jeux</Link>
                    </a> 
                    <a className="nav-item nav-link  text-warning" onClick={this.handleDisconnection}>Deconnexion</a>

              </nav>
          </header>
          </div>




          <div >
              
			<div >
			<Board
            token= {this.props.location.state.token}
            />
			</div>
         

         

            </div>

         

        

</div>





            
            
            


           
        );
    }
}


 
export default Game;
