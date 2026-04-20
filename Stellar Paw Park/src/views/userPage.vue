<template>
  <v-contianer v-if="userStore.loading">
    ...Loading
  </v-contianer>
  <v-container v-else>
    <h1>Welcome, {{ userStore.user?.name}}!</h1>
    <p>Email: {{ userStore.user?.email }}</p>
    <p>Phone: {{ userStore.user?.phone}}</p>
    <h2>Your Dogs:</h2>
    <ul>
    </ul>
  </v-container>
</template>

<script setup lang="ts">  
import { useAuthStore } from '../stores/authStore';
import { useDogStore } from '../stores/dogStore';
import { useUserStore } from '../stores/userStore';
const authStore = useAuthStore();
const dogStore = useDogStore();
const userStore = useUserStore();

</script>