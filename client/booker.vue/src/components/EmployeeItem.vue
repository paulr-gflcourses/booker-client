<template>
    <div>
        <h2>Employee</h2>
        
        <div>
          <div>
            <label for="fullname">1. Enter new employee full name</label>
            <input id="fullname" type="text"/>
          </div>

          <div>
            <label for="email">2. Enter new employee e-mail</label>
            <input id="email" type="email"/>
          </div>

          <div>
            <label for="username">3. Enter new employee username</label>
            <input id="username" type="text"/>
          </div>
          <div>
            <label for="password">4. Enter new employee password</label>
            <input id="password" type="password"/>
          </div>
          <button @click="addEmployee">Add</button>

        </div>
        
       
    </div>
</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: ["id"],

  data() {
    return {};
  },

  computed: {
   
  },

  filters: {
    
  },
  methods: {
    addEmployee(){
      alert('Added!');
    //   this.$router.push('/');
      this.$router.go(-1)
    }
 
  }
};
</script>

<style>
</style>