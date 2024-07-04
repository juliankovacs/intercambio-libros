<template>
  <div class="register-container">
    <h2 class="form-title">Regístrate</h2>
    <form @submit.prevent="register" class="form">
      <div class="input-wrapper">
        <input v-model="email" type="email" id="email" name="email" placeholder="Correo electrónico" class="form-input" />
      </div>
      <div class="input-wrapper password-wrapper">
        <input :type="passwordFieldType" v-model="password" id="password" name="password" placeholder="Contraseña" class="form-input" />
        <font-awesome-icon :icon="passwordFieldType === 'password' ? 'eye-slash' : 'eye'" @click="togglePasswordVisibility" class="toggle-password-icon" />
      </div>
      <button type="submit" class="form-button">Registrarse</button>
    </form>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      passwordFieldType: "password"
    };
  },
  methods: {
    async register() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        alert("¡Se ha registrado exitosamente!");
        this.$router.push("/home");
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


<style scoped lang="css" src="@/assets/styles/registro-styles.css"></style>
