import React from 'react';
import PropTypes from 'prop-types';

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if(!this.props.show) {
      return null;
    }

    return (
      <div>
        <div>
          {this.props.children}
          <div style= {{height:'350px'}}>
            <div style={{overflow: 'hidden visible', height:'100%', minHeight:'100%', border:'3px #dfaf2c solid', float:'left', width:'47%', backgroundColor: '#666666', borderRadius: '25% 0% 0% 25%', paddingRight:'1%'}}>
                <h2>Demande</h2>
                <ul style={{margin:0, padding:0}}>
                
                </ul>
            </div>
          <div style={{overflow: 'hidden visible', height:'100%', minHeight:'100%', border:'3px #dfaf2c solid', float:'right', width:'47%', backgroundColor: '#666666', borderRadius: '25% 0% 0% 25%', paddingLeft: '1%'}}>
          <h2>Connecté</h2>
          <ul style={{margin:0, padding:0}}>
              
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