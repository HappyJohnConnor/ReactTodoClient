/*
https://redux.js.org/tutorials/fundamentals/part-5-ui-react
*/

const initialState = [
  {
    id: 1,
    title: 'Wash dishes',
    body: '',
    alerm: '',
    completed: false,
  },
  {
    id: 2,
    title: 'Study JS',
    body: '',
    alerm: '',
    completed: false,
  },
  {
    id: 3,
    title: 'Buy ticket',
    body: '',
    alerm: '',
    completed: false,
  },
];

function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
  return maxId + 1;
}

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
  case 'ADD_TODO': {
    // Can return just the new todos array - no extra object around it
    return [
      ...state,
      {
        id: nextTodoId(state),
        title: action.title,
        alerm: '',
        completed: false,
      },
    ];
  }
  case 'TOGGLE_TODO': {
    return state.map((todo) => {
      if (todo.id !== action.id) {
        return todo;
      }

      return {
        ...todo,
        completed: !todo.completed,
      };
    });
  }
  case 'DELETE_TODO': {
    return state.filter((todo) => todo.id !== action.id);
  }
  case 'EDIT_TODO': {
    return state.map((todo) => {
      if (todo.id !== action.id) {
        return todo;
      }

      return {
        ...todo,
        title: action.title,
      };
    });
  }
  default:
    return state;
  }
}
