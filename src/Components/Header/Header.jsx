import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';
import Stopwatch from '../Stopwatch/Stopwatch';
import Timer from '../Timer/Timer';
import 'react-clock/dist/Clock.css';
import './header.css';
import BountyList from '../BountyList/BountyList';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const Header = () => {
  const [clock, setClock] = useState(new Date());
  const [displayTimer, setDisplayTimer] = useState(false);
  const [timePassed, setTimePassed] = useState(0); // Time from Stopwatch
  const [timeLeft, setTimeLeft] = useState(600); // Time displaying on Timer
  const [timeUsed, setTimeUsed] = useState(0); // Time used from Timer

  let time = displayTimer ? timeUsed : timePassed;

  const localData = localStorage.getItem('BountyTime');
  const localTime = localData ? new Map(JSON.parse(localData)) : false;

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date(), 1000));

    // Check if local storage has a Bounty Time saved
    if (localTime) {
      setTimePassed(localTime.get('stopwatch'));
      setTimeLeft(localTime.get('timer').timeLeft);
      setTimeUsed(localTime.get('timer').timeUsed);
    } else {
      // if first time, set initial Local Storage "BountyTime"
      let newTime = new Map([
        ['stopwatch', 0],
        [
          'timer',
          [
            ['timeLeft', 600],
            ['timeUsed', 0],
          ],
        ],
      ]);
      localStorage.setItem('BountyTime', JSON.stringify([...newTime]));
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  // Handle StopWatch Changes
  function stopwatchChange(time, reset = false) {
    setTimePassed(time);
    // Update Local Storage Time:
    localTime.set('stopwatch', reset ? 0 : localTime.get('stopwatch') + 1);
    localStorage.setItem('BountyTime', JSON.stringify([...localTime]));
  }

  return (
    <div className="header-container">
      <header>
        <div className="clock-container">
          <Clock value={clock} size={200} />
        </div>
        <div className="title-container">
          <h1 id="title">
            Bounty <br></br>Sheet
          </h1>
          {/* <h2>Time is money. Spend it wisely.</h2> */}
        </div>
        <div className="time-container">
          <>
            {displayTimer ? (
              <Timer
                timeLeft={timeLeft}
                setTimeLeft={setTimeLeft}
                timeUsed={timeUsed}
                setTimeUsed={setTimeUsed}
              />
            ) : (
              <Stopwatch
                timePassed={timePassed}
                stopwatchChange={stopwatchChange}
              />
            )}
          </>
          <AutorenewIcon
            style={{ fontSize: '40px' }}
            onClick={() => setDisplayTimer(!displayTimer)}
          />
        </div>
      </header>
      <BountyList time={time} />
    </div>
  );
};

export default Header;
