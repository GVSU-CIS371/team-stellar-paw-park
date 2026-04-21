<template>
  <v-container max-width="800">
    <h1>About Us</h1>
    <v-divider class="my-4"></v-divider>
    <h2 class="mb-4">Our Family</h2>

    <!-- Co-Owner 1 (Left Image) -->
    <v-card class="mb-4 pa-4">
      <div class="d-flex align-center">
        <!-- Image Placeholder -->
        <div class="image-placeholder mr-4"></div>

        <!-- Text -->
        <div>
          <v-card-title>Chase Sloma</v-card-title>
          <v-card-subtitle>Co-Owner</v-card-subtitle>
          <v-card-text>
            Chase co-owns the park and brings years of hands-on experience in dog care and facility management. He’s passionate about building a welcoming space for both dogs and their owners.
          </v-card-text>
        </div>
      </div>
    </v-card>

    <!-- Co-Owner 2 (Right Image) -->
    <v-card class="mb-4 pa-4">
      <div class="d-flex align-center justify-space-between">
        <!-- Text -->
        <div>
          <v-card-title>Keren Sloma</v-card-title>
          <v-card-subtitle>Co-Owner</v-card-subtitle>
          <v-card-text>
            Keren is a co-owner with a strong background in dog behavior and training. She focuses on creating enriching experiences and ensuring every dog feels safe and confident.
          </v-card-text>
        </div>

        <!-- Image Placeholder -->
        <div class="image-placeholder ml-4"></div>
      </div>
    </v-card>

    <!-- Dog 1 (Left Image) -->
    <v-card class="mb-4 pa-4">
      <div class="d-flex align-center">
        <!-- Image Placeholder -->
        <div class="image-placeholder mr-4"></div>

        <!-- Text -->
        <div>
          <v-card-title>Nova</v-card-title>
          <v-card-subtitle>Park Ambassador 🐾</v-card-subtitle>
          <v-card-text>
            Nova is one of the owners’ dogs and a regular at the park. Friendly and energetic, she loves meeting new dogs and helping them feel comfortable in the space.
          </v-card-text>
        </div>
      </div>
    </v-card>

    <!-- Dog 2 (Right Image) -->
    <v-card class="mb-4 pa-4">
      <div class="d-flex align-center justify-space-between">
        <!-- Text -->
        <div>
          <v-card-title>Arie</v-card-title>
          <v-card-subtitle>Park Ambassador 🐾</v-card-subtitle>
          <v-card-text>
            Arie is a calm and gentle presence at the park. She’s great with shy dogs and helps create a relaxed, welcoming atmosphere for everyone.
          </v-card-text>
        </div>

        <!-- Image Placeholder -->
        <div class="image-placeholder ml-4"></div>
      </div>
    </v-card>

    <v-divider class="my-4"></v-divider>

    <h2 class="mb-4">Our Park</h2>
    <!-- PARK INFO SECTION -->
    <div class="d-flex gap-4 flex-wrap justify-center mt-6">

      <!-- Indoor Park -->
      <v-card class="pa-4 flex-card">
        <v-card-title>Indoor Park</v-card-title>
        <v-card-text>
          <p>
            Our indoor facility is designed for year-round enrichment and safe play regardless of weather.
          </p>

          <ul>
            <li><strong>Small Dog Area:</strong> Safe, low-energy play zone for smaller breeds.</li>
            <li><strong>Large Dog Area:</strong> Open space for active, larger dogs to socialize and play.</li>
            <li><strong>Private Area:</strong> Reserved space for one-on-one or controlled group sessions.</li>
          </ul>

          <p class="mt-2">
            Each area includes agility-style obstacles, with more advanced setups available upon request for training or enrichment sessions.
          </p>
        </v-card-text>
      </v-card>

      <!-- Outdoor Park -->
      <v-card class="pa-4 flex-card">
        <v-card-title>Outdoor Park</v-card-title>
        <v-card-text>
          <p>
            Our outdoor space gives dogs a natural environment to explore, run, and relax.
          </p>

          <ul>
            <li><strong>Open Play Field:</strong> Large grassy area for free running and group play.</li>
            <li><strong>Enclosed Wooded Trail:</strong> Fenced forest path for supervised exploration and sensory enrichment.</li>
          </ul>

          <p class="mt-2">
            The outdoor park is designed to balance freedom with safety, offering both structured and natural experiences.
          </p>
        </v-card-text>
      </v-card>

    </div>

    <v-divider class="my-4"></v-divider>

    <h2 class="mb-4">Park Policies</h2>

    <v-card class="pa-4">
      <v-card-text>
        <ul class="policy-list">
          <li><strong>Vaccinations Required:</strong> All dogs must be up-to-date on core vaccinations.</li>
          <li><strong>Health Requirement:</strong> Dogs must be free of illness, parasites, or injury.</li>
          <li><strong>Supervision:</strong> Owners must supervise their dogs at all times unless in a private booking.</li>
          <li><strong>Behavior Policy:</strong> Aggressive or unsafe behavior is not permitted.</li>
          <li><strong>Leash Rules:</strong> Dogs must be leashed when entering and exiting.</li>
          <li><strong>Area Guidelines:</strong> Use appropriate play zones for your dog’s size and temperament.</li>
          <li><strong>Clean-Up:</strong> Owners are responsible for cleaning up after their dogs.</li>
          <li><strong>No Food:</strong> Food and treats are not allowed in shared play areas.</li>
          <li><strong>Children:</strong> Children must be supervised at all times.</li>
          <li><strong>Private Bookings:</strong> Sessions must start and end within reserved time.</li>
          <li><strong>Equipment Use:</strong> Use obstacles safely; advanced setups available upon request.</li>
          <li><strong>Outdoor Access:</strong> May vary depending on weather conditions.</li>
          <li><strong>Liability:</strong> Owners are responsible for their dog’s actions and interactions.</li>
        </ul>
      </v-card-text>
    </v-card>

  </v-container>

  
</template>

<style scoped>
.image-placeholder {
  width: 120px;
  height: 120px;
  background-color: #e0e0e0;
  border-radius: 12px;
  flex-shrink: 0;
}
.flex-card {
  flex: 1 1 380px;
  max-width: 390px;
}
ul {
  padding-left: 18px;
}
.policy-list {
  padding-left: 18px;
}
.policy-list li {
  margin-bottom: 8px;
}
</style>