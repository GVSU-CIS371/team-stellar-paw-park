<template>
  <div id="homepage">

    <v-carousel hide-delimiter-background cycle :interval="5000" height="60vh">
      <v-carousel-item v-for="(image, index) in images" :key="index">
        <v-img :src="image" cover height="100%" width="100%"></v-img>
        <div class="carousel-overlay"></div>
      </v-carousel-item>
    </v-carousel>

    <v-container class="our-story">
      <h2>Our Dream</h2>
      <v-col justify="center" align="center">
        <p>
          What started as a simple challenge at home quickly became a bigger idea.
        </p>
        <p>
          As proud owners of two energetic Australian Shepherds, we know firsthand how important daily exercise,
          stimulation, and safe socialization are for happy, healthy dogs. But like many dog owners,
          we found ourselves facing the same frustrating problem—what do you do when the weather just doesn't cooperate?
        </p>
        <p>
          Rain, snow, extreme heat, or icy conditions can make outdoor play difficult, and sometimes even unsafe.
          On those days, it felt like there were very few reliable options to give our dogs the activity they truly need.
        </p>
        <p>
          That's where the idea for our dog park was born.
        </p>
        <p>
          We envisioned a space where dogs could run, play,
          and burn off energy regardless of the weather—while owners could feel confident knowing the environment is clean,
          controlled, and safe. A place designed not just for convenience, but for peace of mind.
        </p>
        <p>
          Our indoor facility is built around that vision. By offering structured play areas, scheduled sessions,
          and a membership system with verified vaccinations, we aim to create a community where every dog can enjoy themselves safely,
          and every owner can relax knowing their pet is in good company.
        </p>
        <p>
          At the same time, we didn't want to lose what makes outdoor adventures special.
          That's why our outdoor space remains open and accessible, giving dogs the freedom to explore, roam,
          and enjoy fresh air when conditions allow.
        </p>
        <p>
          This project is more than just a business idea—it's something we wish existed for our own dogs.
          And that's exactly why we're building it.
        </p>
        <p>
          Because every dog deserves a place to play—rain or shine.
        </p>
      </v-col>
    </v-container>

    <v-container class="map" justify="center" align="center">
      <h2>Find Us</h2>
      <v-img :src="mapImage" height="600"></v-img>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import home1 from '../assets/images/home1.jpg'
  import home2 from '../assets/images/home2.jpg'
  import home3 from '../assets/images/home3.jpg'
  import home4 from '../assets/images/home4.jpg'
  import home5 from '../assets/images/home5.jpg'
  import home6 from '../assets/images/home6.jpg'
  import mapImage from '../assets/images/gvsuMap.png'
  
  const images = [home1, home4, home2, home5, home3, home6];

</script>
