import React, { useState } from 'react';
import { BarChart, Close } from '@mui/icons-material/';
import { Tooltip, Zoom } from '@mui/material/';
import './modals.css';
import timeFormat from '../../timeFormat';

const StatsModal = ({ history }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const days = history.size;

  let totalTime = 0;
  let totalBounty = 0;
  for (const [key, value] of history.entries()) {
    for (let task of value) {
      totalTime += task[1];
    }
    totalBounty += value.length;
  }

  const { hours, minutes, seconds } = timeFormat(totalTime);

  return (
    <div className="info-container">
      <Tooltip title="Stats" TransitionComponent={Zoom}>
        <BarChart className="modal-button" onClick={() => setModalOpen(true)} />
      </Tooltip>
      {modalOpen ? (
        <div className="modal-container" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1>Stats</h1>
            <div className="modal-divider"></div>
            <div className="modal-body">
              <div>
                All bounties that are cashed in are saved to the local storage
                of your web browser!
              </div>
              {history ? (
                <div>
                  <h3>
                    Average # of Bounties per day:{' '}
                    {days > 0 ? Math.round(totalBounty / days) : 0}
                  </h3>
                  <h3>
                    Average Time Spent per day:{' '}
                    {days > 0 ? Math.round(totalTime / 60 / days) : 0} minutes
                  </h3>
                  <h3># of Bounties Completed: {totalBounty}</h3>
                  <h3>
                    Total Time Spent:{' '}
                    {`${hours} hours, ${minutes} minutes, ${seconds} seconds`}
                  </h3>
                </div>
              ) : (
                <div>
                  <h3>No data available.</h3>
                  <h4>
                    <em>Submit and complete bounties to get started!</em>
                  </h4>
                </div>
              )}
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
