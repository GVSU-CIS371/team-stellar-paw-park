<template>
  <v-container
    class="login-container"
    :style="{
      backgroundImage: `url(${logo})`,
      backgroundSize: '80% 80%',
      backgroundPosition: 'center'
    }"
    >
    <v-card width="400" class="pa-4 login-card">
      <v-card-title>
        Login or Register
      </v-card-title>
      <v-card-text>
        <v-text-field class="label" label="Email" variant="outlined" v-model="authStore.email"></v-text-field>
        <v-text-field class="label" label="Password" variant="outlined" type="password" v-model="authStore.password"></v-text-field>
      </v-card-text>
      <p>{{ authStore.message }}</p>
      <v-card-actions>
        <v-btn variant="tonal" @click="loginWithEmail">Login</v-btn>
        <v-btn variant="tonal" @click="registerWithEmail">Register</v-btn>
        <v-btn variant="tonal" @click="loginWithGoogle">Login with Google</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">  
  import logo from '../assets/images/StellarParkThree.png'
  import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import { useAuthStore } from '../stores/authStore';
  const authStore = useAuthStore();

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        authStore.message = "Google login successful";
        authStore.setUser(result.user);
      })
      .catch((error) => {
        authStore.message = "Google login failed. Please try again.";
      });
  }
  function loginWithEmail(email: string, password: string) {
    signInWithEmailAndPassword(getAuth(), authStore.email, authStore.password)
      .then((result) => {
        authStore.message = "Login successful";
        authStore.setUser(result.user);
      })
      .catch((error) => {
        authStore.message = "Failed to login. Please check your email and password or register.";
      });
  }
  function registerWithEmail(email: string, password: string) {
    createUserWithEmailAndPassword(getAuth(), authStore.email, authStore.password)
      .then((result) => {
        authStore.message = "Registration successful";
        authStore.setUser(result.user);
      })
      .catch((error) => {
        authStore.message = "Failed to register. Try logging in.";
      });
  }

</script>

<style scoped lang="scss">
.login-container {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-card {
  margin: auto;
}
</style>