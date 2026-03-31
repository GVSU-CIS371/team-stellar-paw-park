<script setup lang="ts">
  import logo from '../assets/images/StellarParkTwo.png'
  import { ref } from 'vue'
  const drawer = ref(false)
</script>

<template>

  <v-app-bar height="150" >
    
    <v-app-bar-title>
      <router-link to="/">
        <v-img :src="logo" height="150"/>
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    
    <v-btn to="/userLogin">Login</v-btn>
    <v-btn to="/userPage">Profile</v-btn>
  </v-app-bar>

  <v-navigation-drawer location="right" v-model="drawer">
    <v-list>
      <v-list-item to="/">Home</v-list-item>
      <v-list-item to="/about">About</v-list-item>
      <v-list-item to="/scheduleAndEvents">Schedule</v-list-item>
      <v-list-item to="/faq">FAQ</v-list-item>
      <v-list-item to="/contactUs">Contact Us</v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>

<style scoped lang="scss">

</style>
