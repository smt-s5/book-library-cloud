const express = require('express');
const cors = require('cors');

const bookRoutes = require('./routes/books');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.send('Book Library API Running');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});