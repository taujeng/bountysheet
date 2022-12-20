import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';
import Stopwatch from '../Stopwatch/Stopwatch';
import Timer from '../Timer/Timer';
import 'react-clock/dist/Clock.css';
import './header.css';
import BountyList from '../BountyList/BountyList';
import { Close, Autorenew, SmartToy } from '@mui/icons-material/';
import { Tooltip, Zoom } from '@mui/material/';
import ChatGPT from '../chatGPT/ChatGPT';

const Header = () => {
  const [clock, setClock] = useState(new Date());
  const [displayTimer, setDisplayTimer] = useState(false);
  const [timePassed, setTimePassed] = useState(0); // Time from Stopwatch
  const [timerTime, setTimerTime] = useState({ timeLeft: 600, timeUsed: 0 });
  const [showChatGPT, setShowChatGPT] = useState(true);

  let time = displayTimer ? timerTime.timeUsed : timePassed;

  const localData = localStorage.getItem('BountyTime');
  const localTime = localData ? new Map(JSON.parse(localData)) : false;

  useEffect(() => {
    const interval = setInterval(() => setClock(new Date(), 1000));

    // Check if local storage has a Bounty Time saved
    if (localTime) {
      setTimePassed(localTime.get('stopwatch'));
      setTimerTime({
        timeLeft: localTime.get('timer').timeLeft,
        timeUsed: localTime.get('timer').timeUsed,
      });
      setDisplayTimer(localTime.get('displayTimer'));
    } else {
      // if first time, set initial Local Storage "BountyTime"
      let newTime = new Map([
        ['stopwatch', 0],
        [
          'timer',
          {
            timeLeft: 600,
            timeUsed: 0,
          },
        ],
        ['displayTimer', false],
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
    localTime.set('stopwatch', reset ? 0 : time);
    localStorage.setItem('BountyTime', JSON.stringify([...localTime]));
  }

  // Handle Timer Changes. time is an object
  function timerChange(time) {
    console.log('made it to timerChange', time);
    setTimerTime(time);
    localTime.set('timer', time);
    localStorage.setItem('BountyTime', JSON.stringify([...localTime]));
  }

  // Handle Switching between Stopwatch and Timer
  function handleSwitch() {
    setDisplayTimer(!displayTimer);
    localTime.set('displayTimer', !displayTimer);
    localStorage.setItem('BountyTime', JSON.stringify([...localTime]));
  }

  return (
    <div className="header-container">
      <header>
        <div className="clock-container">
          <Clock value={clock} size={200} />
        </div>
        <div className="title-container">
          <div id="title">
            Bounty <br></br>Sheet
          </div>
          {/* <h2>Time is money. Spend it wisely.</h2> */}
        </div>
        <div className="time-container">
          <>
            {displayTimer ? (
              <Timer timerTime={timerTime} timerChange={timerChange} />
            ) : (
              <Stopwatch
                timePassed={timePassed}
                stopwatchChange={stopwatchChange}
              />
            )}
          </>
          <Tooltip title={`Switch to ${displayTimer ? "Stopwatch" : "Timer"}`}>
            <Autorenew
              id="time-swap"
              style={{ fontSize: '40px' }}
              onClick={handleSwitch}
            />
          </Tooltip>

        </div>
      </header>
      {showChatGPT ? <><ChatGPT setShowChatGPT={setShowChatGPT}/> </>
       : <SmartToy className="chatGPT-button" onClick={()=>setShowChatGPT(true)} />  }
      
      <BountyList time={time} />
    </div>
  );
};

export default Header;
