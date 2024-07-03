<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/home">
          <font-awesome-icon icon="home" />
        </router-link>
        <router-link v-if="!user" to="/login">
          <font-awesome-icon icon="right-to-bracket" />
        </router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 Programacion Web</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Mulish', sans-serif;
  background: url("~@/assets/images/images (1).jpg") no-repeat center center fixed;
  background-color: #E6E3DD; /* Color de fondo de respaldo */
  background-size: cover; /* Ajuste para cubrir todo el contenedor */
  min-height: 100vh; /* Mínimo alto de la ventana */
  display: flex;
  flex-direction: column;
  align-items: center;
}

html, body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

header {
  width: 100%;
  background: #30190b;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between; /* Alinear elementos a los lados opuestos */
  align-items: center; /* Centrar verticalmente */
}

nav {
  display: flex;
  justify-content: space-between; /* Distribuye los elementos a los extremos */
  align-items: center; /* Alinea los elementos verticalmente */
  width: 100%;
}


nav a {
  color: #F5F4F2;
  font-weight: bold;
  text-decoration: none;
  padding: 0 15px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

main {
  font-family: 'Mulish', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  width: 100%;
  padding-top: 15px;
  color: #E6E3DD;
  flex-direction: column;
  
}

footer {
  background-color: #30190b;
  color: #F5F4F2;
  width: 100%;
  text-align: center;
  padding: 10px 0;
}

input:focus, textarea:focus, select:focus {
  outline: none;
}
</style>
