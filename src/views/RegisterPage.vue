<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mt-3 mb-3">Sign Up 🐱‍🚀</h3>
      <input v-model="user.fullname" type="text" placeholder="Fullname" class="input mb-3"/>
      <input v-model="user.username" type="text" placeholder="Username" class="input mb-3" />
      <input v-model="user.password" type="password" placeholder="Password" class="input mb-3" />
      <button @click="onLogin" class="default-button">Sign Up</button>
      <span class="text-center mt-3 text-sm">
        I have an account already,
        <router-link :to=" {name: 'LoginPage'} " class="text-red-900 hover:text-black">Login</router-link>
      </span>
    </div>
</template>

<script>
import CryptoJS from "crypto-js"
export default {
    data(){
        return {
            user: {
                username: null,
                fullname: null,
                password: null,
                todoList: []
            }
        }
    },
    methods: {
        onLogin(){
            const password = CryptoJS.HmacSHA1(this.user.password, "saltKey123").toString()
            const user = {...this.user, password: password}
            
            this.$appAxios.post("/users", user).then(res => {
                console.log("register -> ",res)
                this.$router.push({name: "LoginPage"})
            })
            
        }
    }
}
</script>