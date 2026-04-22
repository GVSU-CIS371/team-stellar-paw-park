<script setup lang="ts">
  import logo from '../assets/images/StellarParkTwo.png'
  import { ref } from 'vue'
  import { useAuthStore } from '../stores/authStore';
  import { useUserStore } from '../stores/userStore';
  const authStore = useAuthStore();
  const userStore = useUserStore();
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
    
    <v-btn v-if="userStore.user?.admin" to="/admin">Account</v-btn>
    <v-btn v-else-if="authStore.user" to="/userPage">Profile</v-btn>
    <v-btn v-else to="/userLogin">Login</v-btn>

  </v-app-bar>

  <v-navigation-drawer location="right" v-model="drawer">
    <v-list>
      <v-list-item to="/">Home</v-list-item>
      <v-list-item to="/about">About</v-list-item>
      <v-list-item to="/eventsAndBooking">Events/Booking</v-list-item>
      <v-list-item to="/contactUs">Contact Us</v-list-item>
      <v-list-item v-if="authStore.user" @click="authStore.signOut()">Sign Out</v-list-item>
    </v-list>
  </v-navigation-drawer>

</template>