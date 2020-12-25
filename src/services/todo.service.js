import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/todo/';

const getAllTodos = (username) => {
  const data = { createdBy: username };
  const config = {
    method: 'get',
    url: `${API_URL}all`,
    headers: {
      'x-access-token': JSON.parse(localStorage.getItem('user')).accessToken,
      'Content-Type': 'application/json',
    },
    params: data,
  };

  return axios(config)
    .then((response) => response.data)
    .catch((error) => error);
};

/*
  axios.post(Helper.getUserAPI(), {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
    },
    data
})
.then((response) => {
    dispatch({type: FOUND_USER, data: response.data[0]})
})
.catch((error) => {
    dispatch({type: ERROR_FINDING_USER})
}) */
/*
  const createTodo = (todo) => {
    axios
      .post(
        `${API_URL}create`,
        { data: { title: todo.title, createdBy: accessToken } },
        { headers: authHeader() }
      )
      .then((todo) => todo);
  };

  const getTodoById = (todoId) => {
    axios
      .get(`${API_URL}get`, { data: { todoId } }, { headers: authHeader() })
      .then((todo) => todo);
  };

  const updateTodo = (todo) => {
    axios
      .post(`${API_URL}udpate`, { data: todo }, { headers: authHeader() })
      .then((response) => response);
  };

  const deleteTodoById = (todoId) => {
    axios
      .delete(
        `${API_URL}delete`,
        { data: { todoId } },
        { headers: authHeader() }
      )
      .then((response) => response);
  }; */
const printError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log(error.config);
};

export default {
  getAllTodos,
};
