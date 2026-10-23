import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Sparkles, X, Users, ArrowRight } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function LuckyGlobeWidget() {
  const location = useLocation();
  const { tours, language } = useTours();
  const isUa = language === 'ua';

  const [isDismissed, setIsDismissed] = useState(false);
  const [activeTourIndex, setActiveTourIndex] = useState(0);
  const [isPastStandards, setIsPastStandards] = useState(false);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 640;
  });

  const featuredTours = tours?.slice(0, 4) || [];
  const currentTour = featuredTours[activeTourIndex] || featuredTours[0];

  // Отслеживание ширины экрана
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Автоматическое переключение туров в карточке каждые 6.5 секунд
  useEffect(() => {
    if (featuredTours.length <= 1) return;
    const timer = setInterval(() => {
      setActiveTourIndex((prev) => (prev + 1) % featuredTours.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [featuredTours.length]);

  // Отслеживание скролла: на мобильном переключаем с глобуса на актуальное направление с блока Стандарты AURA
  useEffect(() => {
    const handleScroll = () => {
      const standardsEl = document.getElementById('standards');
      if (standardsEl) {
        const rect = standardsEl.getBoundingClientRect();
        // Когда секция Стандарты входит в экран (на 75% от высоты viewport)
        setIsPastStandards(rect.top <= window.innerHeight * 0.75);
      } else {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll > 0) {
          setIsPastStandards(window.scrollY / maxScroll >= 0.45);
        } else {
          setIsPastStandards(false);
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Скрываем виджет на странице самого глобуса
  if (location.pathname === '/lucky-globe' || location.pathname.startsWith('/lucky-globe')) {
    return null;
  }

  // Рендер кнопки глобуса
  const renderGlobeButton = (sizeClass = "w-14 h-14") => (
    <Link
      to="/lucky-globe"
      className={`relative group flex items-center justify-center ${sizeClass} rounded-full bg-gradient-to-tr from-[#062430] via-[#093545] to-[#0c4a60] text-white shadow-2xl border-2 border-amber-400 hover:border-amber-300 hover:scale-105 transition-all duration-300 flex-shrink-0`}
      title={isUa ? "Глобус Удачі: Спонтанна подорож" : "Глобус Удачи: Спонтанное путешествие"}
    >
      {/* Пульсирующее кольцо */}
      <span className="absolute inset-0 rounded-full bg-amber-400/20 animate-ping pointer-events-none" />

      {/* Вращающийся компас / глобус */}
      <Compass className="w-7 h-7 text-amber-400 group-hover:rotate-180 transition-transform duration-700" />

      {/* Бейдж HOT */}
      <span className="absolute -top-1 -left-1 bg-gradient-to-r from-red-500 to-amber-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow-sm uppercase leading-none">
        HOT
      </span>

      {/* Бонусный бейдж -50€ */}
      <span className="absolute -bottom-1 -right-1 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white text-[9px] font-black px-1.5 py-0.2 rounded-full border border-white shadow-sm leading-none">
        -50€
      </span>
    </Link>
  );

  // Рендер карточки актуального направления
  const renderActualDestinationCard = (isMobileMode = false) => {
    if (!currentTour) return null;

    return (
      <motion.div
        key={`tour-${currentTour.id}-${activeTourIndex}`}
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={`${
          isMobileMode ? "w-full max-w-[340px]" : "w-[290px]"
        } bg-[#091116]/92 hover:bg-[#0d1820]/95 backdrop-blur-xl border border-white/15 hover:border-amber-500/40 rounded-3xl p-3.5 text-white shadow-[0_12px_36px_rgba(0,0,0,0.7)] relative group transition-all duration-300 pointer-events-auto`}
      >
        {/* Верхняя строка: Лейбл + Индикаторы/Действия */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse flex-shrink-0" />
            <span>{isUa ? "АКТУАЛЬНИЙ НАПРЯМОК" : "АКТУАЛЬНОЕ НАПРАВЛЕНИЕ"}</span>
          </span>

          <div className="flex items-center space-x-1.5">
            {/* Точки переключения туров */}
            <div className="flex items-center space-x-1 p-0.5">
              {featuredTours.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveTourIndex(dotIdx);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === activeTourIndex
                      ? 'bg-amber-400 w-3'
                      : 'bg-white/30 hover:bg-white/60 w-1.5'
                  }`}
                  title={`${isUa ? "Напрямок" : "Направление"} ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* На мобильном: быстрая кнопка перехода к Глобусу */}
            {isMobileMode && (
              <Link
                to="/lucky-globe"
                className="flex items-center space-x-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ml-1"
                title={isUa ? "Крутити глобус" : "Крутить глобус"}
              >
                <Compass className="w-3 h-3 text-amber-400" />
                <span>Глобус</span>
              </Link>
            )}

            {/* На десктопе: кнопка закрыть карточку */}
            {!isMobileMode && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsDismissed(true);
                }}
                className="text-white/40 hover:text-white p-0.5 transition-colors cursor-pointer ml-1"
                title={isUa ? "Закрити" : "Закрыть"}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Ссылка на тур: Название, Даты, Места, Цена */}
        <Link
          to={`/tour/${currentTour.slug || 'antarctica'}`}
          className="block group-hover:opacity-95 transition-opacity"
        >
          {/* Название актуального направления */}
          <h4 className="font-sans font-bold text-sm text-white mb-0.5 group-hover:text-amber-400 transition-colors line-clamp-1">
            {currentTour.title[language] || currentTour.title.ua}
          </h4>

          {/* Даты и длительность */}
          <p className="text-[11px] text-sand-300/80 mb-2 font-medium">
            {currentTour.dates?.split('—')[0]?.trim() || currentTour.month} • {currentTour.durationDays} {isUa ? "днів" : "дней"}
          </p>

          {/* Нижняя плашка: Места + Цена + Стрелка */}
          <div className="flex items-center justify-between pt-1 border-t border-white/10">
            <div className="inline-flex items-center space-x-1.5 bg-black/60 border border-white/10 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-white shadow-inner">
              <Users className="w-3 h-3 text-sand-300" />
              <span>{currentTour.remainingSeats || 4} {isUa ? "місця" : "места"}</span>
            </div>

            <div className="flex items-center space-x-2 text-right">
              <span className="text-xs font-bold text-amber-400">{currentTour.priceUSD} €</span>
              <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  // 1. ДЕСКТОП: Карточка актуального направления прижата строго к правому нижнему углу (без иконки глобуса)
  if (!isMobile) {
    return (
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <AnimatePresence>
          {!isDismissed && renderActualDestinationCard(false)}
        </AnimatePresence>
      </div>
    );
  }

  // 2. МОБИЛЬНЫЙ: Переключение с глобуса на актуальное направление с середины сайта (блок Стандарты AURA)
  return (
    <div className="fixed bottom-5 right-4 z-40 pointer-events-auto">
      <AnimatePresence mode="wait">
        {isPastStandards ? (
          <motion.div
            key="mobile-actual-tour"
            initial={{ opacity: 0, y: 25, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {renderActualDestinationCard(true)}
          </motion.div>
        ) : (
          <motion.div
            key="mobile-globe-button"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderGlobeButton("w-13 h-13")}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
