// import React, { useState } from 'react';
// import axios from 'axios';
// import SearchFilters from './components/SearchFilters';
// import BookList from './components/BookList';

// function App() {
//   const [filters, setFilters] = useState({});
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async (values) => {
//     setFilters(values);
//     setLoading(true);
//     setError('');
//     setBooks([]);
    
//     try {
//       // Build query params based on filters
//       const params = {};
//       if (values.title) params.title = values.title;
//       if (values.author) params.author = values.author;
//       if (values.genre) params.genre = values.genre;

//       // Call backend API (adjust URL if needed)
//       const response = await axios.get('http://localhost:5000/api/books/search', { params });
      
//       setBooks(response.data.books);
//     } catch (err) {
//       setError('Failed to fetch books. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h1>Book Search App</h1>
//       <SearchFilters onSearch={handleSearch} />
//       {loading && <p>Loading books...</p>}
//       {error && <p style={{color: 'red'}}>{error}</p>}
//       <BookList books={books} />
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';
import SearchFilters from './components/SearchFilters';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [filters, setFilters] = useState({});
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const params = { ...filters, page, pageSize, sortBy, sortOrder };
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_BASE_URL}/api/books/search`, { params });
        setBooks(response.data.books);
        setTotal(response.data.total || 0);
      } catch (err) {
        setError(
          err.response?.data?.error ||
          err.message ||
          'Failed to fetch books.'
        );
        setBooks([]);
        setTotal(0);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [filters, page, pageSize, sortBy, sortOrder]);

  const handleSearch = (values) => {
    setFilters(values);
    setPage(1);
  };

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '20px auto', padding: '0 15px' }}>
        <h1>Book Search App</h1>
        <SearchFilters onSearch={handleSearch} />

        <div style={{ marginBottom: 12 }}>
          <label>
            Per page:{' '}
            <select
              value={pageSize}
              onChange={e => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Sort By:{' '}
            <select
              value={sortBy}
              onChange={e => {
                setSortBy(e.target.value);
                setPage(1);
              }}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="publicationDate">Publication Date</option>
            </select>
          </label>

          <label style={{ marginLeft: 8 }}>
            Order:{' '}
            <select
              value={sortOrder}
              onChange={e => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>

        {loading && <LoadingSpinner />}
        {error && (
          <div
            style={{
              color: 'white',
              backgroundColor: '#e74c3c',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '10px',
            }}
            role="alert"
          >
            {error}
          </div>
        )}

        {!loading && !error && <BookList books={books} />}
        <Pagination page={page} pageSize={pageSize} total={total} onPageChange={setPage} />
      </div>
    </div>
  );
}

export default App;
