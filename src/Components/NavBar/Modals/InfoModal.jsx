import React, { useState } from 'react';
import { Info, Close } from '@mui/icons-material/';
import './modals.css';

const InfoModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="info-container">
      <Info className="modal-button" onClick={() => setModalOpen(true)} />
      {modalOpen ? (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>Info</h1>
            <div className="modal-body">If you have any comments/suggestions, I can be reached at slarkgoesfishing@gmail.com</div>
            <footer className="modal-footer">
              <Close
                className="modal-close"
                onClick={() => setModalOpen(false)}
              />
            </footer>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InfoModal;
