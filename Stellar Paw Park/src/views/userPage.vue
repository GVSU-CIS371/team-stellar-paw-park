<template>
  <v-contianer v-if="userStore.loading">
    ...Loading
  </v-contianer>
  
  <v-container v-else>
    <v-row>
      <v-navigation-drawer permanent width="260">
        <v-list-item :title="userStore.user?.name" />
        <v-list-item :title="userStore.user?.email" />
        <v-list-item :title="userStore.user?.phone" />
        <v-divider></v-divider>
        <v-list-item href="#dogs" title="Dogs"/>
        <v-list-item href="#bookings" title="Bookings" />
      </v-navigation-drawer>

      <section id="dogs">
        <h2>Your Dogs:</h2>
        <v-row>
          <v-col
            v-for="(dog, index) in userStore.dogs"
            :key="index"
            cols="12"
            xl="6"
          >
            <v-card class="mb-4 pa-4 h-100">
              <div class="d-flex">
                <div class="image-placeholder mr-4"></div>

                <div class="flex-grow-1">
                  <v-card-title>{{ dog.name }}</v-card-title>
                  <v-card-text class="pa-0">
                    <div>Breed: {{ dog.breed }}</div>
                    <div>Color: {{ dog.color }}</div>
                    <div>DOB: {{ dog.DOB }}</div>
                  </v-card-text>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-btn v-if="!dogStore.dogInfo" @click="dogStore.dogInfo = true" class="mt-4">Add dog</v-btn>

        <v-card width="600" class="pa-4 mt-4" v-if="dogStore.dogInfo">
          <v-card-title>Add Dog</v-card-title>
          <v-text-field label="Dog Name" variant="outlined" v-model="dogStore.dog.name"></v-text-field>
          <v-text-field label="Dog Breed" variant="outlined" v-model="dogStore.dog.breed"></v-text-field>
          <v-text-field label="Color" variant="outlined" v-model="dogStore.dog.color"></v-text-field>
          <v-text-field label="Dog DOB" variant="outlined" v-model="dogStore.dog.DOB"></v-text-field>
          <v-row>
            <v-file-input max-width="250" max-height="250" label="Upload Dog Image" prepend-icon="mdi-camera" variant="outlined" accept=".jpg,.jpeg,.png"></v-file-input>
            <v-file-input max-width="250" max-height="250" label="Upload Vaccination Records" prepend-icon="mdi-camera" variant="outlined" accept=".jpg,.jpeg,.png,.pdf"></v-file-input>
          </v-row>
          <v-card-actions>
            <v-btn variant="tonal" @click="dogStore.dogInfo = false">Cancel</v-btn>
            <v-btn v-if="userStore.user?.userId" variant="tonal" @click="dogStore.addDog(userStore.user.userId)">Add Dog</v-btn>
          </v-card-actions>
        </v-card>

        <v-divider class="my-4"></v-divider>
      </section>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">  
import { useDogStore } from '../stores/dogStore';
import { useUserStore } from '../stores/userStore';
const dogStore = useDogStore();
const userStore = useUserStore();
</script>

<style lang="scss">

</style>