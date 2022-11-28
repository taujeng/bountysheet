import React, { useState } from 'react';
import { ContactSupport, Close } from '@mui/icons-material/';
import './modals.css';

const QuestionModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="info-container">
      <ContactSupport
        className="modal-button"
        onClick={() => setModalOpen(true)}
      />
      {modalOpen ? (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>title</h1>
            <body className="modal-body">this is how bs works</body>
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

export default QuestionModal;
