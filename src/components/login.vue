<template>
  <div class="login-container">
    <h2 class="login-title">Log In</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="input-wrapper">
        <input v-model="email" type="email" placeholder="Email" class="form-input" />
      </div>
      <div class="input-wrapper">
        <input :type="passwordFieldType" v-model="password" placeholder="Password" class="form-input" />
        <font-awesome-icon :icon="passwordFieldType === 'password' ? 'eye-slash' : 'eye'" @click="togglePasswordVisibility" class="toggle-password-icon" />
      </div>
      <button type="submit" class="login-btn">Iniciar sesión</button>
    </form>
    <nav>
      <router-link to="/registro" class="signup-btn">Sign Up</router-link>
    </nav>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password"
    };
  },
  methods: {
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        alert("Inicio de sesión exitoso para " + user.email);
        localStorage.setItem('userEmail', user.email);
        this.$router.push('/home');
      } catch (error) {
        alert(error.message);
      }
    },
    togglePasswordVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    }
  }
};
</script>

<style scoped lang="css" src="@/assets/styles/login-styles.css"></style>
