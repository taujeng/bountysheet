import React, { useState } from 'react';
import { MonetizationOn, WorkspacePremium, Close } from '@mui/icons-material/';
import { Tooltip, Zoom } from '@mui/material/';
import './Modals/modals.css';
import './daily.css';
import blankCanvas from '../../assets/images/blank_canvas.svg'

const Daily = ({ history }) => {
  const [modalOpen, setModalOpen] = useState(false);
  let dailyBounty = 0,
    dailyTime = 0;
  let dailyHistory = [];

  const todayDate = new Date().toString().slice(4, 15);
  if (history.has(todayDate)) {
    dailyHistory = history.get(todayDate);
    dailyBounty = dailyHistory.length;
    for (let task of dailyHistory) {
      dailyTime += task[1];
    }
  }
  dailyTime = Math.round(dailyTime / 60);

  return (
    <div className="info-container" >
      <Tooltip title="Daily Stats" TransitionComponent={Zoom} >
        <div
          className="daily-container modal-button"
          onClick={() => setModalOpen(true)}
        >
          <div className="daily-bounty">
            <WorkspacePremium />
            {dailyBounty}
          </div>
          <div className="daily-time">
            <MonetizationOn />
            {dailyTime}
          </div>
        </div>
      </Tooltip>

      {modalOpen ? (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>Completed Today:</h1>
            <div className="modal-divider"></div>
            <div className="modal-daily-award">
              <div className="modal-daily-content">
                <WorkspacePremium />
                <span>{dailyBounty} Bounties</span>
              </div>
              <div className="modal-daily-content">
                <MonetizationOn />
                <span>{dailyTime} minutes</span>
              </div>
            </div>
            <div className="modal-daily-list">
              {dailyHistory.length > 1 ? dailyHistory.map((item, ind) => {
                return (
                  <li key={ind}>
                    {Math.round(item[1] / 60) + ' min ' + ':' + ' ' + item[0]}
                  </li>
                );
              }) : <img src={blankCanvas} alt='blank canvas' class='img-modal'></img>}
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

export default Daily;
