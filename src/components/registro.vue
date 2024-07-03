<template>
  <div class="register-container">
    <h2 class="form-title">Regístrate</h2>
    <form @submit.prevent="register" class="form">
      <div class="input-wrapper">
        <input v-model="email" type="email" placeholder="Email" class="form-input" />
      </div>
      <div class="input-wrapper">
        <input v-model="password" type="password" placeholder="Password" class="form-input" />
      </div>
      <button type="submit" class="form-button">Registrarse</button>
    </form>
  </div>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async register() {
      try {
        await auth.createUserWithEmailAndPassword(this.email, this.password);
        alert("Se ha registrado exitosamente!");
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  width: 375px;
  padding: 20px;
  background: #E6E3DD;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  width: 100%;
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
  text-align: center;
  color: #000000;
  margin-bottom: 40px;
}

.form {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  width: 100%;
  margin-bottom: 20px;
  background: #F5F4F2;
  border-radius: 31.5px;
  display: flex;
  align-items: center;
}

.form-input {
  width: calc(100% - 28px);
  margin: 0 14px;
  padding: 10px 0;
  font-family: 'Mulish', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  color: #30190b;
  border: none;
  background: transparent;
}

.form-button {
  width: 100%;
  height: 63px;
  background: #30190b;
  border-radius: 31.5px;
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #F5F4F2;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}

.form-button:hover {
  background-color: #130f0f;
}
</style>
