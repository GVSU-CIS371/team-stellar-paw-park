<script setup lang="ts">  
  import logo from '../assets/images/StellarParkThree.png'
</script>

<template>
  <v-container 
    class="fill-height d-flex align-center justify-center"
    :style="{
      backgroundImage: `url(${logo})`,
      backgroundSize: '100% 120%',
      backgroundPosition: 'center'
    }"
    >
    <v-card width="400" class="pa-4">

      <v-card-title>
        Login
      </v-card-title>

      <v-card-text>
        <v-text-field class="label" label="Email" variant="outlined"></v-text-field>
        <v-text-field class="label" label="Password" variant="outlined" type="password"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn variant="tonal" >Login</v-btn>
        <v-btn to="/register" variant="tonal" >Register</v-btn>
      </v-card-actions>

    </v-card>
  </v-container>
</template>

<style scoped lang="scss">

</style>