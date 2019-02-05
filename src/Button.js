import React, { Component } from 'react'
import "./Button.css"

export default class ButtonAnimation extends Component {

  render() {
    return (
        <div className="button">
            JOUER&nbsp;&nbsp;
            <span class="shift">›</span>
            <div class="mask"></div>
        </div>
        
        
    )
  }
}
