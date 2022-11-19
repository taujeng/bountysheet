import React, { useState } from 'react';
import timeFormat from '../timeFormat';
import './bounty.css';
import { DoubleArrow, Edit, Delete, Alarm } from '@mui/icons-material/';

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
        <DoubleArrow
          id="double-arrow"
          onClick={() => setCurrentBounty(current ? '' : item.id)}
        />
      ) : null}
      <div className="bounty">
        {current ? (
          <Alarm className="bounty-button" onClick={() => handleTime(item.id)}>
            Save Time
          </Alarm>
        ) : null}
        <div className="bounty-time">
          {hours}:{minutes}:{seconds}
        </div>
        <label
          style={{ textDecoration: item.completed ? 'line-through' : null }}
        >
          <input
            style={{ height: '30px', width: '30px' }}
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
        <Edit className="bounty-button" onClick={() => setEdit(!edit)}>
          {!edit ? 'Edit' : 'Save'}
        </Edit>
        <Delete className="bounty-button" onClick={() => handleDelete(item.id)}>
          Remove
        </Delete>
      </div>
    </div>
  );
};

export default Bounty;
