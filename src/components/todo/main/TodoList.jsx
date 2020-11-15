import React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';

import TodoListItem from './TodoListItem';
import store from '../../../store';

import List from '@material-ui/core/List';

const TodoList = ({ todoIds }) => {
  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />;
  });

  return (
    <Provider store={store}>
      <List className="list-group">{renderedListItems}</List>
    </Provider>
  );
};

const mapStatetoProps = (state) => {
  return {
    todoIds: state.todo.map((todo) => todo.id),
  };
};
export default connect(mapStatetoProps, null)(TodoList);
