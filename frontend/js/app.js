// Ganti URL ini dengan URL API Backend kamu nantinya (misal IP EC2 atau localhost)
const API_URL = 'http://localhost:3000/books';

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    // Event listener untuk form tambah buku
    document.getElementById('bookForm').addEventListener('submit', addBook);
});

// Fungsi untuk mengambil data buku dari backend
async function fetchBooks() {
    const bookList = document.getElementById('bookList');
    try {
        const response = await fetch(API_URL);
        const books = await response.json();

        bookList.innerHTML = ''; // Kosongkan text loading

        if (books.length === 0) {
            bookList.innerHTML = '<p>Belum ada koleksi buku.</p>';
            return;
        }

        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';

            bookCard.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis: ${book.author}</p>
        <button onclick="updateBook(${book.id})">Edit</button>
        <button onclick="deleteBook(${book.id})">Hapus</button>
    `;

            bookList.appendChild(bookCard);
        });
    } catch (error) {
        console.error('Error fetching books:', error);
        bookList.innerHTML = '<p style="color:red;">Gagal memuat data dari server backend.</p>';
    }
}

// Fungsi untuk mengirim data buku baru ke backend
async function addBook(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        });

        if (response.ok) {
            // Reset form dan refresh daftar buku
            document.getElementById('bookForm').reset();
            fetchBooks();
        } else {
            alert('Gagal menambah buku');
        }
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Terjadi kesalahan koneksi ke backend.');
    }
}

async function deleteBook(id) {
    if (!confirm("Yakin mau hapus buku ini?")) return;
    await fetch(`http://localhost:3000/books/${id}`, {
        method: 'DELETE'
    });

    fetchBooks();
}

async function updateBook(id) {
    const title = prompt("Judul baru:");
    const author = prompt("Author baru:");

    await fetch(`http://localhost:3000/books/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author })
    });

    getBooks();
}

async function updateBook(id) {
    const title = prompt("Masukkan judul baru:");
    const author = prompt("Masukkan penulis baru:");

    if (!title || !author) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        });

        if (response.ok) {
            fetchBooks(); // 🔥 refresh data
        } else {
            alert('Gagal update buku');
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
}