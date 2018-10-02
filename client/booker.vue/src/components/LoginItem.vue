<template>
    <div>
       
         <div id="login">
          <h2>Login</h2>
            <label for="username">username</label>
            <input type="text" id="username" name="username" v-model="input.username" placeholder="Username" />
            
            <label for="password">password</label>
            <input type="password" id="password" name="password" v-model="input.password" placeholder="Password" />

            <button type="button" @click="login">Login</button>
        </div>
      
    </div>
</template>

<script>
import calendar from "../calendar/calendar";
import users from "../api/users";

export default {
  props: [],

  data() {
    return {
      input: {
        username: "",
        password: ""
      }
    };
  },

  computed: {},

  filters: {},
  methods: {
    login() {
      if (this.input.username != "" && this.input.password != "") {
        users.login(this.input)
          .then(response => {
            alert('Login success!');
            console.log(response);
          })
          .catch(error => {
            alert(error.data.errors);
            console.log(error.data.errors);
          });
      } else {
        alert("A username and password must be present");
      }
    }
  }
};
</script>

<style>
</style>