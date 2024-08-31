import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app.js';  // Make sure this file exists in the `src` folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
