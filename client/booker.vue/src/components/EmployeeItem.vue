<template>
    <div>
        <h2>Employee</h2>
        
        <div>
          <div>
            <label for="fullname">1. Enter new employee full name</label>
            <input id="fullname" type="text" v-model="user.fullname"/>
          </div>

          <div>
            <label for="email">2. Enter new employee e-mail</label>
            <input id="email" type="email" v-model="user.email"/>
          </div>

          <div>
            <label for="username">3. Enter new employee username</label>
            <input id="username" type="text" v-model="user.username"/>
          </div>
          <div>
            <label for="password">4. Enter new employee password</label>
            <input id="password" type="password" v-model="user.password"/>
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
    return {
      user: {
        fullname: "",
        email: "",
        username: "",
        password: ""
      }
    };
  },

  computed: {
   
  },

  filters: {
    
  },
  methods: {
    addEmployee(){
      calendar.addUser(this.user);
      alert('Added!');
    //   this.$router.push('/');
      this.$router.go(-1)
    }
 
  }
};
</script>

<style>
</style>