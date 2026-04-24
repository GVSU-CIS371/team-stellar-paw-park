<template>
  <v-overlay v-if="userStore.loading">
    <v-progress-circular indeterminate />
</v-overlay>
  
  <v-container v-else>
    <div class="d-flex">

    <v-navigation-drawer permanent width="200">
      <h1 style="font-size: 25px;" >{{ userStore.user?.name }}</h1>
      <v-divider />
      <v-list-item href="#dogs" title="Dogs"/>
      <v-list-item href="#bookings" title="Bookings" />
    </v-navigation-drawer>

    <div class="flex-grow-1 pa-4">

      <section id="dogs">
        <h1>Your Dogs:</h1>

        <v-row>
          <v-col
            v-for="(dog, index) in userStore.dogs"
            :key="dog.name || index"
            cols="12"
            :xl="6"
          >
            <v-card class="mb-4 pa-4">
              <div class="d-flex align-center">

                <div class="d-flex align-center flex-grow-1">
                  <v-img class="image-placeholder mr-4"/>
                  <div>
                    <v-card-title class="pa-0"> {{ dog.name }} </v-card-title>
                    <v-card-text class="pa-0">
                      <div>Breed: {{ dog.breed }}</div>
                      <div>Color: {{ dog.color }}</div>
                      <div>DOB: {{ dog.DOB?.toDate?.().toLocaleDateString?.() }} </div>
                    </v-card-text>
                  </div>
                </div>

                <div class="d-flex flex-column align-center">
                  <div class="d-flex">
                  <v-btn
                    class="mr-10"
                    variant="text"
                    icon="mdi-pencil"
                    @click="dogStore.dog = JSON.parse(JSON.stringify(dog)); dogStore.editDogInfo = true"
                  />
                  <v-btn
                    variant="text"
                    icon="mdi-delete"
                    @click="dogStore.dog = JSON.parse(JSON.stringify(dog)); 
                    userStore.confirmation = true; 
                    dogStore.deleteDogInfo = true"
                  />
                  </div>
                  <v-checkbox v-model="dog.vaccinated" disabled label="Vaccination Verified" />
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-btn
          v-if="!dogStore.newDogInfo"
          class="mt-4"
          @click="dogStore.newDogInfo = true"
        >Add dog</v-btn>

        <v-card width="600" class="pa-4 mt-4" v-if="dogStore.newDogInfo || dogStore.editDogInfo"> 
          <v-card-title>Add/Edit Dog</v-card-title> 
          <v-text-field label="Dog Name" variant="outlined" v-model="dogStore.dog.name"></v-text-field> 
          <v-combobox label="Dog Breed" :items="dogBreeds" variant="outlined" v-model="dogStore.dog.breed"></v-combobox> 
          <v-text-field label="Color" variant="outlined" v-model="dogStore.dog.color"></v-text-field> 
          <v-date-input label="Dog DOB" variant="outlined" v-model="dogStore.dog.DOB"></v-date-input> 
          <v-row> 
            <v-file-input max-width="250" max-height="250" label="Upload Dog Image" prepend-icon="mdi-camera" variant="outlined" accept=".jpg,.jpeg,.png"></v-file-input> 
            <v-file-input max-width="250" max-height="250" label="Upload Vaccination Records" prepend-icon="mdi-camera" variant="outlined" accept=".jpg,.jpeg,.png,.pdf"></v-file-input> 
          </v-row> 
          <v-card-actions> 
            <v-btn variant="tonal" @click="dogStore.newDogInfo = false; dogStore.editDogInfo = false; dogStore.dog = {} as dogType">Cancel</v-btn> 
            <v-btn v-if="userStore.user?.userId && dogStore.newDogInfo" variant="tonal" @click="dogStore.addDog(userStore.user.userId)">Add Dog</v-btn> 
            <v-btn v-if="userStore.user?.userId && dogStore.editDogInfo" variant="tonal" @click="dogStore.editDog(userStore.user.userId)">Edit Dog</v-btn> 
          </v-card-actions> 
        </v-card>
      </section>

      <v-divider class="my-4"/>

      <h1>Scheduled Bookings</h1>
      <section id="bookings">
        <v-data-table :items="userStore.bookings" :headers="userStore.headers">
          <template v-slot:item.dogs="{ item }">
            {{ item.dogs.join(", ") }}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn variant="tonal" size="md" 
              @click="userStore.deleteBookingId = item.id;
              userStore.confirmation = true;
              userStore.deleteBooking = true"
              >Cancel
            </v-btn>
          </template>
        </v-data-table>
      </section>
    </div>
  </div>
  </v-container>

  <v-dialog v-model="userStore.confirmation" max-width="400">
      <v-card v-if="userStore.deleteBooking">
        <v-card-title>Warning</v-card-title>
        <v-card-text>
          <p>This action cannot be done.</p>
          <p>Are you sure you want to cancel this booking?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="userStore.confirmation = false; userStore.deleteBooking = false">Cancel</v-btn>
          <v-btn @click="userStore.cancelBooking()">Confirm</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-else-if="dogStore.deleteDogInfo">
        <v-card-title>Warning</v-card-title>
        <v-card-text>
          <p>This action cannot be done.</p>
          <p>Are you sure you want to take</p>
          <p>{{ dogStore.dog.name }} off of your account?</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="userStore.confirmation = false; dogStore.deleteDogInfo = false">Cancel</v-btn>
          <v-btn @click="dogStore.deleteDog(JSON.parse(JSON.stringify(dogStore.dog))); userStore.confirmation = false">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script setup lang="ts">  
import { useDogStore } from '../stores/dogStore';
import { useUserStore } from '../stores/userStore';
import dogBreeds from '../assets/dogBreeds.json'
import { dogType } from '@/types/storeTypes';
const dogStore = useDogStore();
const userStore = useUserStore();
</script>

<style lang="scss">

</style>