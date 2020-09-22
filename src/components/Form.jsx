import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Form = (porps) => {
  const classes = useStyles();
  /*
    <form >
        <div>
            <input name="title" type="text" placeholder="add your todo"/>
            <input type="submit" value="Add" />
        </div>
    </form>*/
  return (
    <Paper component="form" className={classes.root} onSubmit={porps.handleAdd}>
      <InputBase className={classes.input} placeholder="Add todo" />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Paper>
  );
};

export default Form;
