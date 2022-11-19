import React, { useState } from 'react';
import timeFormat from '../timeFormat';
import './bounty.css';
import {
  Edit,
  Delete,
  Alarm,
  CheckBox,
  CheckBoxOutlineBlank,
  StarBorder,
  Star,
} from '@mui/icons-material/';

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

  if (completed && current) setCurrentBounty(0);

  return (
    <div
      className="bounty-outer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {current ? (
        <Star
          className="bounty-button"
          onClick={() => setCurrentBounty(current ? '' : item.id)}
        />
      ) : (
        <StarBorder
          className="bounty-button"
          style={hover ? { display: 'inline' } : { display: 'none' }}
          onClick={() => setCurrentBounty(current ? '' : item.id)}
        />
      )}
      <div
        className={current ? 'current-container' : 'bounty-container'}
        style={completed ? { backgroundColor: '#95bb72' } : null}
      >
        <div className="bounty">
          {current ? (
            <Alarm
              className="bounty-button"
              onClick={() => handleTime(item.id)}
            >
              Save Time
            </Alarm>
          ) : null}
          <div className="bounty-time">
            {hours}:{minutes}:{seconds}
          </div>
          {item.completed ? (
            <CheckBox
              className="bounty-button"
              onClick={() => handleCheckBox(item.id)}
            />
          ) : (
            <CheckBoxOutlineBlank
              className="bounty-button"
              onClick={() => handleCheckBox(item.id)}
            />
          )}
          <div className="bounty-task">
            {edit ? (
              <textarea
                className="bounty-edit"
                value={item.task}
                onChange={(e) => handleEdit(item.id, e.target.value)}
              />
            ) : (
              <div
                className="bounty-edit"
                style={{
                  textDecoration: item.completed ? 'line-through' : null,
                }}
              >
                {item.task}
              </div>
            )}
          </div>
        </div>
        <div className="button-container">
          <Edit className="bounty-button" onClick={() => setEdit(!edit)}>
            {!edit ? 'Edit' : 'Save'}
          </Edit>
          <Delete
            className="bounty-button"
            onClick={() => handleDelete(item.id)}
          >
            Remove
          </Delete>
        </div>
      </div>
    </div>
  );
};

export default Bounty;
