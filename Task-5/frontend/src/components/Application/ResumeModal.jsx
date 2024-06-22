import React from 'react';
import { FaRegWindowClose } from "react-icons/fa";

const ResumeModal = ({ imageURL, onClose }) => {
  return (
    <div className="resume-modal modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn" onClick={onClose}>
              <FaRegWindowClose size={24} />
            </button>
          </div>
          <div className="modal-body text-center">
            <img src={imageURL} alt="resume" className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
