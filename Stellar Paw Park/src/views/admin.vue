<template>
  <v-container>
    <div class="d-flex">

      <v-navigation-drawer permanent width="200">
        <v-list-item href="#vaccinations" title="Vaccinations"/>
        <v-list-item href="#customer-messages" title="Customer Messages"/>
        <v-list-item href="#bookings" title="Bookings" />
      </v-navigation-drawer>

      <div class="flex-grow-1 pa-4">

        <section id="vaccinations">
          <h1>Verify Vaccination Records</h1>
          <v-data-table :items="adminStore.verifyVaccination" :headers="adminStore.dogHeaders">
            <template v-slot:item.vaccinationImg="{ item }">
              <v-btn
                v-if="item.vaccinationImg"
                variant="text"
                :href="item.vaccinationImg.url"
                target="_blank"
              >
                View PDF
              </v-btn>
              <span v-else>No file</span>
            </template>
            <template v-slot:item.actions="{ item }">
            <v-btn variant="tonal" size="md" 
              @click="adminStore.updateVaccination(item)"
              >Approve
            </v-btn>
          </template>
          </v-data-table>
        </section>

        <section id="customer-messages">
          <h1>Customer Messages</h1>
          <v-data-table :items="adminStore.messages" :headers="adminStore.messageHeaders" item-value="id" show-expand>
            <template v-slot:item.data-table-expand="{ internalItem, isExpanded, toggleExpand}">
              <v-btn
                :append-icon="isExpanded(internalItem) ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                :text="isExpanded(internalItem) ? 'Collapse' : 'Message'"
                @click="toggleExpand(internalItem)"
              ></v-btn>
            </template>
            <template v-slot:expanded-row="{ columns, item }">
              <tr>
                <td :colspan="columns.length">
                  <div class="pa-4">
                    <strong>Message</strong>
                    <div class="mt-2">
                      {{ item.message }}
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-btn variant="tonal" size="md" 
                @click="adminStore.deleteMessage(item.id)"
                >Delete
              </v-btn>
            </template>
          </v-data-table>
        </section>

        <section id="bookings">
          <h1>View Bookings</h1>
          <v-row class="justify-center">
            <v-date-input v-model="adminStore.bookingDate"/>
            <v-btn variant="tonal" @click="adminStore.pullBookings()">Search</v-btn>
          </v-row>
          <v-data-table :items="adminStore.bookingsList"></v-data-table>
        </section>

      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { useAdminStore } from '../stores/adminStore'
const adminStore = useAdminStore();
adminStore.initDogListener();
adminStore.initMessageListener();
</script>