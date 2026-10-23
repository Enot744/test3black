import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, ArrowUpRight, Globe } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage, t, openBookingModal } = useTours();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Закрывать мобильное меню при переходе по роутам
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.catalog, path: '/catalog' },
    { name: t.nav.about, path: '/about' },
    { name: language === 'ua' ? "Глобус удачі" : "Глобус удачи", path: '/lucky-globe', isHot: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-luxury'
            : 'bg-gradient-to-b from-ocean-950/80 via-ocean-950/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Логотип */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500/80 p-[1px] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <div className="w-full h-full rounded-full bg-ocean-900 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-amber-500 transition-colors group-hover:text-sand-100" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-sand-100 group-hover:text-amber-500 transition-colors">
                  AURA
                </span>
                <span className="text-[9px] tracking-[0.25em] text-sand-400 uppercase -mt-1 font-sans">
                  Expeditions
                </span>
              </div>
            </Link>

            {/* Десктопная навигация */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 text-sm tracking-wide transition-all rounded-full ${
                      isActive
                        ? 'text-sand-100 font-medium'
                        : 'text-sand-300/80 hover:text-sand-100 hover:bg-ocean-800/40'
                    }`}
                  >
                    {link.name}
                    {link.isHot && (
                      <span className="ml-1.5 bg-gradient-to-r from-red-500 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none uppercase shadow-sm">
                        HOT
                      </span>
                    )}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-1 left-4 right-4 h-[2px] bg-amber-600 rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Правый блок: Переключатель языков и Кнопка бронирования */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Переключатель языка UA / RU */}
              <button
                onClick={toggleLanguage}
                type="button"
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-sand-100/10 hover:border-amber-600/40 bg-ocean-850/60 transition-all text-xs font-semibold text-sand-200 hover:text-amber-500"
                title="Перемкнути мову / Переключить язык"
              >
                <Globe className="w-3.5 h-3.5 text-amber-600" />
                <span className={language === 'ua' ? 'text-amber-500' : 'text-sand-400'}>UA</span>
                <span className="text-sand-400/50">|</span>
                <span className={language === 'ru' ? 'text-amber-500' : 'text-sand-400'}>RU</span>
              </button>

              {/* Кнопка Забронировать */}
              <button
                onClick={() => openBookingModal(null)}
                className="relative inline-flex items-center justify-center px-5 py-2.5 overflow-hidden text-xs tracking-wider uppercase font-semibold text-sand-100 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full group hover:shadow-glow-amber transition-all duration-300"
              >
                <span className="relative z-10 flex items-center">
                  {t.nav.bookNow}
                  <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
                <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              </button>
            </div>

            {/* Мобильная кнопка меню */}
            <div className="flex md:hidden items-center space-x-3">
              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1 rounded-full border border-sand-100/15 text-xs font-semibold text-sand-200"
              >
                {language.toUpperCase()}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-11 h-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 backdrop-blur-md border border-white/15 text-white flex items-center justify-center transition-all shadow-lg focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-white" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Мобильное выпадающее меню с Framer Motion */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[65px] z-30 p-4 md:hidden bg-ocean-950/95 backdrop-blur-2xl border-b border-sand-100/10 shadow-2xl"
          >
            <div className="flex flex-col space-y-3 pt-2 pb-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-amber-600/15 text-amber-500 border border-amber-600/30'
                        : 'text-sand-200 hover:bg-ocean-800'
                    }`}
                  >
                    {link.name}
                    {link.isHot && (
                      <span className="ml-1.5 bg-gradient-to-r from-red-500 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none uppercase shadow-sm">
                        HOT
                      </span>
                    )}
                  </Link>
                );
              })}

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openBookingModal(null);
                }}
                className="w-full mt-3 flex items-center justify-center space-x-2 py-3 px-5 bg-gradient-to-r from-amber-600 to-amber-700 text-sand-100 font-semibold rounded-xl text-sm uppercase tracking-wider"
              >
                <span>{t.nav.bookNow}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
