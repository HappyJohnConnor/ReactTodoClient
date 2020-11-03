import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

const initialState = {
  todos: [
    {
      id: 1,
      title: 'Wash dishes',
      body: '',
      alerm: '',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Study JS',
      body: '',
      alerm: '',
      isCompleted: false,
    },
    {
      id: 3,
      title: 'Buy ticket',
      body: '',
      alerm: '',
      isCompleted: false,
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
          title: action.text,
          alerm: '',
          isCompleted: false,
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
      todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, title: action.text } : todo)),
    };
  case 'TOGGLE_DONE':
    return {
      ...state,
      todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, isCompleted: !todo.isCompleted } : todo)),
    };
  case 'SET_ALERM':
    return {
      ...state,
      todos: state.todos.map((todo) => (todo.id === action.id ? { ...todo, alerm: action.time } : todo)),
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
