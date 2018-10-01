import {
  serverUrl
} from './config'

export default {
  getRooms() {
    return new Promise((resolve, reject) => {
      let rooms = [];
      let url = serverUrl + "rooms/";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok");
        })
        .then(json => {
          //rooms = json;
          json.forEach(room => {
            rooms.push(room);
          });
          resolve(rooms);

        })
        .catch(error => {
          reject(error);
        });

      // return rooms;
    });
  },
}
