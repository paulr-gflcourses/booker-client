<template>
    <div class="new-event">
      <div>
           <router-link to="/">
             <button>Back</button>
            </router-link>
        </div>

      <p>
         1. Booked for
      </p>
      <p>
         <select name="user" id="user" v-model="event.iduser">
          <option v-for="(user, index) in users" :key="index" v-bind:value="user.id">{{ user.fullname }}</option>
        </select>
      </p>
      <p>
         2. I would like to book this meeting:
      </p>
      <p>
         <input type="date" name="date" v-model="event.date"/>
      </p>
      <p>
         3. Specify what the time and end of the meeting. 
         (This will be what people see on the calendar).
      </p>
      <p>
         <input type="time" name="start_time" v-model="event.start_time">
      </p>
      <p>
        <input type="time" name="end_time" v-model="event.end_time">
      </p>
      <p>
         4. Enter the specifics for the meeting.
         (This will be what people see when they click on the event link).
      </p>
      <p>
        <textarea name="description" id="" cols="40" rows="7" v-model="event.description">
         </textarea>
      </p>
      <p>
         5. Is this going to be a recurring event?
      </p>
      <p>
         <input name="is_recurring" id="no" type="radio" value="false" selected v-model="event.is_recurring">
         <label for="no">no</label>
          <br>
         <input name="is_recurring" id="yes" type="radio" value="true" v-model="event.is_recurring">
         <label for="yes">yes</label>
      </p>

      <div v-if="event.is_recurring=='true'" class="recurring">
        <p>
         6. If it is recurring, specify weekly, bi-weekly, or monthly.
      </p>
      <p>
         <input name="period" id="weekly" type="radio" value="weekly" selected v-model="event.period">
         <label for="weekly">weekly</label>
          <br>
         <input name="period" id="bi-weekly" type="radio" value="bi-weekly" selected v-model="event.period">
         <label for="bi-weekly">bi-weekly</label>
         <br>
         <input name="period" id="monthly" type="radio" value="monthly" selected v-model="event.period">
         <label for="monthly">monthly</label>
      </p>

      <p>
        If weekly or bi-weekly, specify the number of weeks for it to keep recurring.
        If monthly, specify the number of months.
        (If you choose "bi-weekly" and put in an odd number of weeks, the computer will round down.)
      </p>
      <p>
        <input type="number" width="30px" step="1" min="0" max="4" v-model="event.duration_recurring">
        duration (max 4 weeks)
      </p>

      </div>
      
      <p>
        <button @click="saveEvent">Submit</button>
      </p>

    </div>
</template>

<script>
import calendar from "../calendar/calendar";
import utils from "../api/utils";

export default {
  props: [],

  data() {
    return {
      event: {
        iduser: "",
        date: "",
        start_time: "",
        end_time: "",
        description: "",
        is_recurring: "false",
        period: "",
        duration_recurring: "",
        idroom: "1"
      }
    };
  },

  created() {
    this.fillFish();
  },

  computed: {
    users() {
      return calendar.users;
    },
    is_event_recurring(){
      return (this.event.is_recurring === "true");
    }
  },

  filters: {},
  methods: {
    

    saveEvent() {
      let event = this.transformFields();
      calendar.addEvent(event);
      this.$router.push('/');
    },

    transformFields() {
      let eventCopy = Object.assign({}, this.event);

      let start_time = new Date(this.event.date + ' ' + eventCopy.start_time);
      eventCopy.start_time = utils.toTimestampFormat(start_time);
      let end_time = new Date(this.event.date + ' ' + eventCopy.end_time);
      eventCopy.end_time = utils.toTimestampFormat(end_time);

      if (this.is_event_recurring) {
        eventCopy.days = this.getRecurringDays(start_time, end_time);
      }
      return eventCopy;
    },

    getRecurringDays(firstDate_start, firstDate_end) {
      let days = [{start_time: firstDate_start, end_time: firstDate_end}];
      let n = this.event.duration_recurring;
      let periodInDays = 0;
      if (this.event.period === "weekly") {
        periodInDays = 7 * 1;
      } else if (this.event.period === "bi-weekly") {
        periodInDays = 7 * 2;
      } else {
        periodInDays = 7 * 4;
      }
      
      for (let i = 0; i < n; i++) {
        let nextDate_start = new Date(firstDate_start);
        nextDate_start.setDate(firstDate_start.getDate() + periodInDays * (i + 1));
        let nextDate_end = new Date(firstDate_end);
        nextDate_end.setDate(firstDate_end.getDate() + periodInDays * (i + 1));
        days.push({start_time:nextDate_start, end_time: nextDate_end});
      }
    //  alert(days);
      return days;
    },

    
    fillFish() {
      this.event.iduser = "2";
      if (calendar.selectedDate) {
        this.event.date = utils.formatDate(calendar.selectedDate);
      }else{
        this.event.date = utils.formatDate(new Date());
      }
      this.event.idroom = calendar.currentRoom.id;

      this.event.start_time = "15:00";
      this.event.end_time = "15:30";
      this.event.description = "Some test description...";
       this.event.is_recurring = "false";
      // this.event.is_recurring = "true";
      // this.event.period = "weekly";
      // this.event.duration_recurring = "3";
      
    }
  }
};
</script>

<style>
.new-event {
  margin-left: 40px;
  margin-top: 20px;
  padding: 20px;
}
</style>