import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Signin from "./Signin";
import Signup from "./Signup";
import Game from "./Game";

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
          />
          <Route path="/signup" component={Signup} />
          <PrivateRoute component={Game} isConnected={this.state.isConnected} />
        </Switch>
      </Router>
    );
  }
}

export default App;
