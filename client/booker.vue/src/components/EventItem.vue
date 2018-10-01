<template>
    <div class="event-panel">

    <div class="event-detail">
      <button class="btn-close" @click="close">x</button>
      <h2>B.B. DETAILS:</h2>
      <div class="time field">
          <label for="time">When</label>
          <input type="time" id="start-time" name="start-time"
                  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" required v-model="event.start_time"/>
                    - 
          <input type="time" id="end-time" name="end-time"
                  min="08:00" max="20:00" step="1800" pattern="[0-9]{2}:[0-9]{2}" required v-model="event.end_time"/>
      </div>
      <div class="field">
        <label for="description">Notes</label>
        <textarea name="description" id="description" cols="30" rows="2" v-model="event.description"></textarea>
      </div>
      <div class="field">
        <label for="user">Who</label>
        <select name="user" id="user" v-model="event.iduser">
          <option v-for="(user, index) in users" :key="index" v-bind:value="user.id">{{ user.fullname }}</option>
        </select>
      </div>
      <div class="field">
        <b>Submitted:</b> {{ event.created_time | fullDatetoStrTime}}
      </div>

      <div v-if="event.is_recurring" class="field">
        <input id="isrec" type="checkbox" v-model="event.applyToAllRec"/>
        <label for="isrec">Apply to all occurences?</label>
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
    fullDatetoStrTime(date) {
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

    toStrTime(date) {
      let options = { hour: "2-digit", minute: "2-digit", hour12: false };
      return date.toLocaleTimeString("en-US", options);
    },

    toTimestampFormat(dateSrc, timeStr) {
      let date = new Date(dateSrc.toDateString()+ " "+timeStr);
      return (date.getTime()/1000).toFixed()
    },

    setFields() {
      this.event = Object.assign({}, calendar.getEventById(this.id));
      this.event.start_time = this.toStrTime(this.event.start_time);
      this.event.end_time = this.toStrTime(this.event.end_time);
      this.$set(this.event,'applyToAllRec',false);

    },

    update() {
      let eventCopy = Object.assign({}, this.event);
      let date = calendar.getEventById(this.id).start_time;

      eventCopy.start_time = this.toTimestampFormat(date, eventCopy.start_time);
      eventCopy.end_time = this.toTimestampFormat(date, eventCopy.end_time);

      calendar.updateEvent(eventCopy);

      // this.setFields();

    },

    remove() {
      // alert("are you sure to delete?");
      calendar.deleteEvent(this.event);
      this.$router.push('/');
    },
    close(){
      this.$router.push('/');
    }

  }
  
};
</script>

<style>
.btn-close{
  float: right;
}

.field{
  padding: 5px;
}
</style>