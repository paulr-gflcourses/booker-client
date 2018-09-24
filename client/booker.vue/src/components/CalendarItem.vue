<template>
    <div>
      <div class="rooms">
        <ul>
          <li v-for="(room, index) in rooms" :key="index">
            <a href="#" @click="selectRoom(room)">Boardroom {{index+1}}</a>
          </li>
        </ul>
        <br>
          <ul>
          <li v-for="(room, index) in rooms" :key="index">
            <a href="#" @click="selectRoom(room)"> {{room.name}}</a> 
          </li>
        </ul>
       
        
      </div>
       <div class="calendar">
        <div class="cal-head">

          <div class="month-buttons">
            <button class="prev-month" @click="month--"> &larr; </button>
            <span class="show-date">{{ showedDate | formatDate}}</span>
            <span class="selected-room">{{ currentRoom.name }}</span>
            <button class="next-month" @click="month++"> &rarr; </button>
          </div>
         

          <p class="toggle">
            <label for="month">Month</label>
            <select name="" id="month" v-model="month">
              <option value="0">January</option>
              <option  value="1">February</option>
              <option  value="2">March</option>
              <option  value="3">April</option>
              <option value="4">May</option>
              <option value="5">June</option>
              <option value="6">July</option>
              <option value="7">August</option>
              <option value="8">September</option>
              <option value="9">October</option>
              <option value="10">November</option>
              <option value="11">December</option>
            </select>
            <label for="year">Year</label>
            <input type="number" v-model="year"/>
          </p>
        
        </div>

        <div class="cal-main">

    <table  border="1px"> 
        <tr>
            <td>Monday</td>
            <td>Tuesday</td>
            <td>Wednesday</td>
            <td>Thursday</td>
            <td>Friday</td>
            <td>Saturday</td>
            <td>Sunday</td>
        </tr>

        <tr
         v-for="(week, indexWeek) in daysArray" 
        :key="indexWeek">
          <day-item
              v-for="(date,index) in week" 
              :date="date"
              :key="index"
              v-on:select-day="selectDay"
              v-on:show-event="showEvent"
          >
          </day-item>
        </tr>
    </table>
</div>

    </div>

<button>Book It!</button>
<button>Employee List</button>
  <router-view></router-view>
    
    

    </div>
</template>


<script>
import calendar from "../calendar/calendar";

import DayItem from "./DayItem";

export default {
  data: function() {
    return {

      day: calendar.today.getDate(),
      month: calendar.today.getMonth(),
      year: calendar.today.getFullYear(),
      events: [],
      // currentRoom: ""
    };
  },
  watch: {
    day: function(val) {
      calendar.currentMonthDate.setDate(val);
      this.day = calendar.currentMonthDate.getDate();
    },
    month: function(val) {
      calendar.currentMonthDate.setMonth(val);
      this.month = calendar.currentMonthDate.getMonth();
      this.year = calendar.currentMonthDate.getFullYear();
    },
    year: function(val) {
      calendar.currentMonthDate.setFullYear(val);
      this.year = calendar.currentMonthDate.getFullYear();
    }
  },

  mounted(){
    
  },
  
  components: {
    DayItem
  },

  computed: {
    showedDate() {
      return calendar.currentMonthDate;
    },
    dayChecked() {
      return calendar.selectedDate;
    },
    daysArray() {
      return calendar.currentMonthDays(this.year, this.month);
    },
    rooms(){
      return calendar.rooms;
    },
    currentRoom(){
      return calendar.currentRoom;
    }
  },

  filters: {
    formatDate(date) {
      let options = { day: "2-digit", month: "short", year: "numeric" };
      return date.toLocaleDateString("en-US", options);
    },
    formatDateFull(date) {
      let options = { day: "numeric", month: "long", year: "numeric" };
      return date.toLocaleDateString("en-GB", options);
    }
  },

  methods: {
    selectDay(date, tasks) {
      calendar.selectedDate = date;
      this.day = date.getDate();
      this.month = date.getMonth();
      this.year = date.getFullYear();
      // this.events = calendar.getDayEvents(date);
      
      // this.tasks = calendar.getDayTasks(date);
    },

    selectRoom(room){
      calendar.currentRoom = room;
      calendar.events = calendar.getEvents();
     },

    // saveTask() {
    //   let taskName = this.$refs.taskName.value;
    //   let taskList = calendar.getDayTasks(calendar.selectedDate);
    //   if (taskList) {
    //     taskList.push(taskName);
    //   } else {
    //     calendar.tasks.push({
    //       date: new Date(calendar.selectedDate),
    //       task: [taskName]
    //     });
    //     this.tasks = calendar.getDayTasks(calendar.selectedDate);
    //   }

    //   this.$refs.taskName.value = "";
    // },

    getEvents() {
     
      this.events = calendar.events; //getEvents();
    },
    showEvent(event) {
      alert("Event: " + event.description);
    }
  }
};
</script>

<style>

.rooms{
  margin: 0px;
  text-align: center;
}
.rooms ul{
	display: inline-block;
}

.rooms ul li{
	display: inline-block;
}

.rooms li:before{
	content: " | ";
	display: inline;
}

.rooms ul li:first-child:before{
	content: "";
	display: none;
}

.calendar {
  /*width: 355px;*/
  margin-left: 40px;
  margin-top: 40px;
  border: 1px solid rgb(40, 40, 70);
  padding: 15px;
  float: left;
}

.event-panel {
  margin-top: 40px;
  margin-left: 50px;
  padding: 5px;
  float: left;
}

.event-detail {
  border: 1px solid rgb(40, 40, 70);
  background: rgb(208, 230, 181);
  padding: 20px;
}

.event-form {
  padding: 20px;
}

.prev-month {
  float: left;
}

.next-month {
  float: right;
}

.prev-month, .next-month{
  height: 40px;
  width: 60px;
}
.show-date {
  border: 1px solid rgb(40, 40, 70);
  background: rgb(228, 226, 231);
  text-align: center;
  margin-left: 26%;
  padding: 5px;
}

.selected-room{
   border: 1px solid rgb(40, 40, 70);
   padding: 5px;
}

td {
  border: 1px solid rgb(157, 157, 224);
  vertical-align: top;
  /* text-align: center; */
}

.day {
  background: rgb(189, 179, 207);
  /* padding: 15px; */
  padding: 5px;
  width: 81px;
  height: 81px;
  font-size: 11pt;
  /* text-align: center; */
}

.day ul {
  margin: 0;
  padding: 0;
  margin-top: 5px;
  text-align: left;
}
.day li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.day-number {
  text-align: right;
  vertical-align: top;
}
.restDay {
  background: rgb(214, 182, 200);
}

.hasEvent {
  background: rgb(206, 189, 172);
}

.notAvaiable {
  background: rgb(228, 226, 231);
  color: rgb(148, 144, 156);
}

.currentDay {
  font-weight: bold;
  border: 4px solid rgb(57, 6, 124);
  color: rgb(30, 8, 75);
}

.day:hover {
  background: rgb(153, 153, 207);
}

.selected.day:hover,
.selected {
  background: rgb(103, 82, 128);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>