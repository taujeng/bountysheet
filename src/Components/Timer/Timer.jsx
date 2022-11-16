import React, { useState, useEffect } from 'react';
import timeFormat from '../timeFormat';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [timerOn, setTimerOn] = useState(false);
  const [edit, setEdit] = useState(false);

  const noTime = timeLeft <= 0 ? true : false;

  const { hours, minutes, seconds } = timeFormat(timeLeft);

  useEffect(() => {
    let interval;
    if (!noTime) {
      if (timerOn) {
        interval = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      } else {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, timerOn, noTime]);

  return (
    <div>
      {noTime ? (
        <div style={{ color: 'red' }}>00:00</div>
      ) : (
        <div>
          {hours}:{minutes}:{seconds}
        </div>
      )}
      <button onClick={() => setTimerOn(!timerOn)}>
        {timerOn ? 'Stop' : 'Start'}
      </button>
      <button>Set</button>
    </div>
  );
};

export default Timer;
