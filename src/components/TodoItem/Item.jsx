import React, { useState } from 'react';
import DateSetForm from './DateSetForm';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

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
    <ListItem className="list-group-item">
      <div className="titleBox">
        {editing ? (
          //Todo title Box
          <TextField
            id="titleInput"
            defaultValue={todo.text}
            onChange={(e) => setInputtext(e.target.value)}
          />
        ) : (
          <ListItemText>{todo.text}</ListItemText>
        )}
      </div>
      <Grid container justify="flex-end" spacing={1}>
        <Grid item>
          <DeleteIcon onClick={remove} />
        </Grid>
        <Grid item>
          {editing ? (
            <DoneIcon onClick={handleDoneClick} />
          ) : (
            <EditIcon onClick={() => setEditMode(!editing)} />
          )}
        </Grid>
        <Grid item>
          <DateSetForm todo={todo} setTodoAlerm={setTodoAlerm} />
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default Item;
