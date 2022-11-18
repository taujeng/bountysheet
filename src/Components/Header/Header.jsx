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

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date(), 1000));

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="header-container">
      <header>
        <Clock value={clock} size={200} />
        <h1 id="title">Bounty Sheet</h1>
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
                setTimePassed={setTimePassed}
              />
            )}
          </>
          <AutorenewIcon
            style={{ fontSize: '40px' }}
            onClick={() => setDisplayTimer(!displayTimer)}
          />
        </div>

        {/* <button onClick={() => setDisplayTimer(!displayTimer)}>Switch</button> */}
      </header>
      <BountyList time={time} />
    </div>
  );
};

export default Header;
