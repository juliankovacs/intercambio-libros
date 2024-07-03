<template>
  <div class="login-container">
    <h2 class="login-title">Log In</h2>
    <form @submit.prevent="login" class="login-form">
      <div class="input-wrapper">
        <input v-model="email" type="email" placeholder="Email" class="form-input" />
      </div>
      <div class="input-wrapper">
        <input v-model="password" type="password" placeholder="Password" class="form-input" />
      </div>
      <button type="submit" class="login-btn">Iniciar sesión</button>
    </form>
    <nav>
      <router-link to="/registro" class="signup-btn">Sign Up</router-link>
    </nav>
    
    <div class="forgot">Forgot Password?</div>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        const user = userCredential.user;
        alert("Inicio de sesión exitoso para " + user.email);
        localStorage.setItem('userEmail', user.email);
        this.$router.push('/registrarLibro'); 
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 375px;
  padding: 20px;
  background: #E6E3DD;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-title {
  width: 100%;
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
  text-align: center;
  color: #30190b;
  margin-bottom: 40px;
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

.login-btn {
  width: 100%;
  height: 63px;
  background: #30190b;
  border-radius: 31.5px;
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
  color: #E6E3DD;
  border: none;
  cursor: pointer;
  margin-bottom: 20px;
}
.login-btn:hover {
  background-color: #130f0f;
}
.signup-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 63px;
  background: rgba(200, 196, 183, 0.72);
  border-radius: 31.5px;
  font-family: 'Mulish', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  color: #30190b;
  text-decoration: none; 
  cursor: pointer;
  border: none;
  margin-bottom: 20px;
}

.signup-btn:hover {
  background-color: #c3afaf;
}

.forgot {
  width: 100%;
  font-family: 'Mulish', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  color: #241C1C;
}
</style>
