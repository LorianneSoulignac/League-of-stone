import React, { Component } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Game from "./Game";
import Signin from './pages/SigninSignup/Signin';
import Signup from './pages/SigninSignup/Signup';
import Jeu from "./pages/Jeu/Jeu";
import Delet from './Delet';
import InitDeck from './InitDeck';
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
          <Route path="/jeu" component={Jeu} />
          <Route path="/delet" component={Delet} />
          <Route path="/initDeck" component={InitDeck} />
          <PrivateRoute component={Game} isConnected={this.state.isConnected} />
          <PrivateRoute component={Jeu} isConnected={this.state.isConnected} />
          <PrivateRoute component={Delet} isConnected={this.state.isConnected} />
          <PrivateRoute component={InitDeck} isConnected={this.state.isConnected} />
        </Switch>
      </Router>
    );
  }
}

export default App;
