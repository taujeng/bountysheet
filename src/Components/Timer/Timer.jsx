import React, { useState, useEffect } from 'react';
import timeFormat from '../timeFormat';
import './timer.css';

// timerTime is an object
const Timer = ({ timerTime, timerChange }) => {
  const [timerOn, setTimerOn] = useState(false);
  const [edit, setEdit] = useState(false);

  const { hours, minutes, seconds } = timeFormat(timerTime.timeLeft);
  const noTime = timerTime.timeLeft <= 0 ? true : false;

  useEffect(() => {
    let interval;
    if (timerOn && !noTime) {
      interval = setInterval(() => {
        console.log('This will run every second!');
        if (timerOn && !noTime) {
          timerChange({
            ...timerTime,
            timeLeft: timerTime.timeLeft - 1,
            timeUsed: timerTime.timeUsed + 1,
          });
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerTime, timerOn, noTime]);

  // on set, timeUsed also set back to 0
  const handleSetTimer = (e) => {
    console.log(e.target.value);
    // Maximum is 24 hours
    if (e.target.value > 1440) {
      timerChange({ ...timerTime, timeLeft: 1440 * 60, timeUsed: 0 });
    } else {
      timerChange({ ...timerTime, timeLeft: e.target.value * 60, timeUsed: 0 });
    }
    setTimerOn(false);
  };

  return (
    <div className="timer-container">
      {edit ? (
        <input
          type="number"
          placeholder="minutes.."
          value={timerTime.timeLeft / 60}
          onChange={handleSetTimer}
          min={0}
          max={1440}
          step={5}
        />
      ) : noTime ? (
        <div style={{ color: 'red' }}>00:00:00</div>
      ) : (
        <div>
          {hours}:{minutes}:{seconds}
        </div>
      )}
      <div className="button-container">
        <button onClick={() => setTimerOn(!timerOn)} disabled={edit}>
          {timerOn ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => setEdit(!edit)}>{edit ? 'Save' : 'Set'}</button>
      </div>
    </div>
  );
};

export default Timer;
