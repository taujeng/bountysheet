import React, { useState } from 'react';
import timeFormat from '../timeFormat';
import './bounty.css';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

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
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);

  const { hours, minutes, seconds } = timeFormat(item.time);

  return (
    <div
      className={current ? 'current-container' : 'bounty-container'}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={completed ? { backgroundColor: '#95bb72' } : null}
    >
      {hover ? (
        <DoubleArrowIcon
          id="double-arrow"
          onClick={() => setCurrentBounty(current ? '' : item.id)}
        />
      ) : null}
      <div className="bounty">
        {/* <button onClick={() => setCurrentBounty(current ? '' : item.id)}>
            →
          </button> */}
        {current ? (
          <button onClick={() => handleTime(item.id)}>Save Time</button>
        ) : null}
        <div className="bounty-time">
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
  );
};

export default Bounty;
