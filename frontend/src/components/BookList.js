import React from 'react';

function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p>No books found.</p>;
  }
  
  return (
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {books.map((book) => (
        <li key={book._id || book.id} style={{ marginBottom: '8px' }}>
          <strong>{book.title}</strong> by {book.author} — {book.genre}
          {book.publicationDate && (
            <span> ({new Date(book.publicationDate).toLocaleDateString()})</span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default BookList;
