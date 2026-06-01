const db = require('../db');

// GET ALL BOOKS
exports.getBooks = (req, res) => {

    const sql = 'SELECT * FROM books ORDER BY id DESC';

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.status(200).json(results);
    });
};

// GET BOOK BY ID
exports.getBookById = (req, res) => {

    const { id } = req.params;

    const sql = 'SELECT * FROM books WHERE id = ?';

    db.query(sql, [id], (err, results) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json(results[0]);
    });
};

// ADD BOOK
exports.addBook = (req, res) => {

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: 'Title and author are required'
        });
    }

    const sql =
        'INSERT INTO books (title, author) VALUES (?, ?)';

    db.query(
        sql,
        [title, author],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: 'Book added successfully',
                id: result.insertId
            });
        }
    );
};

// UPDATE BOOK
exports.updateBook = (req, res) => {

    const { id } = req.params;
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: 'Title and author are required'
        });
    }

    const sql =
        'UPDATE books SET title = ?, author = ? WHERE id = ?';

    db.query(
        sql,
        [title, author, id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: 'Book not found'
                });
            }

            res.status(200).json({
                message: 'Book updated successfully'
            });
        }
    );
};

// DELETE BOOK
exports.deleteBook = (req, res) => {

    const { id } = req.params;

    const sql =
        'DELETE FROM books WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        res.status(200).json({
            message: 'Book deleted successfully'
        });
    });
};