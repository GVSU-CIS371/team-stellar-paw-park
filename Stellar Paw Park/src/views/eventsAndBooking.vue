<template>

  <v-container width="800" height="600" class="mx-auto pa-4">
    <h1>Upcoming Events</h1>
  </v-container>

  <v-divider></v-divider>
  
  <v-container width="800" height="600" class="mx-auto pa-4">
    <h1>Session Booking</h1>
  </v-container>

</template>

<script setup lang="ts">
import { useBookingStore } from '../stores/bookingStore';
const bookingStore = useBookingStore();
</script>
