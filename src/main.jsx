import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import './index.css';
import App from './App.jsx';

// Render the app with routing context
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
  </StrictMode>
);

