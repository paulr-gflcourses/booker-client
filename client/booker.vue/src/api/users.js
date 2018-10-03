import {
  serverUrl
} from './config'
import axios from 'axios'
export default {


  user:"",

  getUsers() {
    return new Promise((resolve, reject) => {
      let url = serverUrl + "users/";
      axios.get(url)
        .then(response => {
          let users = response.data;
          users.forEach(user => {
            user.is_active = (user.is_active === '1');
            user.is_admin = (user.is_admin === '1');
            resolve(users);
          })
        })
        .catch(error => {
          reject(error.response);
        });
    });

  },

  addUser(user) {
    return new Promise((resolve, reject) => {
      let url = serverUrl + "users/";
      axios.post(url, user)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response);
        });
    });

  },

  updateUser(user) {
    return new Promise((resolve, reject) => {
      let url = serverUrl + "users/" + user.id;
      axios.put(url, user)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response);
        });
    });

  },

  deleteUser(user) {
    return new Promise((resolve, reject) => {
      let url = serverUrl + "users/" + user.id;
      axios.delete(url, { data: user })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response);
        });
    });

  },


  login(user) {
    return new Promise((resolve, reject) => {
      let url = serverUrl + "users/";
      axios.put(url, user)
        .then(response => {
          
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response);
        });
    });

  },


}