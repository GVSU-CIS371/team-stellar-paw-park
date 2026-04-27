<template>
  <div id="booking">
    <v-container width="800" class="mx-auto pa-4">
      <h1>SESSION BOOKING</h1>
      <v-row class="justify-center">
        <v-date-picker 
        title="Pick a date to view available time slots. Must be logged in to sign up."
          class="calendar"
          v-model="bookingStore.selectedDate" 
          @click="bookingStore.formatDate(); bookingStore.errorMessage = ''"
          :weekday-format="$vuetify.display.width > 550 ? 'long' : 'short'"
          width="800"
        ></v-date-picker>
        <p>{{ bookingStore.callendarMessage }}</p>
      </v-row>
      
      <v-row>
        <v-col
          v-for="(slot, index) in bookingStore.timeSlots"
          :key="index"
          cols="4"
        >
          <v-card class="card mb-4 pa-4" @click="bookingStore.selectedSlot = slot; bookingStore.checkBooking(userStore.user?.userId)">
            <div class="d-flex align-center">
              <div>
                <v-card-title class="pa-0">{{ bookingStore.formatHour(slot.hour) }}</v-card-title>
                <v-card-text class="pa-0">
                  <div>Area Name: {{ slot.name }}</div>
                  <div>Capacity: {{ slot.currentCapacity }} / {{ slot.maxCapacity }}</div>
                  <div>Public/Private: {{ slot.type }} </div>
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>

  <v-dialog v-model="bookingStore.showError" max-width="400">
    <v-card>
      <v-card-title>Error</v-card-title>
      <v-card-text>
        {{ bookingStore.errorMessage }}
      </v-card-text>
    </v-card>
    </v-dialog>
    <v-dialog v-model="bookingStore.booking" max-width="400">
    <v-card>
      <v-card-title>Select Dog(s) to add to Booking</v-card-title>
      <v-card-text>
        <v-select 
        v-model="bookingStore.selectedDogId"
        :items="bookingStore.checkUserDogs(userStore.dogs)"
        item-title="name"
        item-value="id"
        multiple
        />
      </v-card-text>
      <v-card-actions>
        <v-btn @click="bookingStore.booking=false; bookingStore.selectedDogId=[]">Cancel</v-btn>
        <v-btn v-if="userStore.user" @click="bookingStore.addBooking(userStore.user)">Book</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useBookingStore } from '../stores/bookingStore';
import { useUserStore } from '../stores/userStore';
const bookingStore = useBookingStore();
const userStore = useUserStore();
bookingStore.bookingsInit();
</script>