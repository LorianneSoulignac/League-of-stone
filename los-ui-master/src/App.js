import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

// pages
import Profile from './profile';
import Signin from './SigninSignup/Signin';
import Signup from './SigninSignup/Signup';
import Rules from './Rules';
import Home from './home';

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
          <Route path="/home" component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/signup" component={Signup} />
          <Route path="/rules" component={Rules} />
          <PrivateRoute component={Profile} isConnected={this.state.isConnected} />
        </Switch>
      </Router>
    );
  }
  //<Route path="/Regle" component={Regle} />
}

export default App;