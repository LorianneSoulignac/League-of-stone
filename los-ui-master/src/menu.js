import React, { Component } from "react";
import { Link } from "react-router-dom";


class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            pseudo: this.props.pseudo,
        };
    }

    render() {
            return (
                <header>  
                    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-info bg-dark ">
                        <a className="nav-item nav-link  text-warning" >
                            <button> <Link to="/home" params={{email : this.props.email, pseudo:this.props.pseudo}}>Home</Link> </button>
                        </a>
                        <a className="nav-item nav-link  text-warning"> 
                            <button> <Link to="/profile" params={{email : this.props.email, pseudo:this.props.pseudo}}>Profile</Link> </button>
                        </a>
                        <a className="nav-item nav-link  text-warning" >
                            <button> <Link to="/rules" params={{email : this.props.email, pseudo:this.props.pseudo}}>Rules</Link> </button>
                        </a> 
                        <a className="nav-item nav-link  text-warning" >
                            <button><Link to="/Signin">Disconnect</Link> </button>
                        </a> 
                    </nav>
                </header>
            );
    }
}

export default Menu;