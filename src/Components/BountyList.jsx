import React, { useState } from 'react';

const BountyList = () => {
  const [form, setForm] = useState('');
  const [list, setList] = useState([]);

  const id = list.length;

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
      list.map((l) => {
        if (id === l.id) {
          return {
            ...l,
            completed: !l.completed,
          };
        }
      })
    );
  }

  let active = 0;
  list.forEach((item) => {
    if (item.completed) active++;
  });

  return (
    <div>
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
          <div key={item.id}>
            <label
              style={{ textDecoration: item.completed ? 'line-through' : null }}
            >
              <input type="checkbox" onChange={() => handleCheckBox(item.id)} />
              {item.task}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default BountyList;
