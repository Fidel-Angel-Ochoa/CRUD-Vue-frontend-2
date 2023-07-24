<template>
    <section>
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" name="username" v-model="user.username" class="form-control" />
            </div>
            <div class="mb-3">
                <label for="full-name" class="form-label">Full Name:</label>
                <input type="text" name="full-name" v-model="user.full_name" class="form-control"/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input type="password" name="password" v-model="user.password" class="form-control"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </section>
</template>

<script>
import  { defineComponent} from 'vue';
import { mapActions } from 'vuex';

export default defineComponent ({
    name : 'RegisterView',
    data(){
        return {
            user:{
                username:'',
                full_name:'',
                password:''
            }
        }
    },
    // 'register' comes from the actions in modules in the store.
    methods:{
        ...mapActions(['register']),
        async submit(){
            try {
                await this.register(this.user);
                this.$router.push('/dashboard');
            }   catch(error) {
                throw 'Username already exist. Please try again.';
            }
        }
    }
})
</script>

// we have a problem, after register a new user the navbar does't change, does't show my profile, dashboar neither logout