import React from 'react';
import Item from './TodoItem/Item';

const List = (props) => {
  return (
    <ul className="list-group">
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
    </ul>
  );
};

export default List;
