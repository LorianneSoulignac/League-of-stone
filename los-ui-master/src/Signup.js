import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { SERVER_URL } from "./consts";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: ""
    };
    this.handleChangeLogin = this.handleChangeLogin.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(
      this
    );
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeLogin(e) {
    this.setState({ login: e.target.value });
  }
  handleChangeEmail(e) {
    this.setState({ email: e.target.value });
  }
  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  handleChangeConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: "Les deux mots de passe ne correspondent pas" });
      return;
    }
    let url =
      SERVER_URL +
      "/users/subscribe?email=" +
      email +
      "&password=" +
      password +
      "&name=" +
      this.state.login;
    axios.get(url).then(res => {
      let data = res.data;
      if (data.status === "ok") {
        this.props.history.push(process.env.PUBLIC_URL + "/");
      } else {
        this.setState({ error: "Une erreur s'est produite : " + data.message });
      }
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>{this.state.error}</div>
          Inscrivez-vous :
          <label>
            Pseudo :{" "}
            <input
              type="text"
              value={this.state.login}
              onChange={this.handleChangeLogin}
            />
          </label>
          <label>
            Email :{" "}
            <input
              type="text"
              value={this.state.email}
              onChange={this.handleChangeEmail}
            />
          </label>
          <label>
            Mot de passe :{" "}
            <input
              type="password"
              value={this.state.password}
              onChange={this.handleChangePassword}
            />
          </label>
          <label>
            Confirmation du mot de passe :{" "}
            <input
              type="password"
              value={this.state.confirmPassword}
              onChange={this.handleChangeConfirmPassword}
            />
          </label>
          <input type="submit" value="S'inscrire" />
        </form>
        <div>
          {"Vous avez déjà un compte ? "}
          <Link to="/signin">Connectez-vous ici !</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
