<template>
  <div class="container mt-3">
    <a v-if="this.$store.getters.isAuthenticated" @click.prevent="onLogout" href="#" class="nav">  
      Logout ↩️
    </a>
    <router-view>
    </router-view>
  </div>
</template>

<script>
  // PROVIDE INJECT 
  export default {
    methods:{
      onLogout(){  
        this.$store.commit("logoutUser");
        this.$router.push({ name: "LoginPage" });
      }
    }
  }
</script>

<style>
  .nav{
    text-decoration: none;
    color: black;
    display: inline;
    margin-right: 30px;
  }
</style>
