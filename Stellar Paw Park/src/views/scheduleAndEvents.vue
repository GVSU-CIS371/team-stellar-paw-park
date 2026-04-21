<template>

  <v-container width="800" height="600" class="mx-auto pa-4">
    <v-row>
      <v-btn icon @click="prevMonth">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <h2> {{ formattedMonth }}</h2>
      <v-btn icon @click="nextMonth">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
    <v-calendar
    ref="calendar"
    v-model="start"
    type="month"
    :events="events"
    color="primary"
    />
  </v-container>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const start = ref(new Date())
const formattedMonth = computed(() =>
  start.value.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
)
function prevMonth() {
  const d = new Date(start.value)
  d.setMonth(d.getMonth() - 1)
  start.value = d
}
function nextMonth() {
  const d = new Date(start.value)
  d.setMonth(d.getMonth() + 1)
  start.value = d
}

const events = ref([
  {
    title: 'Small Dog Playtime',
    start: new Date(2026, 3, 21), // April 21, 2026
    end: new Date(2026, 3, 21),
    color: 'green'
  },
  {
    title: 'Large Dog Session',
    start: new Date(2026, 3, 22),
    end: new Date(2026, 3, 22),
    color: 'blue'
  },
  {
    title: 'Private Booking',
    start: new Date(2026, 3, 25),
    end: new Date(2026, 3, 25),
    color: 'red'
  }
])

</script>

<style scoped lang="scss">

</style>
