<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
</script>

<template>

  <div class="app-container">
    <Header />

    <main>
      <RouterView />
    </main>

    <Footer />
  </div>

</template>

<style scoped lang="scss">
.app-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}
</style>