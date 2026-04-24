<template>
  <v-container>
    <div class="d-flex">

      <v-navigation-drawer permanent width="200">
        <v-list-item href="#vaccinations" title="Vaccinations"/>
        <v-list-item href="#bookings" title="Bookings" />
      </v-navigation-drawer>

      <div class="flex-grow-1 pa-4">

        <section id="vaccinations">
          <h1>Verify Vaccination Records</h1>
          <v-data-table :items="adminStore.verifyVaccination" :headers="adminStore.headers">
            <template v-slot:item.DOB="{ item }">
              {{ item.DOB?.toDate?.().toLocaleDateString?.() }}
            </template>
            <template v-slot:item.ownderId="{ item }">
              {{ item.DOB?.toDate?.().toLocaleDateString?.() }}
            </template>
            <template v-slot:item.actions="{ item }">
            <v-btn variant="tonal" size="md" 
              @click="adminStore.updateVaccination(item)"
              >Approve
            </v-btn>
          </template>
          </v-data-table>
        </section>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAdminStore } from '../stores/adminStore'
const adminStore = useAdminStore();
adminStore.initDogListener();
</script>