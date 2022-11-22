export default function listReducer(list, action) {
  switch (action.type) {
    case 'new': {
      return action.list
    }
    case 'submit': {
      let newList = [...list, { id: action.id, task: action.task, completed: false, time: 0, star: false }]

      // Update Local Storage
      localStorage.setItem('bounties', JSON.stringify(newList));
      return newList;
    }
    case 'checkbox': {
      let newList = list.map((item) => {
        if (action.id === item.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else return item;
      })
      // Update Local Storage
      localStorage.setItem('bounties', JSON.stringify(newList));
      return newList;
    }
    case 'delete': {
      let newList = list.filter(item=> item.id !== action.id)
      // Update Local Storage
      localStorage.setItem('bounties', JSON.stringify(newList));
      return newList;
    }
    case 'edit': {
      let newList = list.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            task: action.task
          }
        } else return item;
      })
      // Update Local Storage
      localStorage.setItem('bounties', JSON.stringify(newList));
      return newList;
    }
    case 'time': {
      let newList = list.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            time: item.time + action.time
          }
        } else return item;
      })
      // Update Local Storage
      localStorage.setItem('bounties', JSON.stringify(newList));
      return newList;
    }
    case 'star': {
      let newList = list.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            star: !item.star
          }
        } else if (item.star) {
          return {
            ...item,
            star: false
          }
        } else {
          return item
        }
      })
      // Update Local Storage
      localStorage.setItem('bounties', JSON.stringify(newList));
      return newList;
    }
    default: {
      throw Error('Unknown action ' + action.type)
    }
  }
}