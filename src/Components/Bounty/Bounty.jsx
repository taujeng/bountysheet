import React, { useState } from 'react';
import timeFormat from '../timeFormat';
import './bounty.css';

const Bounty = ({
  item,
  handleCheckBox,
  handleDelete,
  handleEdit,
  setCurrentBounty,
  completed = false,
  current = false,
  handleTime,
}) => {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);

  const { hours, minutes, seconds } = timeFormat(item.time);

  return (
    <>
      <div
        className={current ? 'current-container' : 'bounty-container'}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={
          completed
            ? {
                border: hover ? 'red 2px solid' : null,
                backgroundColor: '#95bb72',
              }
            : { border: hover ? 'black 1px solid' : null }
        }
      >
        <div className="bounty">
          <button onClick={() => setCurrentBounty(current ? '' : item.id)}>
            →
          </button>
          {current ? (
            <button onClick={() => handleTime(item.id)}>Save Time</button>
          ) : null}
          <div>
            {hours}:{minutes}:{seconds}
          </div>

          <label
            style={{ textDecoration: item.completed ? 'line-through' : null }}
          >
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => handleCheckBox(item.id)}
            />
            {edit ? (
              <input
                value={item.task}
                onChange={(e) => handleEdit(item.id, e.target.value)}
              />
            ) : (
              item.task
            )}
          </label>
        </div>
        <div className="button-container">
          <button onClick={() => setEdit(!edit)}>
            {!edit ? 'Edit' : 'Save'}
          </button>
          <button onClick={() => handleDelete(item.id)}>Remove</button>
        </div>
      </div>
    </>
  );
};

export default Bounty;
