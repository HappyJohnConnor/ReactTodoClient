import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      My sample website {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Register = (props) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [signStatus, setSighStatus] = useState({ success: true, msg: '' });

  const handleChange = (event) => {
    console.log(event.target.name);
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('success');
    console.log(formData);
    AuthService.register(
      formData.username,
      formData.email,
      formData.password
    ).then(
      (response) => {
        props.history.push('/login');
        window.location.reload();
      },
      (error) => {
        const errorMsg =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setSighStatus({ success: false, msg: errorMsg });
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <ValidatorForm className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {!signStatus.success && (
              <Grid item xs={12}>
                <Typography color="error" align="center">
                  {signStatus.msg}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                onChange={handleChange}
                value={formData.username}
                validators={['required']}
                errorMessages={['this field is required']}
                fullWidth
                id="username"
                label="username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                onChange={handleChange}
                value={formData.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextValidator
                variant="outlined"
                onChange={handleChange}
                value={formData.password}
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </ValidatorForm>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Register;
