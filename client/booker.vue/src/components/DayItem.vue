<template>

    <td class="day" 
      v-bind:class="{ 
      restDay: isRestDay,
      currentDay: isCurrentDay, 
      hasEvent: isEventExists, 
      otherMonth: isOtherMonth, 
      selected: isDaySelected}"  
      v-on:click="$emit('select-day', date, events)"> 

      <div class="day-number">{{ date | formatDate }}</div>
      <ul>
          <li v-for="(event,index) in events" :key="index">
            <!-- <a href="event" v-on:click="$emit('show-event', event)"> -->
              <router-link :to="event | eventLink" class="event-link">
                
                {{event.start_time | formatTime}} - {{event.end_time | formatTime}}
              </router-link>
            <!-- </a> -->
          </li>
      </ul>

    </td>

</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: ["date"],

  data() {
    return {};
  },

  computed: {
    events() {
      return calendar.getDayEvents(this.date);
    },

    isRestDay() {
      let dayOfWeek = calendar.getLocalDay(this.date);
      if (calendar.isMondayFirst) {
        if (dayOfWeek === 5 || dayOfWeek === 6) {
          return true;
        }
      } else {
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          return true;
        }
      }

      return false;
    },

    isCurrentDay() {
      return calendar.isEqualsDays(calendar.today, this.date);
    },

    isDaySelected() {
      return calendar.isEqualsDays(this.date, calendar.selectedDate);
    },

    isEventExists() {
      if (this.events) {
        return true;
      }
      return false;
    },

    isOtherMonth() {
      return !calendar.isEqualsMonth(this.date, calendar.currentMonthDate);
    }
  },

  filters: {
    formatDate(date) {
      return date.getDate();
    },
    formatTime(date) {
      let isHour12 = !calendar.isTime24;
      let options = { hour12: isHour12, hour: "2-digit", minute: "2-digit" };
      return date.toLocaleTimeString("en-US", options);
    },
    eventLink(event) {
      return "/event/" + event.id;
    }
  },
  methods: {}
};
</script>

<style>
.event-link:focus{
  color: rgb(229, 188, 211);
}
</style>