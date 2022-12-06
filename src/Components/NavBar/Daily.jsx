import React from 'react';
import { MonetizationOn, WorkspacePremium } from '@mui/icons-material/';
import './daily.css'

const Daily = ({history}) => {
  let dailyBounty = 0,
    dailyTime = 0;

  const todayDate = new Date().toString().slice(4, 15);
  if (history.has(todayDate)) {
    let dailyHistory = history.get(todayDate);
    dailyBounty = dailyHistory.bounties;
    dailyTime = Math.round(dailyHistory.time / 60);
  }

  return (
    <div className="daily-container">
      <div className="daily-bounty">
        <WorkspacePremium />
        {dailyBounty}
      </div>
      <div className="daily-time">
        <MonetizationOn />
        {dailyTime}
      </div>
    </div>
  );
};

export default Daily;
