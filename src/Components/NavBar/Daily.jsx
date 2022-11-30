import React from 'react';
import { MonetizationOn, WorkspacePremium } from '@mui/icons-material/';

const Daily = () => {
  const pastHistory = localStorage.getItem('BountyHistory');
  const history = pastHistory ? new Map(JSON.parse(pastHistory)) : false;
  let dailyBounty = 0,
    dailyTime = 0;

  const todayDate = new Date().toString().slice(4, 15);
  console.log(history);
  console.log(todayDate);
  if (history.has(todayDate)) {
    console.log('historical');
    let dailyHistory = history.get(todayDate);
    dailyBounty = dailyHistory.bounties;
    dailyTime = Math.round(dailyHistory.time / 60);
  }

  return (
    <div>
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
