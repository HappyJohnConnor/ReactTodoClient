import axios from 'axios';

const SERVER_PORT = 8080;
const API_URL = `http://localhost:${SERVER_PORT}/api/auth/`;

class AuthService {
  login(username, password) {
    return axios
      .post(`${API_URL}signin`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(username, email, password) {
    return axios.post(`${API_URL}signup`, {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();
