const express = require('express')
const db = require('./db')
const app = express()
const port = 3000

// 2. Gunakan middleware CORS agar Frontend bisa mengakses API ini
app.use(cors());

app.use(express.json());

const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Book Library')
})

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      console.error('Error executing query:', err.message)
      return
    }
    res.json(result)
  })
})

app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, result) => {
    if (err) {
      console.error('Error executing query:', err.message)
      return
    }
    res.json(result)
  })
})

app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and Author are required' });
  }

  const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
  db.query(query, [title, author], (err, result) => {
    if (err) {
      console.error('Error executing query:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Book added successfully', bookId: result.insertId });
  });
});

app.listen(port, () => {
  console.log(`Book Library running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Book Library running on port ${port}`)
})
