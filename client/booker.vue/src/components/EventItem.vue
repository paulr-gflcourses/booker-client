<template>
    <div>
        <h2>EventItem</h2> 

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
      <label for="time">When</label>
  <div class="time">
       <input type="time" id="appt-time" name="appt-time"
               min="9:00" max="18:00" required v-model="event.start_time"/>
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
      event : ""
    };
  },

  created(){
    this.event = calendar.getEventById(this.id);
  },
  computed: {
  //  event(){
  //   return 
  //  }

  },

  filters: {
    
  },
  methods: {
 
  }
};
</script>

<style>
</style>