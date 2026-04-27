<template>
  <div id="contact">
    <v-container max-width="800">
      <h1>CONTACT US</h1>
      <v-card class="card mb-4 pa-6">
        <p>Have a question, want to book a visit, or need more information about our facility? 
          We’re here to help. Whether it’s about memberships, availability, or your dog’s specific needs, 
          feel free to reach out and we’ll get back to you as soon as possible. 
          We look forward to hearing from you and welcoming you to our park family.</p>
        <v-text-field label="Name" variant="outlined" v-model="contactStore.message.name"></v-text-field>
        <v-text-field label="Email" variant="outlined" v-model="contactStore.message.email"></v-text-field>
        <v-text-field label="Phone" variant="outlined" v-model="contactStore.message.phone"></v-text-field>
        <v-textarea label="Message" variant="outlined" v-model="contactStore.message.message"></v-textarea>
        <v-btn variant="tonal" @click="contactStore.submitForm">Submit</v-btn>
      </v-card>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { useContactStore } from '../stores/contactStore';
const contactStore = useContactStore();
</script>