<template>
  <v-container
    class="login-container"
    :style="{
      backgroundImage: `url(${logo})`,
      backgroundSize: '80% 80%',
      backgroundPosition: 'center'
    }"
    >
    <v-card v-if="!authStore.signUp" width="400" class="pa-4 login-card">
      <v-card-title>
        Login
      </v-card-title>
      <v-card-text>
        <v-text-field class="label" label="Email" variant="outlined" v-model="authStore.email"></v-text-field>
        <v-text-field class="label" label="Password" variant="outlined" type="password" v-model="authStore.password1"></v-text-field>
      </v-card-text>
      <p>{{ authStore.message }}</p>
      <v-card-actions>
        <v-btn variant="tonal" @click="loginWithEmail">Login</v-btn>
        <v-btn variant="tonal" @click="authStore.signUp = true">Sign Up</v-btn>
        <v-btn variant="tonal" @click="loginWithGoogle">Login with Google</v-btn>
      </v-card-actions>
    </v-card>
      <v-card v-else width="400" class="pa-4 login-card">
        <v-card-title>
          Register
        </v-card-title>
        <v-card-text>
          <v-text-field class="label" label="Email" variant="outlined" v-model="authStore.email"></v-text-field>
          <v-text-field class="label" label="Password" variant="outlined" type="password" v-model="authStore.password1"></v-text-field>
          <v-text-field class="label" label="Confirm Password" variant="outlined" type="password" v-model="authStore.password2"></v-text-field>
          <v-text-field class="label" label="First Name" variant="outlined" v-model="authStore.fname"></v-text-field>
          <v-text-field class="label" label="Last Name" variant="outlined" v-model="authStore.lname"></v-text-field>
        </v-card-text>
        <p>{{ authStore.message }}</p>
        <v-card-actions>
          <v-btn variant="tonal" @click="authStore.signUp = false">Back to Login</v-btn>
          <v-btn variant="tonal" @click="registerWithEmail">Sign Up</v-btn>
        </v-card-actions>
      </v-card>
  </v-container>
</template>

<script setup lang="ts">  
  import logo from '../assets/images/StellarParkThree.png'
  import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import { useAuthStore } from '../stores/authStore';
  import { useRouter } from 'vue-router';
  const authStore = useAuthStore();
  const router = useRouter();

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        authStore.message = "Google login successful";
        authStore.setUser(result.user);
        router.push('/userPage');
      })
      .catch((error) => {
        authStore.message = "Google login failed. Please try again.";
      });
  }
  function loginWithEmail() {
    signInWithEmailAndPassword(getAuth(), authStore.email, authStore.password1)
      .then((result) => {
        authStore.message = "Login successful";
        authStore.setUser(result.user);
        router.push('/userPage');
      })
      .catch((error) => {
        authStore.message = "Failed to login. Please check your email and password or register.";
      });
  }
  function registerWithEmail() {
    if (!authStore.password1 || !authStore.password2 || !authStore.email || !authStore.fname || !authStore.lname) {
      authStore.message = "Please fill in all fields.";
      return;
    }
    if (authStore.password1 !== authStore.password2) {
      authStore.message = "Passwords do not match. Please try again.";
      return;
    }
    createUserWithEmailAndPassword(getAuth(), authStore.email, authStore.password1)
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