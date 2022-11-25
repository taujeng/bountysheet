import React, { useState, useEffect } from 'react';
import timeFormat from '../timeFormat';
import './timer.css';

// timerTime is an object
const Timer = ({ timeLeft, timeUsed, handleTimeLeft, handleTimeUsed }) => {
  const [timerOn, setTimerOn] = useState(false);
  const [edit, setEdit] = useState(false);

  const { hours, minutes, seconds } = timeFormat(timeLeft);
  const noTime = timeLeft <= 0 ? true : false;

  // useEffect(() => {
  //   let interval;
  //   if (!noTime) {
  //     if (timerOn) {
  //       interval = setInterval(() => {
  //         handleTimeLeft(timeLeft - 1);
  //         // handleTimeUsed(timeUsed + 1);
  //       }, 1000);
  //     } else {
  //       clearInterval(interval);
  //     }
  //   }

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [timerOn, noTime, handleTimeLeft, handleTimeUsed, timeLeft, timeUsed]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
  //     if (timerOn && !noTime) {
  //       handleTimeLeft(timeLeft - 1);
  //       handleTimeUsed(timeUsed + 1);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [timerOn, timeLeft, timeUsed, noTime]);

  useEffect(() => {
    let interval;
    if (timerOn && !noTime) {
      interval = setInterval(() => {
        console.log('This will run every second!');
        if (timerOn && !noTime) {
          handleTimeLeft(timeLeft - 1);
          handleTimeUsed(timeUsed + 1);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerOn, timeLeft, timeUsed, noTime]);

  const handleSetTimer = (e) => {
    console.log(e.target.value);
    // Maximum is 24 hours
    if (e.target.value > 1440) {
      handleTimeLeft(1440 * 60);
    } else {
      handleTimeLeft(e.target.value * 60);
    }
    setTimerOn(false);
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
