import React from 'react';
import Item from './TodoItem/Item';
import List from '@material-ui/core/List';

const TodoList = (props) => {
  return (
    <List className="list-group">
      {props.todos.map((todo, index) => {
        return (
          <Item
            key={index}
            item={todo}
            remove={props.removeTodo}
            edit={props.editTodo}
            setTodoAlerm={props.setTodoAlerm}
          />
        );
      })}
    </List>
  );
};

export default TodoList;
