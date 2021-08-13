import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + '/auth/signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
      
  }
 
// suppression du JWT du localstorage
  logout() {
    localStorage.removeItem('user');
  }
// création d'un nouvel utilsateur
  register(user) {
    console.log(user);
    return axios.post(API_URL + '/auth/signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      introduction: user.introduction
    }); 
  }
}

export default new AuthService();