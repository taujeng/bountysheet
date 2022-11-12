import React, { useState } from 'react';
import './bounty.css';

const Bounty = ({ item, handleCheckBox, handleDelete, handleEdit }) => {
  const [hover, setHover] = useState(false);
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div
        className="bounty-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ border: hover ? 'black 1px solid' : null }}
      >
        <div className="bounty">
          <label
            style={{ textDecoration: item.completed ? 'line-through' : null }}
          >
            <input type="checkbox" onClick={() => handleCheckBox(item.id)} />
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
