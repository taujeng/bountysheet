import React, { useState } from 'react';
import { FormatListBulleted, Close } from '@mui/icons-material/';
import { Tooltip, Zoom } from '@mui/material/';
import './modals.css';
import patchNotes from '../../../patchNotes';

const PatchModal = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const notes = patchNotes();

  // key count 
  let keyCount = 0;

  return (
    <div className="info-container">
      <Tooltip title="Patch Notes" TransitionComponent={Zoom}>
        <FormatListBulleted className="modal-button" onClick={() => setModalOpen(true)} />
      </Tooltip>
      {modalOpen ? (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>Patch Notes</h1>
            <div className="modal-divider"></div>
            <div className="modal-body">
              {Object.entries(notes).map(item => {
                return <div key={item[0]}>
                  <h4>{item[1].date}</h4>
                  {item[1].notes.map((line)=> {
                    keyCount++;
                    return <li key={keyCount}>{line}</li>
                  })}
                </div>
              })}
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

export default PatchModal;
