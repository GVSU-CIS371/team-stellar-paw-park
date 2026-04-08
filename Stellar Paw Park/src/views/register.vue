<script setup lang="ts">  
    import { ref } from 'vue';
    import dogBreedsData from '../assets/dogBreeds.json';
    import { File } from 'buffer';
    
    const dogBreeds = ref(dogBreedsData as string[]);
    const dogName = ref('');
    const dogDOB = ref('');
    const dogBreed = ref('');
    const dogAge = ref<number | null>(null);
    const dogPhoto = ref<File | null>(null);

    interface Dog {
      name: string;
      breed: string;
      DOB: string;
      age: number;
      photo: File | null;
    }

    const dogs = ref<Dog[]>([]);

    function addDog() {
        if (!dogName.value || !dogBreed.value || !dogDOB.value) {
            return;
        }
        // Calculate age based on DOB and format DOB as MM-DD-YYYY
        const currentYear = new Date().getFullYear();
        const birthDay = new Date(dogDOB.value).getDate();
        const birthMonth = new Date(dogDOB.value).getMonth();
        const birthYear = new Date(dogDOB.value).getFullYear();
        const birthDate = `${String(birthMonth + 1).padStart(2, '0')}-${String(birthDay).padStart(2, '0')}-${birthYear}`;
        const age = currentYear - birthYear;
        
        dogs.value.push({ name: dogName.value, breed: dogBreed.value, birthDate, age, photo: dogPhoto.value });
        
        // Reset form fields after adding the dog
        dogName.value = '';
        dogBreed.value = '';
        dogDOB.value = '';
        dogAge.value = null;
        dogPhoto.value = null;
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
        <v-text-field label="Email" variant="outlined"></v-text-field>
        <v-text-field label="Password" variant="outlined" type="password"></v-text-field>
        <v-text-field label="Confirm Password" variant="outlined" type="password"></v-text-field>
      </v-card-text>
    </v-card>

    <v-card class="card">
      <v-card-title>
        Owner Information
      </v-card-title>
      <v-card-text>
        <v-text-field label="First Name" variant="outlined"></v-text-field>
        <v-text-field label="Last Name" variant="outlined"></v-text-field>
        <v-text-field label="Phone Number" variant="outlined"></v-text-field>
      </v-card-text>
    </v-card>

    <v-card class="card">
      <v-card-title>
        Dog Information
      </v-card-title>
      <v-card-text>
        <v-text-field label="Dog Name" variant="outlined" v-model="dogName"></v-text-field>
        <v-autocomplete label="Breed" variant="outlined" :items="dogBreeds" v-model="dogBreed"></v-autocomplete>
        <v-date-input label="Date of Birth" variant="outlined" v-model="dogDOB"></v-date-input>
        <v-file-input label="Upload Photo" variant="outlined" accept="image/*" prepend-icon="mdi-camera" v-model="dogPhoto"></v-file-input>
      </v-card-text>
        <v-card-actions>
            <v-btn variant="tonal" @click="addDog">Add Dog</v-btn>
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