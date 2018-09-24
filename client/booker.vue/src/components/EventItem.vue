<template>
    <div class="event-panel">
        <h2>Event</h2> 

  
    <div class="event-detail">
      <h2>B.B. DETAILS:</h2>
      
      <div class="time">
          <label for="time">When</label>
          <input type="time" id="start-time" name="start-time"
                  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" required v-model="event.start_time"/>
                    - 
          <input type="time" id="end-time" name="end-time"
                  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" required v-model="event.end_time"/>
      </div>
      <div>
        <label for="description">Notes</label>
        <textarea name="description" id="description" cols="30" rows="2" v-model="event.description"></textarea>
      </div>
      <div>
        <label for="user">Who</label>
        <select name="user" id="user" v-model="event.iduser">
          <option v-for="(user, index) in users" :key="index" v-bind:value="user.id">{{ user.fullname }}</option>
        </select>
      </div>
      <div>
        <b>Submitted:</b> {{ event.created_time | fullDateTimeFormat}}
      </div>

      <div v-if="event.is_recurring">
        <input  type="checkbox">Apply to all occurences?</input>
      </div>
      
      <div>
        <button @click="update">UPDATE</button>
        <button @click="remove">DELETE</button>
      </div>
       
    </div>

    </div>
</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: ["id"],

  data() {
    return {

      event: ""
    };
  },

  created() {
    this.setFields();
  },

  computed: {
    users() {
      return calendar.users;
    }
  },

  watch: {
    id: function(val) {
      this.setFields();
    }
  },
  filters: {
    fullDateTimeFormat(date) {
      let options = {
        day: "numeric",
        month: "numeric",
        year: "numeric",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      };
      return date.toLocaleString("en-GB", options);
    }
  },
  methods: {
    timeFormat(date) {
      let options = { hour: "2-digit", minute: "2-digit", hour12: false };
      return date.toLocaleTimeString("en-US", options);
    },
    setFields() {
      let event = calendar.getEventById(this.id);
      this.event = Object.assign({},event);
      // this.event = event;

      // this.start_time = this.timeFormat(this.event.start_time);
      // this.end_time = this.timeFormat(this.event.end_time);

      this.event.start_time = this.timeFormat(this.event.start_time);
      this.event.end_time = this.timeFormat(this.event.end_time);

      // this.created_time = this.event.created_time;
      // this.description = this.event.description;
      // this.iduser = this.event.iduser;
    },
    update() {
      let event = calendar.getEventById(this.id);
      this.event.start_time = this.setTimeFromStr(
        this.event.start_time,
        event.start_time
      );
      this.event.end_time = this.setTimeFromStr(
        this.event.end_time,
        event.end_time
      );

      calendar.updateEvent(this.event);
      // this.event.description = this.description;
      // this.event.iduser = this.iduser;
    },
    remove() {
      alert("are you sure to delete?");
    },
    setTimeFromStr(strTime, date) {
      let d = new Date("2018-01-01 " + strTime);
      date.setHours(d.getHours());
      date.setMinutes(d.getMinutes());
      return date;
    }
  }
};
</script>

<style>
</style>