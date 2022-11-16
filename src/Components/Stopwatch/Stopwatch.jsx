import React, { useState, useEffect } from 'react';
import TimeFormat from '../timeFormat/TimeFormat';

const Stopwatch = () => {
  const [timePassed, setTimePassed] = useState(0);
  const [stopWatchOn, setStopWatchOn] = useState(false);

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
        Stopwatch: <TimeFormat time={timePassed} />
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
