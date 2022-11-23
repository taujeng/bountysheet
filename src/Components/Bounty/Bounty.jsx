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
  LocalAtm,
} from '@mui/icons-material/';

const Bounty = ({
  item,
  handleCheckBox,
  handleDelete,
  handleEdit,
  handleStar,
  current = false,
  handleTime,
}) => {
  const [edit, setEdit] = useState(false);
  const [hover, setHover] = useState(false);

  const { hours, minutes, seconds } = timeFormat(item.time);

  function handleCash() {
    handleDelete(item.id);

    const finishDate = Date().slice(4, 15);

    const pastHistory = localStorage.getItem('BountyHistory');
    const newHistory = pastHistory
      ? new Map(JSON.parse(pastHistory))
      : new Map();
    if (newHistory.has(finishDate)) {
      let oldValue = newHistory.get(finishDate);
      newHistory.set(finishDate, {
        ...oldValue,
        //    grabs old value, adds new value
        time: oldValue.time + item.time,
        bounties: oldValue.bounties + 1,
      });
    } else {
      newHistory.set(finishDate, {
        time: item.time,
        bounties: 1,
      });
    }
    localStorage.setItem('BountyHistory', JSON.stringify([...newHistory]));
  }

  return (
    <div
      className="bounty-outer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {current ? (
        <Star
          className="bounty-button current-star"
          // style={hover ? { display: 'inline' } : { display: 'none' }}
          onClick={() => handleStar(item.id)}
        />
      ) : (
        <StarBorder
          className="bounty-button star"
          style={hover ? { display: 'inline' } : { display: 'none' }}
          onClick={() => handleStar(item.id)}
        />
      )}
      <div
        className={current ? 'current-container' : 'bounty-container'}
        style={item.completed ? { backgroundColor: '#95bb72' } : null}
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
          {item.completed ? (
            <LocalAtm className="bounty-button" onClick={handleCash} />
          ) : (
            <Delete
              className="bounty-button"
              onClick={() => handleDelete(item.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Bounty;
