<template>
  <section>
    <p>This site is built with FastAPI and Vue.</p>

    <div v-if="isLoggedIn" id="logout">
      <p id="logout">Click <router-link to="/dashboard">here</router-link> to view all notes.</p> 
    </div>
    <p v-else>
      <span><a href="/register">Register</a></span>
      <span> or </span>
      <span><a href="/login">Log In</a></span>
    </p>
  </section>
</template>

<script>
// @ is an alias to /src
import { defineComponent} from 'vue';

export default defineComponent({
  name: 'HomeView',
  // created: function(){
  //       return this.$store.dispatch('viewMe')},
  computed: {
    isLoggedIn: function(){
      return this.$store.getters.isAuthenticated;
    }
  },
})
</script>
