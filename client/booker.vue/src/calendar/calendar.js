import Vue from 'vue';

export default new Vue({

  data() {
    return {
      currentMonthDate: new Date(),
      today: new Date(),
      selectedDate: '',
      // tasks: [],
      events: []

     

    }
  },
  

  created() {
    // let localTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    // localTasks.forEach(element => {
    //   element.date = new Date(element.date)
    // });
    // this.tasks = localTasks || this.defaultTasks;
    let roomEvents = this.getEvents();
    // roomEvents.forEach (event =>{
    //   event.start_time = new Date(event.start_time);
    //   event.end_time = new Date(event.end_time);
    //   event.created_time = new Date(event.created_time);
    // });
    this.events = roomEvents;
  },

  watch: {
    // tasks: {
    //   handler: function (tasks) {
    //     localStorage.setItem('tasks', JSON.stringify(this.tasks || []));
    //   },
    //   deep: true
    // }
  },

  methods: {

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
      if (day == 0) {
        day = 7;
      }
      return day - 1;
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

    // getDayTasks(date) {
    //   let tasks = this.tasks.filter((day) =>
    //     this.isEqualsDays(day.date, date));
    //   if (tasks.length > 0) {
    //     return tasks[0].task;
    //   }
    //   return false;
    // },
    getDayEvents(date) {
      let events = this.events.filter((event) =>
        this.isEqualsDays(event.start_time, date));
      if (events.length > 0) {
        return events;
      }
      return false;
    },

    getEventById(id){
      let event =  this.events.filter((event) => event.id === id);
      if (event.length > 0) {
        return event[0];
      }
      return event;
    },

    getEvents(){
        //     let url = 'http://192.168.0.15/~user12/booker/server/api/events/';
      //     $.get(url,  function (data) {
      //     this.events = data;
      // }, "json");
      let events=[];
      // let url = "http://192.168.0.15/~user12/booker/server/api/events/";
      let url = "http://127.0.0.1/my/courses/booker/server/api/events/";
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok");
        })
        .then(json => {
          json.forEach(event => {
            events.push({
              id: event.id,
              idrec: event.idrec,
              description: event.description,
              start_time: new Date(event.start_time),
              end_time: new Date(event.end_time),
              created_time: new Date(event.created_time),
              idroom: event.idroom,
              iduser: event.iduser
            });
          });
        })
        .catch(error => {
          console.log(error);
        });

        return events;
    }

  }
});
