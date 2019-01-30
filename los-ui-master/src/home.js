import React, { Component } from 'react';
import'./home.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: this.props.email,
            pseudo: this.props.pseudo,
        };
    }

    render() {

        return (
            <div>
                    <div >
                        <video id="background-video"   loop autoPlay>
                        <source src="hero-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                        </video>
                        
                        <div id="logo-HeartStone">
                            <img src= "280px-Hearthstone_(2016)_Logo.png"/>
                        </div>
                    </div>
            </div>          
        );
    }
}
 
export default Home;
