
import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 50
    };

    const modalStyle = {
      backgroundColor: '#a6a6a6',
      borderRadius: 5,
      maxWidth: 'auto',
      minHeight: 'auto',
      padding: 30,
    };

    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
          {this.props.children}
          <div style= {{height:'350px'}}>
          <div style={{overflow: 'hidden visible', height:'100%', minHeight:'100%', border:'3px #dfaf2c solid', float:'left', width:'47%', backgroundColor: '#666666', borderRadius: '25% 0% 0% 25%', paddingRight:'1%'}}>
            <h2>Demande</h2>
            <ul style={{margin:0, padding:0}}>
              <p>joueur1</p>
              <p>joueur2</p>
              <p>joueur3</p>
              <p>joueur4</p>
              <p>joueur5</p>
              <p>joueur6</p>
              <p>joueur7</p>
              <p>joueur8</p>
              <p>joueur9</p>
              <p>joueur10</p>
              <p>joueur11</p>
              <p>joueur12</p>
            </ul>
          </div>
          <div style={{overflow: 'hidden visible', height:'100%', minHeight:'100%', border:'3px #dfaf2c solid', float:'right', width:'47%', backgroundColor: '#666666', borderRadius: '25% 0% 0% 25%', paddingLeft: '1%'}}>
          <h2>Connecté</h2>
          <ul style={{margin:0, padding:0}}>
              <p>joueur1</p>
              <p>joueur2</p>
              <p>joueur3</p>
              <p>joueur4</p>
              <p>joueur5</p>
              <p>joueur6</p>
              <p>joueur7</p>
              <p>joueur8</p>
              <p>joueur9</p>
              <p>joueur10</p>
              <p>joueur11</p>
              <p>joueur12</p>
            </ul>
            </div>
          </div>
          <div style={{clear:'both'}}>
            <button onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;