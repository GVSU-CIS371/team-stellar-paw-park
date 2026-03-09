<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>

<header class="header">
  <h1 class="logo">Stellar Paw Park</h1>
  <nav class="login">
    <RouterLink to="/userLogin">Login</RouterLink>
    <RouterLink to="/userPage">Profile</RouterLink>
  </nav>
  <nav class="nav">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/contact">Contact</RouterLink>
  </nav>
</header>

</template>

<style scoped lang="scss">

.header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  padding: 20px;
}
.logo {
  column: 1 / 2;
  row: 1 / 2;
  font-size: 2.5 rem;
  font-weight: bold;
  color: #cc1212;
}
.login {
  column: 2 / 3;
  row: 1 / 2;
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-right: 20px;
}
.nav {
  column: 1 / 3;
  row: 2 / 3;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
}

</style>
