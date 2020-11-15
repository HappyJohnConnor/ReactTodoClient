import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/todo/';

const ContentService = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { accessToken } = user;

  const getAllTodo = () => axios
    .get(`${API_URL}all`, { headers: authHeader() })
    .then((todos) => todos)
    .catch((err) => ({}));

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
      .then((todo) => todo);
  };
  const deleteTodoById = (todoId) => {
    axios
      .delete(
        `${API_URL}delete`,
        { data: { todoId } },
        { headers: authHeader() }
      )
      .then((response) => response);
  };
};

export default ContentService;
