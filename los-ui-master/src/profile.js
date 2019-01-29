import React, { Component } from 'react';
  
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            pseudo: this.props.pseudo,
        };
    }

    render() {

        return ( 
            <body>
                <h1>Mon Profil </h1>
                <div>
                    <h2>Mon pseudo : {this.state.email} </h2>
                    <h2>Mon mail : {this.state.pseudo} </h2>
                </div>
            </body>  
        );
        }
    }

export default Profile;