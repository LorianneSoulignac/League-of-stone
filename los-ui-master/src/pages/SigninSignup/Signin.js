import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { SERVER_URL } from "../../consts";

import './SigninSignup.css';
// import './passwordChange'

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      visibility: false
    };

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .get(
        SERVER_URL +
          "/users/connect?email=" +
          this.state.email +
          "&password=" +
          this.state.password
      )
      .then(res => {
        if (res.data.status === "ok") {
          this.props.setSessionToken(res.data.token);
          this.props.history.push({pathname : process.env.PUBLIC_URL + "/",
        state : {token : res.data.data.token, id: res.data.data.id, name : res.data.data.name}});
          
        }else{
          console.log("erreur")
          document.getElementsByClassName("error")[0].style.display = "block";
          
        }
      });
  }
  renderTools(){

  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  

  render() {
    return (
      <div>
        
        <form onSubmit={this.handleSubmit} className="box">
          <div>
            <label>
            <div className="error">T'as pas de compte ou quoi mon gars ! :) </div>
              <p id="titre">Login :</p>
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleChangeEmail}
                placeholder="Email"
              />
            </label>
          </div>
          <div>
            <label>
              {/* Mot de passe :{" "} */}
              <input
                type={this.state.visibility ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChangePassword}
                placeholder="Mot de passe"
                className="password"
              />
              
            </label>
          </div>
          <div>
            <input type="submit" value="Se connecter"/>
          </div>
          <div className="box-text">
          {
            "Vous n’avez pas de compte ? "
          }
          <Link to="/signup" className="box-subText">Inscrivez-vous !</Link>
        </div>
        </form>
        
      </div>
    );
  }
}

export default Signin;
