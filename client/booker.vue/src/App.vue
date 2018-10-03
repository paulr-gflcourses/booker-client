<template>
  <div id="app">
    
      <div class="header">
        <div  class="caption">
          <h1>Boardroom Booker</h1>
        </div>
         
         <div v-if="user" class="user">
           <div>
              Hello, {{user.fullname}}
           </div>
          <button @click="logout">Logout</button>
           </div>
      </div>
     
   
      
      <!-- <calendar-item></calendar-item> -->
      <router-view/>
  </div>
</template>

<script>
import CalendarItem from "./components/CalendarItem";
import users from "./api/users";
import calendar from "./calendar/calendar";

export default {
  name: "App",

  components: {
    CalendarItem
  },

  computed: {
    user() {
      return calendar.user;
    }
  },
  methods: {
    logout() {
      calendar.user = "";
      this.$router.push("/login");
    }
  }
};
</script>

<style>

#app{
  margin: 0px;
  padding: 0px

}

.header {
  display: table;
  height: 50px;
  width: 100%;
  margin: 0px;
  padding: 20px;
  background: rgb(97, 112, 165);
 


}
.caption {
  margin: 0px;
  padding: 20px;
  text-align: center;
  color: rgb(253, 215, 169);
  display: table-row;
}

.caption h1{
  margin: 0px;
  padding: 0px;
}
.user{
  display: table-cell;
  float: right;
  margin-right: 80px;
  color: rgb(247, 204, 176);
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
