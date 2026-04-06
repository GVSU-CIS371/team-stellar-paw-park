<script setup lang="ts">  
    import { ref } from 'vue';
    import dogBreedsData from '../assets/dogBreeds.json';
    
    const dogBreeds = ref(dogBreedsData as string[]);
    const dogName = ref('');
    const dogBreed = ref('');
    const dogAge = ref<number | null>(null);

    interface Dog {
      name: string;
      breed: string;
      age: number;
    }

    const dogs = ref<Dog[]>([]);

    function addDog(name: string, breed: string, age: number) {
        if (!name || !breed || age === null) {
            return;
        }
        dogs.value.push({ name, breed, age });
        dogName.value = '';
        dogBreed.value = '';
        dogAge.value = null;
    }

</script>

<template>
  <v-container 
    class="fill-height align-center justify-center xs12"
    >
    <v-card class="card">
        <v-card-title>
            User Login
        </v-card-title>
      <v-card-text>
        <v-text-field class="label" label="Email" variant="outlined"></v-text-field>
        <v-text-field class="label" label="Password" variant="outlined" type="password"></v-text-field>
        <v-text-field class="label" label="Confirm Password" variant="outlined" type="password"></v-text-field>
      </v-card-text>
    </v-card>

    <v-card class="card">
      <v-card-title>
        Owner Information
      </v-card-title>
      <v-card-text>
        <v-text-field class="label" label="First Name" variant="outlined"></v-text-field>
        <v-text-field class="label" label="Last Name" variant="outlined"></v-text-field>
        <v-text-field class="label" label="Phone Number" variant="outlined"></v-text-field>
      </v-card-text>
    </v-card>

    <v-card class="card">
      <v-card-title>
        Dog Information
      </v-card-title>
      <v-card-text>
        <v-text-field class="label" label="Dog Name" variant="outlined" v-model="dogName"></v-text-field>
        <v-autocomplete class="label" label="Breed" variant="outlined" :items="dogBreeds" v-model="dogBreed"></v-autocomplete>
        <v-text-field class="label" label="Age" variant="outlined" type="number" v-model.number="dogAge"></v-text-field>
      </v-card-text>
        <v-card-actions>
            <v-btn variant="tonal" @click="addDog(dogName, dogBreed, dogAge)">Add Dog</v-btn>
        </v-card-actions>
    </v-card>

    <v-card class="card">
      <v-card-title>
        Dogs Added
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(dog, index) in dogs" :key="index">
            <v-list-item-content>
              <v-list-item-title>{{ dog.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ dog.breed }} - {{ dog.age }} years old</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
    
    <v-row justify="center" align="center">
        <v-btn variant="tonal" class="mt-4">Submit Registration</v-btn>
    </v-row>

  </v-container>
</template>

<style scoped lang="scss">
    .card {
        max-width: 750px;
        margin: 20px auto;
    }
</style>