<template>
    <div class="edit-book">
      <h2 class="edit-title">Editar Libro</h2>
      <form @submit.prevent="editBook">
        <div class="input-wrapper">
          <input v-model="title" type="text" placeholder="Título" required />
        </div>
        <div class="input-wrapper">
          <input v-model="author" type="text" placeholder="Autor" required />
        </div>
        <div class="input-wrapper">
          <input v-model="genre" type="text" placeholder="Género" required />
        </div>
        <div class="input-wrapper">
          <input type="file" @change="handleFileUpload" />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  </template>
  
  <script>
  import { database, auth, storage } from "../firebase";
  import { ref as dbRef, get, update } from "firebase/database";
  import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
  
  export default {
    data() {
      return {
        title: "",
        author: "",
        genre: "",
        file: null,
        bookId: null,
        userId: null
      };
    },
    created() {
      const user = auth.currentUser;
      if (!user) {
        this.$router.push('/login');
        return;
      }
  
      this.userId = user.uid;
      this.bookId = this.$route.params.bookId; // Obtener el ID del libro de la ruta
  
      this.fetchBookDetails();
    },
    methods: {
      async fetchBookDetails() {
        try {
          const bookRef = dbRef(database, `books/${this.userId}/${this.bookId}`);
          const snapshot = await get(bookRef);
  
          if (snapshot.exists()) {
            const bookData = snapshot.val();
            this.title = bookData.title;
            this.author = bookData.author;
            this.genre = bookData.genre;
          } else {
            alert("Libro no encontrado.");
            this.$router.push('/home');
          }
        } catch (error) {
          alert(error.message);
          this.$router.push('/home');
        }
      },
      handleFileUpload(event) {
        this.file = event.target.files[0];
      },
      async editBook() {
        try {
          const bookRef = dbRef(database, `books/${this.userId}/${this.bookId}`);
  
          let imageUrl = null;
          if (this.file) {
            const imageRef = storageRef(storage, `books/${this.userId}/${this.file.name}`);
            await uploadBytes(imageRef, this.file);
            imageUrl = await getDownloadURL(imageRef);
          }
  
          await update(bookRef, {
            title: this.title,
            author: this.author,
            genre: this.genre,
            ...(imageUrl && { imageUrl: imageUrl })
          });
  
          alert("Libro actualizado exitosamente!");
          this.$router.push('/home');
        } catch (error) {
          alert(error.message);
        }
      }
    }
  };
  </script>
  
  <style scoped lang="css" src="@/assets/styles/editarlibro-styles.css"> </style>
  