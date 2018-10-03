<template>
    <div>
        <h2>Employee</h2>
        
        <div class="opt-button">
           <router-link to="/employees">
             <button>Back</button>
            </router-link>
        </div>

        <div class="employee-data">
          <div class="field-row">
            <label for="fullname">1. Enter new employee full name</label>
            <input id="fullname" type="text" v-model="user.fullname"/>
          </div>

          <div class="field-row">
            <label for="email">2. Enter new employee e-mail</label>
            <input id="email" type="email" v-model="user.email"/>
          </div>

          <div class="field-row">
            <label for="username">3. Enter new employee username</label>
            <input id="username" type="text" v-model="user.username"/>
          </div>
          <div class="field-row">
            <label for="password">4. Enter new employee password</label>
            <input id="password" type="password" v-model="user.password"/>
          </div>
          <div class="is-admin">
            <input id="is_admin" type="checkbox" v-model="user.is_admin"/>
            <label for="password">Is Admin</label>
          </div>
          <button class="btn" @click="save">Save</button>

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
        is_admin: "",
        is_active: ""
      }
    };
  },

  created(){
    if (this.id){
      this.user = calendar.users.filter(user=>(user.id==this.id))[0];

    }else{
      this.user.is_active = true;
      this.user.is_admin = true;
    }
  },
  computed: {
   
  },

  filters: {
    
  },
  methods: {
    save(){
      if (this.id){
        this.updateEmployee();
      }else{
        this.addEmployee();
      }
    },
    addEmployee(){
      usersModel.addUser(this.user)
      .then(response => {
        alert('User '+this.user.fullname+' has been added.');
        calendar.getUsers();
        this.$router.go(-1)
      })
      .catch(error => {
        alert(error.data.errors);
        console.log(error.data.errors);
      });
    },

    updateEmployee(){
      usersModel.updateUser(this.user)
      .then(response => {
        alert('User '+this.user.fullname+' has been edited.');
        calendar.getUsers();
        this.$router.go(-1)
      })
      .catch(error => {
        alert(error.data.errors);
        console.log(error.data.errors);
      });
    },

  

    

   
 
  }
};
</script>

<style>
.employee-data{
  padding: 20px;
  display: table;
}

.field-row{
  padding: 5px;
  display: table-row;
}


.field-row input,
.field-row label{
  
   display: table-cell;
}

.field-row label{
  padding: 10px;
}

.is-admin{
  margin-left: 10px
}
.btn{
  margin-top: 10px
}
</style>