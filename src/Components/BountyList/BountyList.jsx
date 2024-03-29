import React, { useState, useReducer, useEffect } from 'react';
import Bounty from '../Bounty/Bounty';
import './bountyList.css';
import '../Bounty/bounty.css';
import Meter from '../Meter/Meter';
import listReducer from './listReducer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import emptyCart from '../../assets/images/empty_cart.svg'

let grabLocal = false;

const BountyList = ({ time }) => {
  const [list, dispatch] = useReducer(listReducer, []);

  const [form, setForm] = useState('');
  const [listId, setListId] = useState(1); // ea item in the list gets an id

  useEffect(() => {
    // Only run once when app loads
    if (!grabLocal) {
      grabLocal = true;
      const getLocalBounties = localStorage.getItem('bounties');
      const startingData = getLocalBounties
        ? JSON.parse(getLocalBounties.split(','))
        : [];

      // store localStorage bounties to list
      dispatch({
        type: 'new',
        list: startingData,
      });

      // Determine where listId should start so there's no duplicates
      let max = 0;
      for (let i of startingData) {
        max = Math.max(i.id, max);
      }
      setListId(max + 1);
    }
  },[]);

  let current = {},
    completedList = [],
    todoList = [];
  let finish = 0;
  for (let bounty of list) {
    if (bounty.star) {
      current = bounty;
    } else if (bounty.completed) {
      completedList.push(bounty);
    } else {
      todoList.push(bounty);
    }
    if (bounty.completed) finish++;
  }


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
    // Update Local Storage
    localStorage.setItem('bounties', JSON.stringify(list));
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

  function handleStar(id) {
    dispatch({
      type: 'star',
      id: id,
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
      {current.id ? (
        <Bounty
          key={current.id}
          item={current}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleStar={handleStar}
          current={true}
          handleTime={handleTime}
        />
      ) : (
        <></>
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
      {todoList.length > 0 ? todoList.map((item) => (
        <Bounty
          key={item.id}
          item={item}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleStar={handleStar}
          handleTime={handleTime}
        />
      )) : <img src={emptyCart} alt='empty cart' id="img-emptyCart"></img>}
      {completedList.map((item) => (
        <Bounty
          key={item.id}
          item={item}
          handleCheckBox={handleCheckBox}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleStar={handleStar}
          completed={true}
          handleTime={handleTime}
        />
      ))}
    </div>
  );
};

export default BountyList;
