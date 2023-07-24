<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container">
                <router-link class="navbar-brand" to="/">FastApi + Vue</router-link>
                <button class="navbar-toggler" type="button" datab-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>   
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul v-if="isLoggedIn" class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
                        </li>
                        <li class="nav-item">
                        <router-link class="nav-link" to="/profile">My Profile</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="logout">Log Out</a>
                    </li>
                    </ul>
                    <ul v-else class="navbar-nav me-auto mb-2 mb-md-0">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/">Home</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" to="/register">Register</router-link>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login">Log In</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { defineComponent } from 'vue';
// import {mapActions} from 'vuex'

export default defineComponent({
    name: 'NavBar',
    computed: {
        // ...mapActions(['viewMe']),
        // isLoggedIn: function(){
        //     return this.$store.getters.isAuthenticated;
        // }
        // async isLoggedIn(){
        //     // eslint-disable-next-line 
        //     await this.viewMe();
        //     const isAuthenticated = this.$store.getters.isAuthenticated;
        //     console.log('isLoggedIn', isAuthenticated)
        //     return isAuthenticated
        // },
        isLoggedIn: function() {
            const isAuthenticated = this.$store.getters.isAuthenticated;
            const user = this.$store.state.user;
            console.log('isLoggedIn:', isAuthenticated);
            console.log('user in navbar: ', user)
            return isAuthenticated;
        }
    },
    methods:{
        async logout () {
            await this.$store.dispatch('logout');
            this.$router.push('/login');
        }
    }
})
</script>

<style scoped>
a {
    cursor:pointer;
}
</style>