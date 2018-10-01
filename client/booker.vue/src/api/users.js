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


    
  }