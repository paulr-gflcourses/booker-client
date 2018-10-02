<template>
    <div class="employees-page">
        <h2>Employees</h2>
        <div class="opt-button">
           <router-link to="/">
             <button>Back</button>
            </router-link>
        </div>

        <table class="employees-table">

            <tr v-for="(employee, index) in employeeList" :key="index"  v-bind:class="{deleted: !employee.is_active}">
                <td>
                    <a v-bind:href="employee.email | mailto">
                     {{employee.fullname}}
                     </a>
                </td>
               <td>

                   <a v-if="employee.is_active" href="#" @click="removeEmployee(employee)">Remove</a>
                   <span v-else>Remove</span>
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
import usersModel from '../api/users'

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
      usersModel.deleteUser(user)
      .then(response => {
        alert('User '+user.fullname+' has been removed.');
        calendar.getUsers();
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

.employees-page{
    padding: 20px;
    margin-left: 20px;
}
.employees-table{
    border: 0px;
    margin-left: 10px;

}
.employees-table td{
    border: 0px;
    padding: 10px;
}
.deleted,
.deleted a
{
    color: rgb(170, 172, 177);
}
</style>