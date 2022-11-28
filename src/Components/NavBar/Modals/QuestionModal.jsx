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
            <h1>FAQ</h1>
            <div className="modal-body">
              <h3>What is this?</h3>
              <div>
                A to do list meant that can also be used to keep track of how
                much time is used per task.
              </div>
              <h3>Why did you make this?</h3>
              <div>
                When studying, I normally jot down what I worked on and the
                amount of time spent. I've gone through a couple physical
                notebooks, and thought I'd make my own version but with
                additional functions I've always wanted. Plus, this was an
                opportunity to try utilizing some React skills I've been
                learning.
              </div>
              <h3>How do I use Bounty Sheet?</h3>
              <div>
                Submit Bounties that you want to get done, and time yourself
                with the timer/stopwatch on the top right. Featured bounties
                have a clock button that saves the amount of time you used.
              </div>
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

export default QuestionModal;
