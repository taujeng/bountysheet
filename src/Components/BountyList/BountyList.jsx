import React, { useState, useReducer } from 'react';
import Bounty from '../Bounty/Bounty'
import './bountyList.css'
import listReducer from './listReducer';

const BountyList = ( {time} ) => {
  const [list, dispatch] = useReducer(listReducer, [])

  const [form, setForm] = useState('');
  const [listId, setListId] = useState(0) // ea item in the list gets an id
  const [currentBounty, setCurrentBounty] = useState(); // contains id

  // const id = list.length;  -> doesn't work once you add the remove function

  // let active = 0;
  // list.forEach((item) => {
  //   if (item.completed) active++;
  // });
  // console.log(list)

  // current Bounty info:
  let current = list.filter(item => item.id === currentBounty)

  let sideBounty = list.filter(item => item.id !== currentBounty)
  let todoList = sideBounty.filter(item => !item.completed)
  let completedList = sideBounty.filter(item=> item.completed)
  let active = completedList.length;

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

  function handleTime(id) {
    dispatch({
      type: 'time',
      id: id,
      time: time
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
      {current[0] ? 
        <Bounty key={current[0].id} item={current[0]} handleCheckBox={handleCheckBox} 
            handleDelete={handleDelete} handleEdit={handleEdit} setCurrentBounty={setCurrentBounty}
            current={true} handleTime={handleTime}
          />
        : <h1>Click the arrow to feature a bounty.</h1>
      }
      <h1>
        Bounties Remaining: {active}/{list.length}
      </h1>
      {todoList.map((item) => (
        <Bounty key={item.id} item={item} handleCheckBox={handleCheckBox} 
          handleDelete={handleDelete} handleEdit={handleEdit} setCurrentBounty={setCurrentBounty}
          handleTime={handleTime}
        />
      ))}
      {completedList.map((item) => (
        <Bounty key={item.id} item={item} handleCheckBox={handleCheckBox} 
          handleDelete={handleDelete} handleEdit={handleEdit}
          setCurrentBounty={setCurrentBounty}
          completed = {true} handleTime={handleTime}
        />
      ))}

    </div>
  );
};

export default BountyList;
