import React, { useState } from 'react';

function SearchFilters({ onSearch }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !author.trim() && !genre.trim()) {
      setLocalError('Please enter at least one search filter.');
      return;
    }
    setLocalError('');
    onSearch({ title, author, genre });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={e => setGenre(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button type="submit">Search</button>
      {localError && <span style={{ color: 'red', marginLeft: 8 }}>{localError}</span>}
    </form>
  );
}

export default SearchFilters;
