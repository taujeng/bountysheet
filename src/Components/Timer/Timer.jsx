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

  const handleSetTimer = (e) => {
    console.log(e.target.value);
    // Maximum is 24 hours
    if (e.target.value > 1440) {
      setTimeLeft(1440 * 60);
    } else {
      setTimeLeft(e.target.value * 60);
    }
  };

  return (
    <div>
      {edit ? (
        <input
          type="number"
          placeholder="minutes.."
          value={timeLeft / 60}
          onChange={handleSetTimer}
          min={0}
          max={1440}
          step={5}
        />
      ) : noTime ? (
        <div style={{ color: 'red' }}>00:00</div>
      ) : (
        <div>
          {hours}:{minutes}:{seconds}
        </div>
      )}
      <button onClick={() => setTimerOn(!timerOn)} disabled={edit}>
        {timerOn ? 'Stop' : 'Start'}
      </button>
      <button onClick={() => setEdit(!edit)}>{edit ? 'Save' : 'Set'}</button>
    </div>
  );
};

export default Timer;
