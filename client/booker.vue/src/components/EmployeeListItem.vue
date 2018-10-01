<template>
    <div>
        <h2>Employees</h2>
        <div class="opt-button">
           <router-link to="/">
             <button>Back</button>
            </router-link>
        </div>

        <table class="employees-table">

            <tr v-for="(employee, index) in employeeList" :key="index">
                <td>
                    <a v-bind:href="employee.email | mailto">
                     {{employee.fullname}}
                     </a>
                </td>
               <td>
                   <a href="#" @click="removeEmployee(employee)">Remove</a>
               </td>
                <td>
               <router-link :to="employee | employeeLink">
                   Edit
               </router-link>
               </td>
            </tr>
        </table>
        <div class="opt-button">
            <router-link to="/employee">
            <button>Add a new employee</button>
            </router-link>
        </div>
        
    </div>
</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: [],

  data() {
    return {
        employeeList: calendar.users
    };
  },

  computed: {
   
  },

  filters: {
    employeeLink(employee){
        return "/employee/"+employee.id;
    },
    mailto(link){
        return "mailto:"+link;
    }
  },
  methods: {
      removeEmployee(user){
      usersModel.removeUser(user)
      .then(response => {
        calendar.getUsers();
        alert('Added!');
    //   this.$router.push('/');
        // this.$router.go(-1)
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
.employees-table{
    border: 0px;

}
.employees-table td{
    border: 0px;
    padding: 10px;
}
</style>