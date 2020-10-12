import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Provider } from './store';
import AuthService from './services/auth.service';
import AddForm from './components/AddForm';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const App = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const handleProfile = () => {};

  const handleLogout = (e) => {
    e.preventDefault();
    AuthService.logout();
    props.history.push('/login');
    window.location.reload();
  };

  const Main = () => {
    return (
      <div>
        <AddForm className="Form" />
        <TodoList />
      </div>
    );
  };

  const IsLoggedIn = () => {
    return (
      <Typography>
        <Button color="inherit" onClick={handleProfile}>
          {user.username}
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Typography>
    );
  };

  const NotLoggedIn = () => {
    return (
      <Typography>
        <Button color="inherit" href="/register">
          Sign up
        </Button>
        <Button color="inherit" href="/login">
          Login
        </Button>
      </Typography>
    );
  };

  return (
    <Provider>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Todo App
            </Typography>
            {user ? <IsLoggedIn /> : <NotLoggedIn />}
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Switch>
            <Route exact path={['/', '/home']} component={Main} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </Container>
      </div>
    </Provider>
  );
};

export default withRouter(App);
