import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ProgressProvider } from './state/progress.jsx';
import './index.css';
import './app.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </React.StrictMode>
);
