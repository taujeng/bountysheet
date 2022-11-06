import React, { useState } from 'react';
import Bounty from '../Bounty/Bounty'
import './bountyList.css'

const BountyList = () => {
  const [form, setForm] = useState('');
  const [list, setList] = useState([]);

  const id = list.length;
  let active = 0;
  list.forEach((item) => {
    if (item.completed) active++;
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('something was sent');
    setList([...list, { id: id, task: form, completed: false }]);
    setForm('');
    console.log(list);
  }
  function handleChange(e) {
    setForm(e.target.value);
  }
  function handleCheckBox(id) {
    setList(
      list.map((item) => {
        if (id === item.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else return item;
      })
    );
  }
  function handleDelete(id) {
    setList(
      list.filter(item=> item.id !== id)
    )
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
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
};

export default BountyList;
