import {
  SET_TODO,
  ADD_TODO,
  TOGGLE_TODO,
  DELETE_TODO,
  EDIT_TODO,
} from '../actions/types';

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

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
  case SET_TODO:
    return [ ...payload ];
  case ADD_TODO:
    console.log(payload);
    // Can return just the new todos array - no extra object around it
    return [
      ...state,
      {
        id: nextTodoId(state),
        title: payload,
        alerm: '',
        completed: false,
      },
    ];

  case TOGGLE_TODO:
    return state.map((todo) => {
      if (todo.id !== payload.id) {
        return todo;
      }
      return {
        ...todo,
        alerm: payload.alerm,
        completed: !todo.completed,
      };
    });

  case DELETE_TODO:
    return state.filter((todo) => todo.id !== payload);

  case EDIT_TODO:
    return state.map((todo) => {
      if (todo.id !== payload.id) {
        return todo;
      }
      return {
        ...todo,
        title: payload.title,
      };
    });

  default:
    return state;
  }
}
