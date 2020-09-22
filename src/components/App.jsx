import React, { useState } from 'react';
import Form from './Form';
import '../css/App.scss';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { displayAlert } from './utility';
import List from './List';

const App = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();
  const [todoList, setTodoList] = useState([]);

  // add todo
  const handleAdd = (e) => {
    // prevent to redirect
    e.preventDefault();
    const newTodo = {
      id: new Date().getTime(),
      text: e.target.title.value,
      time: '',
      isDone: false,
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
    // empty the value of the input
    e.target.title.value = '';
  };

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  const editTodo = (id, text) => {
    const newTodoList = todoList.filter((item) => {
      if (item.id === id) {
        item.text = text;
        return item;
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  const setTodoAlerm = (id, alermTime) => {
    const newTodoList = todoList.filter((item) => {
      if (item.id === id) {
        item.time = alermTime.getTime();
        const diff = alermTime.getTime() - new Date().getTime();
        if (diff > 0) {
          setTimeout(displayAlert, diff, item);
        } else {
          item.isDone = true;
        }
        return item;
      }
      return item;
    });
    setTodoList(newTodoList);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Todo App
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Form handleAdd={handleAdd} />
      <List
        todos={todoList}
        removeTodo={removeTodo}
        editTodo={editTodo}
        setTodoAlerm={setTodoAlerm}
      />
    </div>
  );
};

export default App;
