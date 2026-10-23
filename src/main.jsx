import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ToursProvider } from './context/ToursContext';
import './index.css';

const basename = typeof window !== 'undefined' && window.location.pathname.startsWith('/test3black')
  ? '/test3black'
  : '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <ToursProvider>
        <App />
      </ToursProvider>
    </BrowserRouter>
  </React.StrictMode>
);
