<template>
    <div>
       
        <div class="login">
          <h2>Login</h2>
          <div class="fields">
            <div class="row">
              <label for="username">username</label>
              <input type="text" id="username" name="username" v-model="input.username" placeholder="Username" />
              <br>

            </div>
            <div class="row">
              <label for="password">password</label>
              <input type="password" id="password" name="password" v-model="input.password" placeholder="Password" />
              <br>

            </div>
            

          </div>
            
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

  created(){
    let user = JSON.parse(localStorage.getItem('user') || '[]');
  },

  computed: {},

  filters: {},
  methods: {
    login() {
      
      
        if (this.input.username != "" && this.input.password != "") {
        users.login(this.input)
          .then(response => {
            calendar.user=response;
            this.$router.push("/");
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
.login{

  margin-left: 20px;
  
}
.fields{
    margin-left: 20px;
    padding: 5px;
}

.row{
  padding: 5px;
}
.login button{
  margin-left: 20px;
}
</style>