import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { SERVER_URL } from "./consts";

import "./App.css";

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
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
          this.props.history.push(process.env.PUBLIC_URL + "/");
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
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Connectez-vous :
          <div>
            <label>
              Login :{" "}
              <input
                type="text"
                value={this.state.email}
                onChange={this.handleChangeEmail}
              />
            </label>
          </div>
          <div>
            <label>
              Mot de passe :{" "}
              <input
                type="password"
                value={this.state.password}
                onChange={this.handleChangePassword}
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Se connecter" />
          </div>
        </form>
        <div>
          {
            "Vous n’avez pas de compte ? Créez votre compte en quelques secondes "
          }
          <Link to="/signup">en cliquant ici !</Link>
        </div>
      </div>
    );
  }
}

export default Signin;
