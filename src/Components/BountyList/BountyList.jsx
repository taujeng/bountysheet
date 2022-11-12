import React, { useState, useReducer } from 'react';
import Bounty from '../Bounty/Bounty'
import './bountyList.css'
import listReducer from './listReducer';

const BountyList = () => {
  const [list, dispatch] = useReducer(listReducer, [])

  const [form, setForm] = useState('');
  const [listId, setListId] = useState(0)

  // const id = list.length;  -> doesn't work once you add the remove function

  let active = 0;
  list.forEach((item) => {
    if (item.completed) active++;
  });
  console.log(list)

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: 'submit',
      id: listId,
      task: form
    })
    setForm('');
    setListId(listId + 1)
  }
  function handleChange(e) {
    setForm(e.target.value);
  }
  function handleCheckBox(id) {
    dispatch({
      type: 'checkbox',
      id: id
    })
  }
  function handleDelete(id) {
    dispatch({
      type: 'delete',
      id: id
    })
  }
  function handleEdit(id, task) {
    dispatch({
      type: 'edit',
      id: id,
      task: task
    })
  }



  return (
    <div className="bountyList-container">
      <header>Bounty List</header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="What's your next bounty?"
          value={form}
          onChange={handleChange}
        />
        <button type="submit">Submit Bounty</button>
      </form>
      <h1>
        Bounties Remaining: {active}/{list.length}
      </h1>
      <ul>
        {list.map((item) => (
          <Bounty key={item.id} item={item} handleCheckBox={handleCheckBox} 
            handleDelete={handleDelete} handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default BountyList;
