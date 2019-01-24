import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Redirect
} from "react-router-dom";

import { SERVER_URL } from "../consts";

import './SigninSignup.css';
// import './passwordChange'

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isConnect : true,
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
          this.props.history.push({pathname : process.env.PUBLIC_URL + "/home", state: { pseudo : res.data.data.name, email : res.data.data.email}});
          this.setState({
            isConnect : false,
            
          })
          
        }
      });

      
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {

    if(this.isConnect === false){
      return(<Redirect to='/signin'></Redirect>)

    }else{
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="box">
          <div>
            <label>
              <p id="titre">Login :</p>
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleChangeEmail}
                placeholder="Pseudo"
              />
            </label>
          </div>
          <div>
            <label>
              {/* Mot de passe :{" "} */}
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChangePassword}
                placeholder="Mot de passe"
                className="password"
              />
              <button class="unmask" type="button" title="Mask/Unmask password to check content">Unmask</button>
            </label>
          </div>
          <div>
            <input type="submit" value="Se connecter"/>
          </div>
          <div className="box_text">
          {
            "Vous n’avez pas de compte ? "
          }
          <Link to="/signup">Inscrivez-vous !</Link>
        </div>
        </form>
        
      </div>
    );
  }
  }
}

export default Signin;
