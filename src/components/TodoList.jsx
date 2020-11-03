import { useTrackedState } from '../store';
import React from 'react';
import Item from './TodoItem/Item';
import List from '@material-ui/core/List';

const TodoList = () => {
  const state = useTrackedState();

  return (
    <List className="list-group">
      {state.todos.map(({ id, title, alerm, isCompleted }) => {
        return (
          <Item key={id} id={id} title={title} alerm={alerm} isCompleted={isCompleted} />
        );
      })}
    </List>
  );
};

export default React.memo(TodoList);
