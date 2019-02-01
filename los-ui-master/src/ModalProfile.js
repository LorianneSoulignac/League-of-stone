import React from 'react';
import './Modal.css';

const modalProfile = (props) => {
    return (
        <div>
            <div className="modal-wrapper" style={{
                    transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h3>Settings</h3>               
                </div>
                <div className="modal-body">
                    <p>
                        {props.children}
                    </p>                
                </div>
            </div>
        </div>
    )
}

export default modalProfile;

