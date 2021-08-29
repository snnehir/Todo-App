<template>
    <div class="login_register_container">
      <h3 class="text-2xl text-center mt-3 mb-3">Login 🐱‍🏍</h3>
      <input v-model="user.username" type="text" placeholder="Username" class="input mb-3" />
      <input v-model="user.password" type="password" placeholder="Password" class="input mb-3" />
      <button @click="onLogin" class="default-button">Login</button>
      <span class="text-center mt-3 text-sm">
        I don't have an account,
        <router-link :to=" {name: 'RegisterPage'} " class="text-red-900 hover:text-black">Sign up</router-link>
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
                password: null
            }
        }
    },
    
    methods: {
        onLogin(){
            const password = CryptoJS.HmacSHA1(this.user.password, "saltKey123").toString()
            this.$appAxios.get(`/users?username=${this.user.username}&password=${password}`)
                .then(res =>{
                    // console.log(res.data)
                    this.$store.commit("setUser", res.data[0])
                    this.$router.push({name: "HomePage"})
                }
            )
            
        }
    }
}
</script>