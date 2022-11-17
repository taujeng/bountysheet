export default function listReducer(list, action) {
  switch (action.type) {
    case 'submit': {
      return [...list, { id: action.id, task: action.task, completed: false, time: 0 }]
    }
    case 'checkbox': {
      return list.map((item) => {
        if (action.id === item.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        } else return item;
      })
    }
    case 'delete': {
      return list.filter(item=> item.id !== action.id)
    }
    case 'edit': {
      return list.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            task: action.task
          }
        } else return item
      })
    }
    default: {
      throw Error('Unknown action ' + action.type)
    }
  }
}