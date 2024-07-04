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
  data() {
    return {
      user: null // O inicializa con un objeto según sea necesario
    };
  },
  created() {
  if (this.$route.path !== '/home') {
    this.$router.push('/home');
  }
  }

};
</script>

<style lang="css" src="@/assets/styles/app-styles.css"></style>
