import React, { useState } from 'react';
import { BarChart, Close, ContentCopy } from '@mui/icons-material/';
import './modals.css';
import timeFormat from '../../timeFormat';

const StatsModal = ({ history }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Values:

  const days = history.size;
  let totalTime = 0;
  let totalBounty = 0;
  for (const [key, value] of history.entries()) {
    totalTime += value.time;
    totalBounty += value.bounties;
  }

  // let days;
  // let totalTime = 0;
  // let totalBounty = 0;
  // if (history) {
  //   for (const [key, value] of history.entries()) {
  //     totalTime += value.time;
  //     totalBounty += value.bounties;
  //   }
  //   days = history.size;
  // }

  const { hours, minutes, seconds } = timeFormat(totalTime);

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
              {history ? (
                <div>
                  <h3>
                    Average # of Bounties per day:{' '}
                    {Math.round(totalBounty / days)}
                  </h3>
                  <h3>
                    Average Time Spent per day:{' '}
                    {Math.round(totalTime / 60 / days)} minutes
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
