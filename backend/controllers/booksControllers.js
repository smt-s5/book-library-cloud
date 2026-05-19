const db = require('../db');

exports.getBooks = (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
};

exports.getBookById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM books WHERE id = ?', [id], (err, result) => {
        if (err) throw err;
        res.json(result[0]);
    });
};

exports.createBook = (req, res) => {
    const { title, author, category } = req.body;

    db.query(
        'INSERT INTO books (title, author, category) VALUES (?, ?, ?)',
        [title, author, category],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Book added' });
        }
    );
};

exports.updateBook = (req, res) => {
    const id = req.params.id;
    const { title, author, category } = req.body;

    db.query(
        'UPDATE books SET title=?, author=?, category=? WHERE id=?',
        [title, author, category, id],
        (err, result) => {
            if (err) throw err;
            res.json({ message: 'Book updated' });
        }
    );
};

exports.deleteBook = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM books WHERE id=?', [id], (err, result) => {
        if (err) throw err;
        res.json({ message: 'Book deleted' });
    });
};