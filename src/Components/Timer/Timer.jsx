import React, { useState, useEffect } from 'react';
import timeFormat from '../timeFormat';
import './timer.css';

const Timer = ({ timeLeft, setTimeLeft, timeUsed, setTimeUsed }) => {
  const [timerOn, setTimerOn] = useState(false);
  const [edit, setEdit] = useState(false);

  const { hours, minutes, seconds } = timeFormat(timeLeft);

  const noTime = timeLeft <= 0 ? true : false;

  useEffect(() => {
    let interval;
    if (!noTime) {
      if (timerOn) {
        interval = setInterval(() => {
          setTimeLeft(timeLeft - 1);
          setTimeUsed(timeUsed + 1);
        }, 1000);
      } else {
        clearInterval(interval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft, setTimeLeft, timeUsed, setTimeUsed, timerOn, noTime]);

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
    <div className="timer-container">
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
