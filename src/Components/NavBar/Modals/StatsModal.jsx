import React, { useState } from 'react';
import { BarChart, Close } from '@mui/icons-material/';
import './modals.css';

const StatsModal = () => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="info-container">
      <BarChart className="modal-button" onClick={() => setModalOpen(true)} />
      {modalOpen ? (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>Stats</h1>
            <div className="modal-body">
              <div>
                All bounties that are cashed in are saved to the local storage
                of your web browser!
              </div>
              <div>Stats: Coming soon..</div>
            </div>
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

export default StatsModal;
