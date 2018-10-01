import {
    serverUrl
  } from './config'
  import axios from 'axios'
  export default {

    getUsers() {
      return new Promise((resolve, reject) => {
        let url = serverUrl + "users/";
        axios.get(url)
          .then(response => {
            resolve(response.data)
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

    removeUser(user) {
      return new Promise((resolve, reject) => {
      let url = serverUrl + "users/" + user.id;
       axios.delete(url, user)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response);
        });
      });
    
    },


    
  }