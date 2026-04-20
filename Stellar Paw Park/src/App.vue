<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import { useAuthStore } from './stores/authStore';
const authStore = useAuthStore();
authStore.authListenerInit();
</script>

<template>
  <v-app>

    <Header />

    <v-main>
        <RouterView />
    </v-main>

    <Footer />

  </v-app>
</template>