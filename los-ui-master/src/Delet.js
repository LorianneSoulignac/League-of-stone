import React, { Component } from 'react'
import axios from "axios";
import { SERVER_URL } from './consts';
import './pages/SigninSignup/SigninSignup.css';
class Delet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.state.pseudo,
      token: this.props.location.state.token,
      password: "",
    }
    console.log(this.state.email)
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    axios
      .get(
        SERVER_URL +
        '/users/unsubscribe?email='+this.state.email+"&password="+this.state.password+"&token="+this.state.token
        ).then(res => {
          console.log(res)
          if (res.data.status === "ok") {
            console.log(res.data.status)
            this.props.history.push(process.env.PUBLIC_URL + "/");
            this.setState({
            })
              }else{
                console.log("err")
              }

            })
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="box">
          <div>
            <label>
            <div className="error">T'as pas de compte ou quoi mon gars ! :) </div>
              <p id="titre">Supprimer votre compte :</p>
            </label>
          </div>
          <div>
            <label>
              {/* Mot de passe :{" "} */}
              <input
                value={this.state.password}
                onChange={this.handleChangePassword}
                placeholder="Mot de passe"
                className="password"
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Supprimer le compte"/>
          </div>
        </form>
        
      </div>
    )
  }
}

export default Delet