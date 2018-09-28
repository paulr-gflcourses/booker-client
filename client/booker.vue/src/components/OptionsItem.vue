<template>
    <div>
        <h2>Options</h2>
        <div>
           <router-link to="/">
             <button>Back</button>
            </router-link>
        </div>
        <div>
            <h4>Time format</h4>
            <div>
                
                <input type="radio" name="time" id="time24" value="true" v-model="timeFormat">   
                <label for="time24">24-hour format</label>
                
                <input type="radio" name="time" id="time12" value="false" v-model="timeFormat">
                <label for="time12">12-hour format</label>
            </div>
            <h4>First week day format</h4>
            <div>
                
                <input type="radio" name="day" id="monday" value="true" v-model="firstDayFormat">   
                <label for="monday">Monday</label>
                
                <input type="radio" name="day" id="sunday" value="false" v-model="firstDayFormat">
                <label for="sunday">Sunday</label>
            </div>
           

        </div>
    </div>
</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: [],

  data() {
    return {
      timeFormat: calendar.isTime24,
      firstDayFormat: calendar.isMondayFirst
    };
  },
  watch: {
    firstDayFormat: function(val) {
      calendar.isMondayFirst = (val ==='true');
    },
    timeFormat: function(val) {
      calendar.isTime24 = (val === 'true');
    }
  },

};
</script>

<style>
</style>