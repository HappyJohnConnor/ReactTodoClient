import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
  todos: [
    {
      id: 1,
      text: 'Wash dishes',
      time: '',
      isDone: false,
    },
    {
      id: 2,
      text: 'Study JS',
      time: '',
      isDone: false,
    },
    {
      id: 3,
      text: 'Buy ticket',
      time: '',
      isDone: false,
    },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
  case 'ADD_TODO':
    return {
      ...state,
      todos: [
        ...state.todos,
        {
          id: new Date().getTime(),
          text: action.text,
          time: '',
          isDone: false,
        },
      ],
    };
  case 'DELETE_TODO':
    return {
      ...state,
      todos: state.todos.filter((todo) => todo.id !== action.id),
    };
  case 'EDIT_TODO':
    return {
      ...state,
      todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, text: action.text } : todo)),
    };
  case 'TOGGLE_DONE':
    return {
      ...state,
      todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo)),
    };
  case 'SET_ALERM':
    return {
      ...state,
      todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, time: action.time } : todo)),
    };
  default:
    return state;
  }
};

const useValue = () => useReducer(reducer, initialState);

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue);
