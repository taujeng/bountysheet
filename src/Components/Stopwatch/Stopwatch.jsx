import React, { useState, useEffect } from 'react';
import timeFormat from '../timeFormat';
import './stopwatch.css';

const Stopwatch = ({ timePassed, stopwatchChange }) => {
  const [stopWatchOn, setStopWatchOn] = useState(false);

  let { hours, minutes, seconds } = timeFormat(timePassed);

  // On most browsers inactive tabs have low priority execution and this can affect JavaScript timers.
  // "use the Date object instead of fixed increments to calculate the time that has passed since the beginning, which will work even if you are out from the application's tab"
  // https://stackoverflow.com/questions/5927284/how-can-i-make-setinterval-also-work-when-a-tab-is-inactive-in-chrome

  useEffect(() => {
    let interval;
    let initialTime = new Date().getTime();
    if (stopWatchOn) {
      interval = setInterval(() => {
        let now = new Date().getTime();
        let actualTime = Math.round((now - initialTime) / 1000);
        stopwatchChange(timePassed + actualTime);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timePassed, stopWatchOn]);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-title">Stopwatch</div>
      <div id="stopwatch">
        {hours}:{minutes}:{seconds}
      </div>
      <div className="button-container">
        <button onClick={() => setStopWatchOn(!stopWatchOn)}>
          {stopWatchOn ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={() => {
            stopwatchChange(0, true);
            setStopWatchOn(false);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
