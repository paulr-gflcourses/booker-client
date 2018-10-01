<template>
  <div id="app">
    
      <div class="header">
         <h1 class="caption">Boardroom Booker</h1>
      </div>
     
   
      
      <!-- <calendar-item></calendar-item> -->
      <router-view/>
  </div>
</template>

<script>

import CalendarItem from './components/CalendarItem';
export default {
  name: 'App',

  components: {
    CalendarItem,
  },

  
}
</script>

<style>

  .header{
    height: 50px;
    width: 100%;
    margin: 0px;
    padding: 10px;
    background: rgb(214, 217, 243);
  }
  .caption{
    margin: 0px;
    padding: 0px;
    text-align: center;
    
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
