import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';

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
  return state.todo.find((todo) => todo.id === todoId);
};

const TodoListItem = ({ id, deleteTodo, editTodo }) => {
  const classes = useStyles();

  const todo = useSelector((state) => selectTodoById(state, id));
  const { title, completed, alerm } = todo;

  const [inputText, setInputtext] = useState(title);
  const [editing, setEditMode] = useState(false);

  const handleDoneClick = () => {
    //edit todo item
    editTodo(id, inputText);
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
            <DeleteIcon onClick={() => deleteTodo(id)} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTodo: (id) =>
      dispatch({
        type: 'DELETE_TODO',
        payload: id,
      }),
    editTodo: (id, title) =>
      dispatch({
        type: 'EDIT_TODO',
        payload: { id: id, title: title },
      }),
  };
};

export default connect(null, mapDispatchToProps)(TodoListItem);
