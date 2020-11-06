import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Provider } from 'react-redux';

import TodoListItem from './TodoListItem';
import store from '../../../store';
import List from '@material-ui/core/List';

const selectTodoIds = (state) => state.todos.map((todo) => todo.id);

const TodoList = () => {
  const todoIds = useSelector(selectTodoIds, shallowEqual);

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return (
    <Provider store={store}>
      <List className="list-group">{renderedListItems}</List>
    </Provider>
  );
};

export default React.memo(TodoList);
