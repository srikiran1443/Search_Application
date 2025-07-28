import React from 'react';

const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '5px solid lightgray',
  borderTop: '5px solid #3498db',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  margin: '20px auto',
};

const styleSheet = `
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;

function LoadingSpinner() {
  return (
    <>
      <style>{styleSheet}</style>
      <div style={spinnerStyle} aria-label="Loading"></div>
    </>
  );
}

export default LoadingSpinner;
