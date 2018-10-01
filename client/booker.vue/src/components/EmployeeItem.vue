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
          <div>
            <input id="is_admin" type="checkbox" v-model="user.is_admin"/>
            <label for="password">Is Admin</label>
          </div>
          <button @click="addEmployee">Add</button>

        </div>
        
       
    </div>
</template>

<script>
import calendar from "../calendar/calendar";
import usersModel from '../api/users'

export default {
  props: ["id"],

  data() {
    return {
      user: {
        
        fullname: "",
        email: "",
        username: "",
        password: "",
        is_admin: true,
        is_active: true
      }
    };
  },

  created(){
    if (this.id){
      this.user = calendar.users.filter(user=>(user.id==this.id))[0];
    }
  },
  computed: {
   
  },

  filters: {
    
  },
  methods: {
    addEmployee(){
      usersModel.addUser(this.user)
      .then(response => {
        calendar.getUsers();
        alert('Added!');
    //   this.$router.push('/');
        this.$router.go(-1)
      })
      .catch(error => {
        // alert('Some Error: ('+error.status+")" + error.data.errors);
        alert(error.data.errors);
        console.log(error.data.errors);
      });
    },

    updateEmployee(){
      usersModel.updateUser(this.user)
      .then(response => {
        calendar.getUsers();
        alert('Added!');
    //   this.$router.push('/');
        this.$router.go(-1)
      })
      .catch(error => {
        // alert('Some Error: ('+error.status+")" + error.data.errors);
        alert(error.data.errors);
        console.log(error.data.errors);
      });
    },

    

   
 
  }
};
</script>

<style>
</style>