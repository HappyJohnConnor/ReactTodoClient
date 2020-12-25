import React, {useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import { Redirect } from 'react-router-dom';

import TodoListItem from './TodoListItem';
import store from '../../store';
import { setTodo } from '../../actions/todo';

import List from '@material-ui/core/List';

const TodoList = ({ todoIds }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(setTodo());
    } else {
      return <Redirect to='/login' />;
    }
  }, []);

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
