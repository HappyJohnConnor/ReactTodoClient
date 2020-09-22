import React, { useState } from 'react';
import DateSetForm from './DateSetForm';
import '../../css/Item.scss';

const Item = (props) => {
  const todo = props.item;
  const [inputText, setInputtext] = useState(todo.text);
  const [editing, setEditMode] = useState(false);

  const remove = () => props.remove(todo['id']);
  const handleDoneClick = () => {
    //edit todo item
    props.edit(todo.id, inputText);
    //change to edit false
    setEditMode(!editing);
  };

  const setTodoAlerm = props.setTodoAlerm;

  return (
    <li className="list-group-item">
      <div className="container">
        <div className="titleBox">
          {editing ? (
            //Todo title Box
            <input
              id="titleInput"
              type="text"
              defaultValue={todo.text}
              onChange={(e) => setInputtext(e.target.value)}
            />
          ) : (
            <span>{todo.text}</span>
          )}
        </div>
        <div className="todo-btn-group btn-group btn-group-sm" role="group">
          <button className="btn btn-danger" onClick={remove}>
            Delete
          </button>

          {editing ? (
            <button
              type="button"
              className="btn btn-info"
              onClick={handleDoneClick}
            >
              Done
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-info"
              onClick={() => setEditMode(!editing)}
            >
              Edit
            </button>
          )}
          <DateSetForm todo={todo} setTodoAlerm={setTodoAlerm} />
        </div>
      </div>
    </li>
  );
};

export default Item;
