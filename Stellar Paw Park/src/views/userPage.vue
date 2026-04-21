<template>
  <v-contianer v-if="userStore.loading">
    ...Loading
  </v-contianer>
  <v-container v-else>
    <h1>Welcome, {{ userStore.user?.name}}!</h1>
    <p>Email: {{ userStore.user?.email }}</p>
    <p>Phone: {{ userStore.user?.phone}}</p>

    <v-divider class="my-4"></v-divider>

    <h2>Your Dogs:</h2>
    <div v-for="(dog, index) in userStore.dogs" :key="index">
      <v-card v-if="index % 2 == 0" class="mb-4">
        <v-card-title>{{ dog.name }}</v-card-title>
        <v-card-text>
          <p>Breed: {{ dog.breed }}</p>
          <p>Color: {{ dog.color }}</p>
          <p>DOB: {{ dog.DOB }}</p>
          <v-checkbox label="Vaccinations Up to Date" :model-value="dog.vaccinated" disabled></v-checkbox>
        </v-card-text>
      </v-card>
      <v-card v-else class="mb-4" color="grey lighten-4">
        <v-card-title>{{ dog.name }}</v-card-title>
        <v-card-text>
          <p>Breed: {{ dog.breed }}</p>
          <p>Color: {{ dog.color }}</p>
          <p>DOB: {{ dog.DOB }}</p>
          <v-checkbox label="Vaccinations Up to Date" :model-value="dog.vaccinated" disabled></v-checkbox>
        </v-card-text>
      </v-card>
    </div>

    <v-btn v-if="!dogStore.dogInfo" @click="dogStore.dogInfo = true">Add dog</v-btn>
    <v-card width="600" class="pa-4" v-if="dogStore.dogInfo">
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
        <v-btn variant="tonal" @click="dogStore.addDog(userStore.user.userId)">Add Dog</v-btn>
      </v-card-actions>
    </v-card>

    <v-divider class="my-4"></v-divider>

  </v-container>
</template>

<script setup lang="ts">  
import { useDogStore } from '../stores/dogStore';
import { useUserStore } from '../stores/userStore';
const dogStore = useDogStore();
const userStore = useUserStore();
</script>