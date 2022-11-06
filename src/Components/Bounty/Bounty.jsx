import React, { useState } from 'react';
import './bounty.css';

const Bounty = ({ item, handleCheckBox, handleDelete }) => {
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
        {/* <label
          style={{ textDecoration: item.completed ? 'line-through' : null }}
        >
          <input type="checkbox" onClick={() => handleCheckBox(item.id)} />
          {item.task}
        </label> */}
        {!edit ? (
          <label
            style={{ textDecoration: item.completed ? 'line-through' : null }}
          >
            <input type="checkbox" onClick={() => handleCheckBox(item.id)} />
            {item.task}
          </label>
        ) : (
          <h1>edit time</h1>
        )}
        <button onClick={() => setEdit(!edit)}>
          {!edit ? 'Edit' : 'Save'}
        </button>
        <button onClick={() => handleDelete(item.id)}>Remove</button>
      </div>
    </>
  );
};

export default Bounty;
