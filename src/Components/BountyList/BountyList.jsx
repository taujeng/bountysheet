import React, { useState, useReducer } from 'react';
import Bounty from '../Bounty/Bounty';
import './bountyList.css';
import '../Bounty/bounty.css';
import Meter from '../Meter/Meter';
import listReducer from './listReducer';
import AddBoxIcon from '@mui/icons-material/AddBox';

const BountyList = ({ time }) => {
  const [list, dispatch] = useReducer(listReducer, []);

  const [form, setForm] = useState('');
  const [listId, setListId] = useState(1); // ea item in the list gets an id
  const [currentBounty, setCurrentBounty] = useState(0); // contains id

  // const id = list.length;  -> doesn't work once you add the remove function

  // let finish = 0;
  // list.forEach((item) => {
  //   if (item.completed) finish++;
  // });
  // console.log(list)

  // current bounty info: *@array
  let current = list.filter((item) => item.id === currentBounty);
  // remaining bounties:
  let sideBounty = list.filter((item) => item.id !== currentBounty);
  // incomplete bounties:
  let todoList = sideBounty.filter((item) => !item.completed);
  // completed bounties:
  let completedList = sideBounty.filter((item) => item.completed);
  // # of completed bounties
  let finish = list.filter((item) => item.completed).length;

  function handleSubmit(e) {
    e.preventDefault();
    if (form === '') return;
    dispatch({
      type: 'submit',
      id: listId,
      task: form,
    });
    setForm('');
    setListId(listId + 1);
  }
  function handleChange(e) {
    setForm(e.target.value);
  }
  function handleCheckBox(id) {
    dispatch({
      type: 'checkbox',
      id: id,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: 'delete',
      id: id,
    });
  }
  function handleEdit(id, task) {
    dispatch({
      type: 'edit',
      id: id,
      task: task,
    });
  }

  function handleTime(id) {
    dispatch({
      type: 'time',
      id: id,
      time: time,
    });
  }

  return (
    <div className="bountyList-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Submit a bounty.."
          value={form}
          onChange={handleChange}
        />
        <button type="submit">
          <AddBoxIcon style={{ fontSize: '50px' }} />
        </button>
      </form>
      {current[0] ? (
        <Bounty
          key={current[0].id}
          item={current[0]}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          setCurrentBounty={setCurrentBounty}
          current={true}
          handleTime={handleTime}
        />
      ) : (
        <div className="current-container example">
          <em>Example: Walk the dog.</em>
        </div>
      )}
      <div className="meter-container">
        <h1>
          {finish}/{list.length}
        </h1>
        <Meter percent={finish / list.length} animate={true} />
        <h1>
          {Math.round((finish / (list.length ? list.length : 1)) * 100).toFixed(
            0
          ) + '%'}
        </h1>
      </div>
      {todoList.map((item) => (
        <Bounty
          key={item.id}
          item={item}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          setCurrentBounty={setCurrentBounty}
          handleTime={handleTime}
        />
      ))}
      {completedList.map((item) => (
        <Bounty
          key={item.id}
          item={item}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          setCurrentBounty={setCurrentBounty}
          completed={true}
          handleTime={handleTime}
        />
      ))}
    </div>
  );
};

export default BountyList;
