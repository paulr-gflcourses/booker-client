<template>
    <div>
        <h2>Employees</h2>
        <div>
           <router-link to="/">
             <button>Back</button>
            </router-link>
        </div>
        <table>

            <tr v-for="(employee, index) in employeeList" :key="index">
                <td>
                    <a v-bind:href="employee.email | mailto">
                     {{employee.fullname}}
                     </a>
                </td>
               <td>
                   <a href="#" @click="removeEmployee(employee.id)">Remove</a>
               </td>
                <td>
               <router-link :to="employee | employeeLink">
                   Edit
               </router-link>
               </td>
            </tr>
        </table>
        <router-link to="/employee">
            <button>Add a new employee</button>
        </router-link>
    </div>
</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: [],

  data() {
    return {
        employeeList: calendar.getUsers()
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
      removeEmployee(id){
          alert("employee "+id+" removed!")
      }
 
  }
};
</script>

<style>
table{
    border: 0px;

}
table td{
    border: 0px;
    padding: 10px;
}
</style>