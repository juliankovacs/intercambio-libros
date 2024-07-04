import { ref, set, push, update, remove, get } from "firebase/database";
import { auth, database } from "../firebase"; 
import { onValue } from "firebase/database";

export function fetchAllBooks() {
  const context = this;
  const booksRef = ref(database, 'books');
  onValue(booksRef, snapshot => {
    const booksData = snapshot.val();
    const booksArray = [];

    if (booksData) {
      for (const userId in booksData) {
        for (const bookId in booksData[userId]) {
          const book = booksData[userId][bookId];
          booksArray.push({ ...book, id: bookId, userEmail: booksData[userId][bookId].userEmail });
        }
      }
    }

    if (context.user) {
      context.allBooks = booksArray.filter(book => book.userEmail !== context.user.email);
    } else {
      context.allBooks = booksArray;
    }
    context.filteredBooks = context.allBooks; 
  });
}

export function fetchUserBooks() {
  const context = this;
  const userId = context.user.uid;
  const booksRef = ref(database, 'books/' + userId);
  onValue(booksRef, snapshot => {
    const booksData = snapshot.val();
    const booksArray = [];
    for (const bookId in booksData) {
      const book = booksData[bookId];
      booksArray.push({ ...book, id: bookId, userEmail: context.user.email });
    }
    context.userBooks = booksArray;
  });
}



export async function deleteBook(bookId) {
  const context = this;
  const userId = context.user.uid;
  const bookRef = ref(database, `books/${userId}/${bookId}`);
  try {
    await remove(bookRef);
    context.fetchUserBooks(); 
    alert("Libro eliminado exitosamente");
  } catch (error) {
    alert(error.message);
  }
}

export async function editBook(bookId) {
  const context = this;
  context.$router.push(`/editarlibro/${bookId}`);
}

export async function logout() {
  const context = this;
  try {
    await auth.signOut();
    context.$router.push("/login");
  } catch (error) {
    alert(error.message);
  }
}

export function searchBooks() {
  const context = this;
  const searchTerm = context.searchTerm.toLowerCase().trim();
  if (!searchTerm) {
    context.filteredBooks = context.allBooks; 
    return;
  }

  context.filteredBooks = context.allBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm) ||
    book.genre.toLowerCase().includes(searchTerm)
  );
}

export function exchangeBook(bookId, bookTitle) {
      if (!this.user) {
        this.$router.push("/login");
        return;
      }

      const exchangeRef = ref(database, 'exchanges');
      const newExchangeRef = push(exchangeRef);

      try {
        set(newExchangeRef, {
          senderId: this.user.uid,
          senderemail: this.user.email,
          receiverId: this.allBooks.find(book => book.id === bookId).userId,
          bookId: bookId,
          bookTitle: bookTitle,
          status: "pending"
        });

        alert("Solicitud de intercambio enviada!");
      } catch (error) {
        alert(error.message);
      }
}
export function listenForExchangeRequests() {
    const exchangeRef = ref(database, 'exchanges');
    onValue(exchangeRef, snapshot => {
      const exchangesData = snapshot.val();
      const requests = [];
  
      for (const exchangeId in exchangesData) {
        const exchange = exchangesData[exchangeId];
        if (exchange.receiverId === this.user.uid && exchange.status === 'pending') {
          requests.push({ ...exchange, id: exchangeId });
        }
      }
  
      this.exchangeRequests = requests;
    });
  }
  
  // Aceptar una solicitud de intercambio
  export async function acceptExchangeRequest(exchangeId) {
    const exchangeRef = ref(database, `exchanges/${exchangeId}`);
    try {
      await update(exchangeRef, { status: 'accepted' });
      alert('Solicitud de intercambio aceptada!');
    } catch (error) {
      alert('Error al aceptar la solicitud de intercambio: ' + error.message);
    }
  }
  
  // Rechazar una solicitud de intercambio
  export async function rejectExchangeRequest(exchangeId) {
    const exchangeRef = ref(database, `exchanges/${exchangeId}`);
    try {
      await update(exchangeRef, { status: 'rejected' });
      alert('Solicitud de intercambio rechazada!');
    } catch (error) {
      alert('Error al rechazar la solicitud de intercambio: ' + error.message);
    }
  }

