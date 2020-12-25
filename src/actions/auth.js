import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  SET_TODO,
} from './types';

import AuthService from '../services/auth.service';

export const register = (username, email, password) => (dispatch) => AuthService.register(username, email, password).then(
  (response) => {
    dispatch({ type: REGISTER_SUCCESS });

    return Promise.resolve();
  },
  (error) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({ type: REGISTER_FAIL });
    dispatch({ type: SET_MESSAGE, payload: message });
    return Promise.reject();
  }
);

export const login = (username, password) => (dispatch) => AuthService.login(username, password).then(
  (data) => Promise.resolve(),
  (error) => {
    const message = (error.response
          && error.response.data
          && error.response.data.message)
        || error.message
        || error.toString();
    dispatch({ type: SET_MESSAGE, payload: message });
    dispatch({ type: LOGIN_FAIL });

    return Promise.reject();
  }
);