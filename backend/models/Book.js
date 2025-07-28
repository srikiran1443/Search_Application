const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publicationDate: Date,
});
module.exports = mongoose.model('Book', BookSchema);
