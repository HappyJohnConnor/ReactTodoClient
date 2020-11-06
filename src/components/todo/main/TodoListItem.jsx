import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DateFormDialog from './dialog/DateFormDialog';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

const selectTodoById = (state, todoId) => {
  return state.todos.find((todo) => todo.id === todoId);
};

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const { title, completed, alerm } = todo;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [inputText, setInputtext] = useState(title);
  const [editing, setEditMode] = useState(false);

  const deleteTodo = () => {
    dispatch({ type: 'DELETE_TODO', id: id });
  };
  const editTodo = () => {
    dispatch({ type: 'EDIT_TODO', id: id, title: inputText });
  };

  const handleDoneClick = () => {
    //edit todo item
    editTodo();
    //change to edit false
    setEditMode(!editing);
  };

  const handleChange = (e) => {
    setInputtext(e.target.value);
  };

  return (
    <ListItem className="list-group-item">
      <div className="titleBox">
        {editing ? (
          //Todo title Box
          <TextField
            id="titleInput"
            defaultValue={title}
            onChange={handleChange}
          />
        ) : (
          <ListItemText
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline}>
                  {inputText}
                </Typography>
              </React.Fragment>
            }
          />
        )}
      </div>
      <ListItemSecondaryAction>
        <Grid container spacing={1}>
          <Grid item>
            <DeleteIcon onClick={deleteTodo} />
          </Grid>
          <Grid item>
            {editing ? (
              <DoneIcon onClick={handleDoneClick} />
            ) : (
              <EditIcon onClick={() => setEditMode(!editing)} />
            )}
          </Grid>
          <Grid item>
            <DateFormDialog title={title} alerm={alerm} id={id} />
          </Grid>
        </Grid>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default React.memo(TodoListItem);
