<template>
    <div class="event-panel">
        <h2>Event</h2> 

         <!-- <div class="event-panel" v-if="dayChecked"> -->


      <!-- <div class="task-form">
          <h3>Add new task</h3>
          <label for="taskName">Task name</label>
          <input type="text" id="taskName" ref="taskName" name="" />
          <button @click="saveTask">Save</button>
      </div> -->
        
        
      <!-- <div class="event-list">
      <p v-if="!events">No events for selected day ({{dayChecked | formatDateFull}}).</p>
      <div v-else>
        <h2>Events</h2>
        <p>Date - {{dayChecked | formatDateFull}}</p>
        <ol>
          <li v-for="(event,index) in events" :key="index">
            {{event.description}}
          </li>
        </ol>
      </div>
      
      </div> -->
  
    <div class="event-detail">
      <h2>B.B. DETAILS:</h2>
      
      <div class="time">
          <label for="time">When</label>
          <input type="time" id="start-time" name="start-time"
                  min="8:00" max="20:00" required v-model="start_time"/>
                    - 
          <input type="time" id="end-time" name="end-time"
                  min="8:00" max="20:00" required v-model="end_time"/>
      </div>
      <div>
        <label for="description">Notes</label>
        <textarea name="description" id="description" cols="30" rows="2" v-model="description"></textarea>
      </div>
      <div>
        <label for="user">Who</label>
        <select name="user" id="user" v-model="user">
          <option value="">Al Davis</option>
          <option value="">Bob Tensy</option>
        </select>
      </div>
      <div>
        <b>Submitted:</b> {{ created_time | fullDateTimeFormat}}
      </div>

      <div>
        <button @click="update">UPDATE</button>
        <button @click="remove">DELETE</button>
      </div>
       
    </div>
   
      

    <!-- </div> -->
    </div>
</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: ["id"],

  data() {
    return {
      start_time: "",
      end_time: "",
      created_time: "",
      description: "",
      user: "",
      event: ""
    };
  },

  created() {
    this.setFields();
  },
  updated() {
    // this.setFields();
  },

  computed: {
    //  event(){
    //   return
    //  }
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
      this.event = calendar.getEventById(this.id);
      this.start_time = this.timeFormat(this.event.start_time);
      this.end_time = this.timeFormat(this.event.end_time);
      this.created_time = this.event.created_time;
      this.description = this.event.description;
    },
    update(){
      // alert('are you sure to update?');
      // this.event.start_time.setHours(this.start_time);
      let d= Date.parse('2012-01-14 '+ this.start_time);
      let d2 = new Date(d);
      this.event.start_time.setHours(d2.getHours());
      this.event.start_time.setMinutes(d2.getMinutes());
    },
    remove(){
      alert('are you sure to delete?');
    }
  }
};
</script>

<style>
</style>