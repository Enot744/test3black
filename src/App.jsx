import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import TourDetail from './pages/TourDetail';
import About from './pages/About';

// Автоматический скролл наверх при смене страницы
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-ocean-900 text-sand-100 selection:bg-amber-600 selection:text-white overflow-x-hidden">
      <ScrollToTop />
      
      {/* Шапка сайта */}
      <Navbar />

      {/* Основной контент с плавными переходами страниц */}
      <main className="flex-grow overflow-x-hidden">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/tour/:slug" element={<TourDetail />} />
            <Route path="/about" element={<About />} />
            {/* Fallback на главную */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Футер */}
      <Footer />

      {/* Модальное окно бронирования */}
      <BookingModal />
    </div>
  );
}
