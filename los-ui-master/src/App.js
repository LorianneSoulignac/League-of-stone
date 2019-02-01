import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// pages
import Game from "./Game";
import Signin from './pages/SigninSignup/Signin';
import Signup from './pages/SigninSignup/Signup';
import Jeu from "./pages/Jeu/Jeu";
import Profile from "./Profile";
import Rules from "./Rules";

import "./App.css";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.isConnected ? (
        <Component {...props} />
      ) : (
        <Redirect to="/signin" />
      );
    }}
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isConnected: false
    };

    this.setSessionToken = this.setSessionToken.bind(this);
  }

  setSessionToken(token) {
    this.setState({ token, isConnected: true });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/signin"
            
            render={props => (
              <Signin setSessionToken={this.setSessionToken} {...props} />
            )}
          />
          <Route path ="/Réglesdejeux" component={Rules}/>
          <Route path ="/Game" component={Game}/>

          <Route path ="/Profile" component={Profile}/>
          <Route path="/signup" component={Signup} />
          <Route path="/jeu" component={Jeu} />
          <PrivateRoute component={Game} isConnected={this.state.isConnected} />
          <PrivateRoute component={Jeu} isConnected={this.state.isConnected} />
        </Switch>
      </Router>
    );
  }
}

export default App;
