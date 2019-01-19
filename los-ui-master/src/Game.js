import React, { Component } from 'react';
import { Link } from "react-router-dom";
import'./Game.css';



class Game extends Component {
  render() {
    return (
      <div>
      <div>
          <header>
        
              <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-dark bg-dark menu">
                  <a className="navbar-brand" href="#">Accueil</a>
                  <a className="nav-item nav-link active" href="#">Profil </a>
                  <a className="nav-item nav-link" href="#">Regles de jeux</a>
                  <a className="nav-item nav-link" href="#">Deconnexion</a>
              </nav>
          </header>
          </div>




          <div id="videowrap">
         

          <video id="background-video"   loop autoPlay>
          <source src="hero-video.mp4" type="video/mp4" />
           Your browser does not support the video tag.
            </video>
            
            <div id="button">
                <img src= "Hearthstone_(2016)_Logo.png"/>
            </div>

            </div>

         

        

</div>





            
            
            


           
        );
    }
}


 
export default Game;
