import Vue from 'vue';
// import router from '../router';
// import axios from 'axios'
import {
  serverUrl
} from '../api/config'
import eventsModel from '../api/events'
import roomsModel from '../api/rooms'
import usersModel from '../api/users'

export default new Vue({

  data() {
    return {
      currentMonthDate: new Date(),
      today: new Date(),
      selectedDate: '',

      events: [],
      users: [],
      rooms: [],
      currentRoom: "",
      isTime24: this.getTimeConfig(),
      isMondayFirst: this.getFirstDayConfig()

    }
  },


  created() {
    if (this.rooms.length===0){
      this.getRooms();
    }
  
    this.getUsers();

  },

  watch: {

  },

  methods: {
    getFirstDayConfig() {
      return true;
    },
    getTimeConfig() {
      return true;
    },


    currentMonthDays(yearDate, monthDate) {
      let d = new Date(yearDate, monthDate, 1);

      let year = d.getFullYear();
      let month = d.getMonth();

      let nDays = new Date(year, month + 1, 0).getDate();
      let firstDayOfWeek = this.getLocalDay(new Date(year, month, 1));
      let lastDayOfWeek = this.getLocalDay(new Date(year, month, nDays));
      let days = [];
      let weeks = []

      for (let i = 1 - firstDayOfWeek; i < nDays + (6 - lastDayOfWeek) + 1; i++) {
        days.push(new Date(yearDate, monthDate, i));
      }

      let nWeeks = Math.ceil(days.length / 7);
      for (let i = 0; i < nWeeks; i++) {
        weeks.push(days.slice(i * 7, i * 7 + 7));
      }
      return weeks;
    },

    getLocalDay: function (date) {
      var day = date.getDay();
      if (this.isMondayFirst) {
        if (day == 0) {
          day = 7;
        }
        return day - 1;
      } else {
        return day;
      }
    },

    isEqualsDays(date1, date2) {
      if (date1 && date2) {
        return ((date1.getDate() === date2.getDate()) &&
          (date1.getMonth() === date2.getMonth()) &&
          (date1.getFullYear() === date2.getFullYear()))
      } else {
        return false
      }
    },

    isEqualsMonth(date1, date2) {
      if (date1 && date2) {
        return ((date1.getMonth() === date2.getMonth()) &&
          (date1.getFullYear() === date2.getFullYear()))
      } else {
        return false
      }
    },

    getDayEvents(date) {
      let events = this.events.filter((event) =>
        this.isEqualsDays(event.start_time, date));
      if (events.length > 0) {
        return events;
      }
      return false;
    },

    getEventById(id) {
      let event = this.events.filter((event) => event.id === id);
      if (event.length > 0) {
        return event[0];
      }
      return event;
    },

    getEvents() {
       eventsModel.getEvents(this.currentRoom.id)
       .then(response => {
        this.events = response;
      })
      .catch(error => {
        alert(error.data.errors);
        console.log(error.data.errors);
      });
    },

    getUsers() {
      usersModel.getUsers()
       .then(response => {
        this.users = response;
      })
      .catch(error => {
        alert(error.data.errors);
        console.log(error.data.errors);
      });

    },

    getRooms() {
      roomsModel.getRooms()
        .then(response => {
          this.rooms = response;
          if (this.rooms.length > 0) {
            this.currentRoom = this.rooms[0];
            this.getEvents();
          }
        })
        .catch(error => {
          console.log(error);
        });

    },

   

    

   




  }
});
