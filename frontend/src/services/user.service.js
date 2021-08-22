import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/auth/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(API_URL, {headers: authHeader() });
  }

  findByUser(username) {
    return axios.get(API_URL + `?username=${username}`, {headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `${id}`, {headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `${id}`, {headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `${id}`, data, {headers: authHeader() } );
  }
}

export default new UserService();