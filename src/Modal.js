import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Website Discontinued</h2>
                <p>
                    This website has been discontinued due to budget constraints for AWS RDS services.
                </p>
                <button onClick={onClose} className="modal-button">Close</button>
            </div>
        </div>
    );
};

export default Modal;
