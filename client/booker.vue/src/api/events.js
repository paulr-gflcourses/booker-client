import {serverUrl} from './config'
import axios from 'axios'

export default {

    getEvents(idroom) {
        return new Promise((resolve, reject) => {
          let url = serverUrl + "events/?idroom=" + idroom;
          axios.get(url, event)
            .then(response => {
              let events = response.data;
              events.forEach(event => {
                event.start_time = new Date(event.start_time + " UTC");
                event.end_time = new Date(event.end_time + " UTC");
                event.created_time = new Date(event.created_time + " UTC");
                event.is_recurring = (event.is_recurring === '1');
              });
              resolve(events)
            })
            .catch(error => {
              reject(error.response);
            });
          });
      },

      updateEvent(event) {
        return new Promise((resolve, reject) => {
        let url = serverUrl + "events/" + event.id;
        axios.put(url, event)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response);
          });
        });
  
      },

      addEvent(event) {
        return new Promise((resolve, reject) => {
        let url = serverUrl + "events/";
         axios.post(url, event)
          .then(response => {
            resolve(response.data)
          })
          .catch(error => {
            reject(error.response);
          });

        });
      
      },

      deleteEvent(event) {
        return new Promise((resolve, reject) => {
          let url = serverUrl + "events/" + event.id;
          axios.delete(url, {data:event})
            .then(response => {
              resolve(response.data)
            })
            .catch(error => {
              reject(error.response);
            });
          });
  
     


      }
  

}