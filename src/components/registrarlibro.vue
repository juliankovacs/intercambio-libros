<template>
  <div class="register-book">
    <h2 class="register-title">Registrar un Libro</h2>
    <form @submit.prevent="registerBook">
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
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
import { database, auth, storage } from "../firebase";
import { ref as dbRef, push } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  data() {
    return {
      title: "",
      author: "",
      genre: "",
      file: null
    };
  },
  created() {
    if (!auth.currentUser) {
      this.$router.push('/login');
    }
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async registerBook() {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("Usuario no autenticado.");
        }

        const userId = user.uid;
        const userEmail = user.email;

        const bookRef = dbRef(database, 'books/' + userId);

        let imageUrl = null;
        if (this.file) {
          const imageRef = storageRef(storage, `books/${userId}/${this.file.name}`);
          await uploadBytes(imageRef, this.file);
          imageUrl = await getDownloadURL(imageRef);
        }

        await push(bookRef, {
          title: this.title,
          author: this.author,
          genre: this.genre,
          imageUrl: imageUrl,
          userId: userId, // Guardar el userId del usuario que subió el libro
          userEmail: userEmail // Guardar el email del usuario que subió el libro
        });

        alert("Libro registrado exitosamente!");
        this.title = "";
        this.author = "";
        this.genre = "";
        this.file = null;
        this.$router.push('/home'); 
      } catch (error) {
        alert(`Error al registrar el libro: ${error.message}`);
      }
    }
  }
};
</script>

<style scoped lang="css" src="@/assets/styles/registrarlibro-styles.css"> </style>
