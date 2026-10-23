import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ScrollClimber from './components/ScrollClimber';

import Home from './pages/Home';
import Catalog from './pages/Catalog';
import TourDetail from './pages/TourDetail';
import About from './pages/About';
import Randomizer from './pages/Randomizer';
import LuckyGlobeWidget from './components/LuckyGlobeWidget';

// Автоматический и гарантированный скролл наверх при смене страниц (включая переход на страницу тура)
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Отключаем автоматическое восстановление позиции скролла браузером
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Мгновенный сброс скролла на всех уровнях DOM
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 3. Повторные триггеры после завершения анимации выхода страницы AnimatePresence (mode="wait")
    const t1 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 60);

    const t2 = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 420);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen bg-ocean-900 text-sand-100 selection:bg-amber-600 selection:text-white overflow-x-hidden relative">
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
            <Route path="/lucky-globe" element={<Randomizer />} />
            {/* Fallback на главную */}
            <Route path="*" element={<Home />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* Футер */}
      <Footer />

      {/* Модальное окно бронирования */}
      <BookingModal />
      
      {/* Плавающий виджет Глобуса Удачи */}
      <LuckyGlobeWidget />

      {/* Спускающийся альпинист вдоль правого края экрана (Scroll-Driven Rappelling Climber) */}
      <ScrollClimber />
    </div>
  );
}
