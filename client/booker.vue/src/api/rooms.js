import {
  serverUrl
} from './config'
import axios from 'axios'

export default {

  getRooms() {
    return new Promise((resolve, reject) => {
      let url = serverUrl + "rooms/";
      axios.get(url)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error.response);
        });
      });
  },
}
