const API_URL = "http://localhost:3000/books";

const bookForm = document.getElementById("bookForm");
const bookList = document.getElementById("bookList");

document.addEventListener("DOMContentLoaded", fetchBooks);

bookForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            author
        })
    });

    bookForm.reset();
    fetchBooks();
});

async function fetchBooks() {

    const response = await fetch(API_URL);
    const books = await response.json();

    bookList.innerHTML = "";

    books.forEach(book => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>
                <button
                    class="btn-edit"
                    onclick="updateBook(${book.id})">
                    Edit
                </button>

                <button
                    class="btn-delete"
                    onclick="deleteBook(${book.id})">
                    Hapus
                </button>
            </td>
        `;

        bookList.appendChild(row);
    });
}

async function deleteBook(id) {

    if (!confirm("Yakin ingin menghapus buku ini?")) {
        return;
    }

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    fetchBooks();
}

async function updateBook(id) {

    const title = prompt("Masukkan judul baru:");

    if (!title) return;

    const author = prompt("Masukkan author baru:");

    if (!author) return;

    await fetch(`${API_URL}/${id}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title,
            author
        })
    });

    fetchBooks();
}