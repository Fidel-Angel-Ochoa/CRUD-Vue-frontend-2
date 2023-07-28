<template>
    <section>
        <h1>Your Profile</h1>
        <hr/><br/>
        <div>
            <div v-if="isLoggedIn" >
                <p><strong>Full Name:</strong> <span>{{ user.full_name }}</span></p>
                <p><strong>Username:</strong> <span>{{ user.username }}</span></p>
                <p><button @click="deleteAccount()" class="btn btn-primary">Delete Account</button></p>
            </div>
            <div v-else>
                <p>You are not logged in. Redirecting to the home page...</p>
            </div>
        </div>
    </section>
</template>

<script>
import {defineComponent} from 'vue'
import {mapActions, mapGetters} from 'vuex'

export default defineComponent({
    name: 'ProfielView',
    created: function(){
        // this is for see the user data after refresh the page
        if (this.isLoggedIn){
            return this.$store.dispatch('viewMe')
        }
    },
    computed: {
        ...mapGetters({user:'stateUser'}),
        isLoggedIn: function (){
            return this.$store.getters.isAuthenticated
        },
    },
    methods:{
        ...mapActions(['deleteUser']),
        async deleteAccount(){
            try  {
                await this.deleteUser(this.user.id)
                await this.$store.dispatch('logout')
                this.$router.push('/')
            }catch (error) {console.error(error)}
        },
        noLoggedRedirect (){
            if (!this.isLoggedIn){
                this.$router.push('/')
            }
        },
        
    },
    beforeRouteEnter(to,from, next){
        next (vm => {
            vm.noLoggedRedirect()
        })
    },
})
</script>
