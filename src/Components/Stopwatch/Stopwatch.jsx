import React, { useState, useEffect } from 'react';
import timeFormat from '../timeFormat';

const Stopwatch = ({ timePassed, setTimePassed }) => {
  const [stopWatchOn, setStopWatchOn] = useState(false);

  let { hours, minutes, seconds } = timeFormat(timePassed);

  useEffect(() => {
    let interval;
    if (stopWatchOn) {
      interval = setInterval(() => setTimePassed(timePassed + 1), 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timePassed, stopWatchOn]);

  return (
    <div className="stopwatch-container">
      <h1>
        {hours}:{minutes}:{seconds}
      </h1>
      <button onClick={() => setStopWatchOn(!stopWatchOn)}>
        {stopWatchOn ? 'Stop' : 'Start'}
      </button>
      <button
        onClick={() => {
          setTimePassed(0);
          setStopWatchOn(false);
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;