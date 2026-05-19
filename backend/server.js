const express = require('express')
const db = require('./db')
const app = express()
const port = 3000

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

app.listen(port, () => {
  console.log(`Book Library running on port ${port}`)
})
