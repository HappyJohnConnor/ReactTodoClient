import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import ButtonBase from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem auto',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    maxWidth: '400px',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const AddForm = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const handleAdd = (e) => {
    e.preventDefault();
    addTodo();
    setInputText('');
  };
  const addTodo = () => {
    if (inputText === '') {
      return;
    } else {
      dispatch({ type: 'ADD_TODO', payload: inputText });
    }
  };
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleAdd}>
      <InputBase
        className={classes.input}
        value={inputText}
        placeholder="Add todo"
        onChange={handleInputChange}
      />
      <ButtonBase type="submit" variant="contained" color="secondary">
        Add
      </ButtonBase>
    </Paper>
  );
};

export default React.memo(AddForm);
