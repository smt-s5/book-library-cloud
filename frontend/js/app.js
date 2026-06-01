console.log("Frontend JS berhasil tersambung!");

const API_URL = 'http://localhost:3000/books';
let allBooks = []; // local cache for search and filtering

document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();

    // Event listener untuk form tambah buku
    document.getElementById('bookForm').addEventListener('submit', addBook);

    // Event listener untuk pencarian
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    if (searchInput) {
        searchInput.addEventListener('input', filterBooks);
    }
    if (searchBtn) {
        searchBtn.addEventListener('click', filterBooks);
    }
});

// Fungsi untuk mengambil data buku dari backend
async function fetchBooks() {
    const bookList = document.getElementById('bookList');
    try {
        const response = await fetch(API_URL);
        allBooks = await response.json();

        renderBooks(allBooks);
    } catch (error) {
        console.error('Error fetching books:', error);
        bookList.innerHTML = '<tr><td colspan="4" style="color:red; text-align: center;">Gagal memuat data dari server backend.</td></tr>';
    }
}

// Fungsi untuk merender daftar buku ke dalam tabel
function renderBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Kosongkan tabel

    if (books.length === 0) {
        bookList.innerHTML = '<tr><td colspan="4" style="text-align: center;">Tidak ada data buku ditemukan.</td></tr>';
        return;
    }

    books.forEach(book => {
        const tr = document.createElement('tr');
        
        // Pastikan type bernilai default jika tidak ada di data lama
        const bookType = book.type || 'Fiction';

        tr.innerHTML = `
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><span class="badge">${bookType}</span></td>
            <td>
                <button class="btn-edit" onclick="updateBook(${book.id})">Edit</button>
                <button class="btn-delete" onclick="deleteBook(${book.id})">Hapus</button>
            </td>
        `;

        bookList.appendChild(tr);
    });
}

// Fungsi untuk menyaring buku berdasarkan pencarian
function filterBooks() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = allBooks.filter(book => {
        const titleMatch = book.title ? book.title.toLowerCase().includes(query) : false;
        const authorMatch = book.author ? book.author.toLowerCase().includes(query) : false;
        const typeMatch = book.type ? book.type.toLowerCase().includes(query) : false;
        return titleMatch || authorMatch || typeMatch;
    });
    renderBooks(filtered);
}

// Fungsi untuk mengirim data buku baru ke backend
async function addBook(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    
    // Mengambil nilai tipe buku dari radio button yang dipilih
    const typeElement = document.querySelector('input[name="type"]:checked');
    const type = typeElement ? typeElement.value : 'Fiction';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, type })
        });

        if (response.ok) {
            // Reset form (kecuali pilihan default radio)
            document.getElementById('bookForm').reset();
            // Kembalikan pilihan radio ke Fiction
            const defaultRadio = document.querySelector('input[name="type"][value="Fiction"]');
            if (defaultRadio) defaultRadio.checked = true;

            fetchBooks();
        } else {
            alert('Gagal menambah buku');
        }
    } catch (error) {
        console.error('Error adding book:', error);
        alert('Terjadi kesalahan koneksi ke backend.');
    }
}

// Fungsi untuk menghapus buku
async function deleteBook(id) {
    if (!confirm("Yakin mau hapus buku ini?")) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchBooks();
        } else {
            alert('Gagal menghapus buku');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
    }
}

// Fungsi untuk mengupdate buku
async function updateBook(id) {
    // Cari data buku saat ini untuk pre-fill prompt
    const book = allBooks.find(b => b.id === id);
    if (!book) return;

    const title = prompt("Masukkan judul baru:", book.title);
    if (title === null) return; // user cancelled

    const author = prompt("Masukkan penulis baru:", book.author);
    if (author === null) return; // user cancelled

    const type = prompt("Masukkan tipe baru (Fiction / Computer Programming / Cooking):", book.type || "Fiction");
    if (type === null) return; // user cancelled

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author, type })
        });

        if (response.ok) {
            fetchBooks(); // refresh data
        } else {
            alert('Gagal update buku');
        }
    } catch (error) {
        console.error('Error updating book:', error);
    }
}