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
          userEmail: userEmail // Guardar el email del usuario que subió el libro
        });

        alert("Libro registrado exitosamente!");
        this.title = "";
        this.author = "";
        this.genre = "";
        this.file = null;
      } catch (error) {
        alert(error.message);
      }
    }
  }
};
</script>


<style scoped>
.register-book {
  width: 375px;
  padding: 20px;
  background: #E6E3DD;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.register-title {
  width: 100%;
  font-family: 'Mulish', sans-serif;
  font-weight: 700;
  font-size: 36px;
  line-height: 45px;
  text-align: center;
  color: #000000;
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

input[type="text"], input[type="file"] {
  width: calc(100% - 28px);
  margin: 0 14px;
  padding: 10px 0;
  font-family: 'Mulish', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 23px;
  color: #241C1C;
  border: none;
  background: transparent;
}

button {
  width: 100%;
  height: 63px;
  background: #241C1C;
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

button:hover {
  background-color: #130f0f;
}
</style>
