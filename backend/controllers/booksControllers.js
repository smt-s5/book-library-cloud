const db = require('../db');

// GET ALL
exports.getBooks = (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

// GET BY ID
exports.getBookById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM books WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]);
    });
};

// CREATE
exports.createBook = (req, res) => {
    const { title, author, year = null, type = 'Fiction' } = req.body;

    db.query(
        'INSERT INTO books (title, author, year, type) VALUES (?, ?, ?, ?)',
        [title, author, year, type],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Book added' });
        }
    );
};

// UPDATE
exports.updateBook = (req, res) => {
    const id = req.params.id;
    const { title, author, year = null, type = 'Fiction' } = req.body;

    db.query(
        'UPDATE books SET title=?, author=?, year=?, type=? WHERE id=?',
        [title, author, year, type, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: 'Book updated' });
        }
    );
};

// DELETE
exports.deleteBook = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM books WHERE id=?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: 'Book deleted' });
    });
};