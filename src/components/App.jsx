import React, { useState } from 'react';
import Form from './Form';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { displayAlert } from './utility';
import TodoList from './TodoList';

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

const App = () => {
  const classes = useStyles();
  const [todoList, setTodoList] = useState([]);

  // add todo
  const handleAdd = (inputText) => {
    const newTodo = {
      id: new Date().getTime(),
      text: inputText,
      time: '',
      isDone: false,
    };
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
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
      <Container maxWidth="md">
        <Form className="Form" handleAdd={handleAdd} />
        <TodoList
          todos={todoList}
          removeTodo={removeTodo}
          editTodo={editTodo}
          setTodoAlerm={setTodoAlerm}
        />
      </Container>
    </div>
  );
};

export default App;
