<template>
    <section>
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input type="text" name="username" v-model="form.username" class="form-control"/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" v-model="form.password" class="form-control"/>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="!isFormValid">Submit</button>
        </form>
    </section>
</template>

<script>
import { defineComponent } from 'vue'
import { mapActions } from 'vuex';

export default defineComponent({      
  name: 'LoginView',
  data(){
    return {
        form:{
            username:'',
            password:''
        }
    }
  },
  computed:{
    isFormValid(){
        return this.form.username && this.form.password
    }
  },
    // 'logIn' comes from the actions in modules in the store.
  methods:{
    ...mapActions(['logIn']),
    async submit(){
        if (this.isFormValid){
        const User = new FormData();
        User.append('username', this.form.username)
        User.append('password', this.form.password)
        await this.logIn(User)
        this.$router.push('/dashboard')
    }else{
        console.log('Please fill both password and username')
    }}
  }
})
</script>

// here we have a problem, even if we submit the empty form we get login