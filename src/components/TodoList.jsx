import { useTrackedState } from '../store';
import React from 'react';
import Item from './TodoItem/Item';
import List from '@material-ui/core/List';

const TodoList = () => {
  const state = useTrackedState();

  return (
    <List className="list-group">
      {state.todos.map(({id, text, time, isDone}) => {
        return (
          <Item
            key={id}
            id={id}
            text={text}
            time={time}
            isDone={isDone}
          />
        );
      })}
    </List>
  );
};

export default React.memo(TodoList);
