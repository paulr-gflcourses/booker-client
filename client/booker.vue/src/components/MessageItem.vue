<template>
    <div>
        <slot></slot>
        <div class="opt-button">
           <router-link to="/">
             <button>Main Page</button>
            </router-link>
        </div>
      
    </div>
</template>

<script>
import calendar from "../calendar/calendar";

export default {
  props: [],

  data() {
    return {};
  },

  computed: {
   
  },

  filters: {
    
  },
  methods: {
 
  }
};
</script>

<style>
</style>