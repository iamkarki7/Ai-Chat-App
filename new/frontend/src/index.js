import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Optional, if you have styles
import App from './App.js'; // Import your App component

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
