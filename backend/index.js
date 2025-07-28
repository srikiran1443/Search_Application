const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

// Initialize Express app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(
  'mongodb+srv://srikiran1443:t2ww1yUROyaRNLTr@cluster1.7cefvhs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import Book model
const Book = require('./models/Book');

// Root route (optional)
app.get('/', (req, res) => {
  res.send('API is running');
});

// Search books with filters, sorting, pagination
app.get('/api/books/search', async (req, res) => {
  const {
    title,
    author,
    genre,
    sortBy,
    sortOrder,
    page = 1,
    pageSize = 10
  } = req.query;

  let filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' };
  if (author) filter.author = { $regex: author, $options: 'i' };
  if (genre) filter.genre = { $regex: genre, $options: 'i' };  // case-insensitive match

  const sortOptions = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
  }

  try {
    const books = await Book.find(filter)
      .sort(sortOptions)
      .skip((page - 1) * pageSize)
      .limit(Number(pageSize));
    const count = await Book.countDocuments(filter);

    res.json({
      books,
      total: count,
      page: Number(page),
      pageSize: Number(pageSize),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// Add a new book
app.post('/api/books', async (req, res) => {
  try {
    const book = new Book(req.body);  // req.body must have { title, author, genre, publicationDate }
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Could not add book' });
  }
});

// Start the server (after routes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
