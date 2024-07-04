<template>
  <div class="home-container">
    <header class="home-header">
      <nav>
        <router-link to="/home">
          <font-awesome-icon icon="home" />
        </router-link>
        <router-link v-if="!user" to="/login">
          <font-awesome-icon icon="right-to-bracket" />
        </router-link>
        <div v-if="user" class="user-section">
          <span class="welcome-message">
            Bienvenido, {{ user.email }}
          </span>
          <a href="#" @click="logout" class="logout-button">
            <font-awesome-icon icon="right-from-bracket" />
          </a>
        </div>
      </nav>
    </header>
    <main>
      <h1>Bienvenido a la Biblioteca de Intercambio!</h1>
      <div class="search-books-container">
        <div class="search-books-header">
          <h2 class="libros-disponibles">Libros Disponibles</h2>
          <div class="search-container">
            <input type="text" v-model="searchTerm" id="searchTerm" name="searchTerm" placeholder="Buscar libros por título, autor o género">
            <button @click="searchBooks" class="search-button">
              <font-awesome-icon icon="magnifying-glass" />
            </button>
          </div>
        </div>
        <div class="books-background">
          <div class="books-container" v-if="filteredBooks.length > 0">
            <div v-for="book in filteredBooks" :key="book.id" class="book">
              <img :src="book.imageUrl" alt="Imagen del libro" class="book-image" />
              <div class="book-details">
                <h3>{{ book.title }}</h3>
                <p>Autor: {{ book.author }}</p>
                <p>Género: {{ book.genre }}</p>
                <p>Compartido por: {{ book.userEmail }}</p>
              </div>
              <button @click="exchangeBook(book.id, book.title)" class="exchange-button">Intercambiar</button>
            </div>
          </div>
          <div v-else>
            <p>No se encontraron libros con los criterios de búsqueda.</p>
          </div>
        </div>

        <div v-if="user">
          <h2>Mis Libros Publicados</h2>
          <div class="user-books-background">
            <div class="books-container" v-if="userBooks.length > 0">
              <div v-for="book in userBooks" :key="book.id" class="book">
                <img :src="book.imageUrl" alt="Imagen del libro" />
                <h3>{{ book.title }}</h3>
                <p>Autor: {{ book.author }}</p>
                <p>Género: {{ book.genre }}</p>
                <p>{{ book.userEmail }}</p>
                <div class="book-actions">
                  <button @click="editBook(book.id)" class="edit-button">
                    <font-awesome-icon icon="pen-to-square" />
                  </button>
                  <button @click="deleteBook(book.id)" class="delete-button">
                    <font-awesome-icon icon="trash" />
                  </button>
                </div>
              </div>
            </div>
            <div v-else>
              <p>No has publicado ningún libro aún.</p>
            </div>
            <router-link to="/registrarlibro" class="registrar-libro-link">Registrar Libro</router-link>
          </div>

        <div class="exchange-requests-container">
        <h2>Solicitudes de Intercambio</h2>
        <div v-if="exchangeRequests.length > 0">
          <div v-for="request in exchangeRequests" :key="request.id" class="exchange-request">
            <p>Solicitud de intercambio del libro {{ request.bookTitle }} por {{ request.senderemail }}</p>
            <div class="exchange-request-buttons">
              <button @click="acceptExchangeRequest(request.id)" class="accept-button">Aceptar</button>
              <button @click="rejectExchangeRequest(request.id)" class="reject-button">Rechazar</button>
            </div>
          </div>
        </div>
        <div v-else>
          <p>No tienes solicitudes de intercambio pendientes.</p>
        </div>
      </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { auth, database } from "../firebase";
import {
  fetchAllBooks,
  fetchUserBooks,
  deleteBook,
  editBook,
  logout,
  searchBooks,
  exchangeBook,
  listenForExchangeRequests,
  acceptExchangeRequest,
  rejectExchangeRequest
} from "@/assets/homemethods.js";

export default {
  data() {
    return {
      user: null,
      allBooks: [],
      userBooks: [],
      searchTerm: '',
      filteredBooks: [],
      exchangeRequests: []
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.user = user;
      fetchAllBooks.call(this); // Llama a la función para obtener todos los libros
      if (user) {
        fetchUserBooks.call(this); // Llama a la función para obtener los libros del usuario
        this.listenForExchangeRequests(); // Escucha las solicitudes de intercambio
      }
    });
  },

  methods: {
    fetchAllBooks,
    fetchUserBooks,
    deleteBook,
    editBook,
    logout,
    searchBooks,
    exchangeBook,
    listenForExchangeRequests,
    acceptExchangeRequest,
    rejectExchangeRequest
  }
};
</script>

<style scoped lang="css" src="@/assets/styles/home-styles.css"></style>
