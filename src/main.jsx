import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToursProvider } from './context/ToursContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/test3black">
      <ToursProvider>
        <App />
      </ToursProvider>
    </BrowserRouter>
  </React.StrictMode>
);