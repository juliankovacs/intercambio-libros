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
      <h1 >Bienvenido a la Biblioteca de Intercambio!</h1> 
      <div v-if="!user">
        <h1>Libros Disponibles</h1>
        <div class="books-container">
          <div v-for="book in allBooks" :key="book.id" class="book">
            <img :src="book.imageUrl" alt="Imagen del libro" class="book-image" />
            <div class="book-details">
              <h3>{{ book.title }}</h3>
              <p>Autor: {{ book.author }}</p>
              <p>Género: {{ book.genre }}</p>
              <p>Compartido por: {{ book.userEmail }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="user">
        <h1>Mis Libros Publicados</h1>
        <div class="books-container">
          <div v-for="book in userBooks" :key="book.id" class="book">
            <h3>{{ book.title }}</h3>
            <p>{{ book.author }}</p>
            <p>{{ book.genre }}</p>
            <img :src="book.imageUrl" alt="Imagen del libro" />
            <p>{{ book.userEmail }}</p>
            <button @click="deleteBook(book.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { auth } from "../firebase";
import { ref, onValue, remove } from "firebase/database";
import { database } from "../firebase";

export default {
  data() {
    return {
      user: null,
      allBooks: [],
      userBooks: []
    };
  },
  created() {
    auth.onAuthStateChanged(user => {
      this.user = user;
      if (user) {
        this.fetchUserBooks();
      } else {
        this.fetchAllBooks();
      }
    });
  },
  methods: {
    fetchAllBooks() {
      const booksRef = ref(database, 'books');
      onValue(booksRef, snapshot => {
        const booksData = snapshot.val();
        const booksArray = [];

        if (booksData) {
          for (const userId in booksData) {
            for (const bookId in booksData[userId]) {
              const book = booksData[userId][bookId];
              booksArray.push({ ...book, id: bookId, userEmail: book.userEmail }); // Incluir userEmail
            }
          }
        }

        this.allBooks = booksArray;
      });
    },
    fetchUserBooks() {
      const userId = this.user.uid;
      const booksRef = ref(database, 'books/' + userId);
      onValue(booksRef, snapshot => {
        const booksData = snapshot.val();
        const booksArray = [];
        for (const bookId in booksData) {
          const book = booksData[bookId];
          booksArray.push({ ...book, id: bookId, userEmail: this.user.email });
        }
        this.userBooks = booksArray;
      });
    },
    async deleteBook(bookId) {
      const userId = this.user.uid;
      const bookRef = ref(database, `books/${userId}/${bookId}`);
      try {
        await remove(bookRef);
        this.fetchUserBooks(); // Refresh the list of books after deletion
        alert("Libro eliminado exitosamente");
      } catch (error) {
        alert(error.message);
      }
    },
    async logout() {
      try {
        await auth.signOut();
        this.$router.push("/login");
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>

<style scoped>
.home-container {
  font-family: 'Mulish', sans-serif;
  background-color: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  margin-top: 20px;
}

.home-header {
  width: 100%;
  background:#30190b;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

nav a {
  color: #E6E3DD;
  font-weight: bold;
  text-decoration: none;
  padding: 0 15px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.user-section {
  display: flex;
  align-items: center;
}

.welcome-message {
  color: #E6E3DD;
  font-weight: bold;
  padding: 0 15px;
}

.logout-button {
  background: none;
  border: none;
  color: #E6E3DD;
  cursor: pointer;
  font-size: 1rem;
}

.logout-button:hover {
  color: #c9302c;
}

.books-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.book {
  background: #30190b;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.book h3, p{
  color: #E6E3DD;
}

.book img {
  max-width: 100%;
  border-radius: 10px;
}

button {
  background: #d9534f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #c9302c;
}

h1 {
    color: #42b983;
    text-shadow: -1px -1px 0 #30190b, 1px -1px 0 #30190b, -1px 1px 0 #30190b, 1px 1px 0 #30190b;
}

</style>
