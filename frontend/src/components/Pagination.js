import React from 'react';

function Pagination({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div style={{ margin: '16px 0' }}>
      <button
        onClick={() => page > 1 && onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous Page"
      >
        Prev
      </button>
      <span style={{ margin: '0 8px' }}>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => page < totalPages && onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next Page"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
