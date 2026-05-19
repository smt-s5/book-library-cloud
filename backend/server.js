const express = require('express')
const cors = require('cors')

const db = require('./db')
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());

const bookRoutes = require('./routes/books');
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Book Library')
})

app.listen(port, () => {
  console.log(`Book Library running on port ${port}`);
});