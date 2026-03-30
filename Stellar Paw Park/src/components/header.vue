<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app-bar>
    <v-app-bar-title> Stellar Paw Park </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn to="/userLogin">Login</v-btn>
    <v-btn to="/userPage">Profile</v-btn>
  </v-app-bar>
<!--
<header class="header">
  <h1 class="logo">Stellar Paw Park</h1>
  <nav class="login">
    <RouterLink to="/userLogin">Login</RouterLink>
    <RouterLink to="/userPage">Profile</RouterLink>
  </nav>
  <nav class="nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/schedule">Schedule</RouterLink>
  </nav>
</header>
-->

</template>

<style scoped lang="scss">

</style>
