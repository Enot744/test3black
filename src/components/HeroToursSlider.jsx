import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, ChevronLeft, ChevronRight, ArrowRight, 
  Sparkles, Compass, Flame, ShieldAlert, Star 
} from 'lucide-react';
import { useTours } from '../context/ToursContext';

export const heroSliderTours = [
  {
    id: "madagascar",
    title: { ru: "Мадагаскар", ua: "Мадагаскар" },
    dates: { ru: "26 ноября — 02 декабря 2026", ua: "26 листопада — 02 грудня 2026" },
    duration: { ru: "7 дней", ua: "7 днів" },
    seats: { ru: "12 мест", ua: "12 місць" },
    image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1400&q=85",
    tags: [],
    avatars: [],
    coords: "18°55'00\" S 47°32'00\" E"
  },
  {
    id: "antarctica-2027",
    title: { ru: "Антарктида 2027", ua: "Антарктида 2027" },
    dates: { ru: "05 — 15 февраля 2027", ua: "05 — 15 лютого 2027" },
    duration: { ru: "11 дней", ua: "11 днів" },
    seats: { ru: "Распродано", ua: "Розпродано" },
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=85",
    tags: [
      { text: { ru: "РАСПРОДАНО", ua: "РОЗПРОДАНО" }, color: "bg-rose-600/90 text-white" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    ],
    badgeExtra: "3+",
    coords: "82°51'40\" S 135°00'00\" W"
  },
  {
    id: "baikal",
    title: { ru: "Байкал", ua: "Байкал" },
    dates: { ru: "24 — 28 февраля 2027", ua: "24 — 28 лютого 2027" },
    duration: { ru: "5 дней", ua: "5 днів" },
    seats: { ru: "15 мест", ua: "15 місць" },
    image: "https://images.unsplash.com/photo-1551845041-63e8e76836ea?auto=format&fit=crop&w=1400&q=85",
    tags: [],
    avatars: [],
    coords: "53°30'00\" N 108°00'00\" E"
  },
  {
    id: "putorana",
    title: { ru: "Плато Путорана", ua: "Плато Путорана" },
    dates: { ru: "15 — 19 июля 2027", ua: "15 — 19 липня 2027" },
    duration: { ru: "5 дней", ua: "5 днів" },
    seats: { ru: "31 место", ua: "31 місце" },
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
    tags: [],
    avatars: [],
    coords: "69°00'00\" N 93°00'00\" E"
  },
  {
    id: "iceland",
    title: { ru: "Исландия", ua: "Ісландія" },
    dates: { ru: "10 — 17 августа 2027", ua: "10 — 17 серпня 2027" },
    duration: { ru: "8 дней", ua: "8 днів" },
    seats: { ru: "20 мест", ua: "20 місць" },
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85",
    tags: [],
    avatars: [],
    coords: "64°57'47\" N 19°01'15\" W"
  },
  {
    id: "kamchatka",
    title: { ru: "Экспедиция на Камчатку", ua: "Експедиція на Камчатку" },
    dates: { ru: "05 — 11 сентября 2027", ua: "05 — 11 вересня 2027" },
    duration: { ru: "7 дней", ua: "7 днів" },
    seats: { ru: "13 мест", ua: "13 місць" },
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1400&q=85",
    tags: [],
    avatars: [],
    coords: "56°00'00\" N 160°00'00\" E"
  },
  {
    id: "transylvania",
    title: { ru: "Трансильвания", ua: "Трансільванія" },
    dates: { ru: "12 — 18 сентября 2027", ua: "12 — 18 вересня 2027" },
    duration: { ru: "7 дней", ua: "7 днів" },
    seats: { ru: "18 мест", ua: "18 місць" },
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
    tags: [],
    avatars: [],
    coords: "46°46'00\" N 23°35'00\" E"
  },
  {
    id: "africa-cruise",
    title: { ru: "Экспедиционный круиз в Африку", ua: "Експедиційний круїз в Африку" },
    dates: { ru: "18 — 29 октября 2027", ua: "18 — 29 жовтня 2027" },
    duration: { ru: "12 дней", ua: "12 днів" },
    seats: { ru: "121 место", ua: "121 місце" },
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
    tags: [
      { text: { ru: "Флагманское направление", ua: "Флагманський напрямок" }, color: "bg-amber-400 text-slate-950 font-black" }
    ],
    avatars: [],
    badgeExtra: "8+",
    coords: "04°00'00\" S 39°40'00\" E"
  },
  {
    id: "antarctica-2028",
    title: { ru: "Антарктида 2028", ua: "Антарктида 2028" },
    dates: { ru: "12 — 22 февраля 2028", ua: "12 — 22 лютого 2028" },
    duration: { ru: "11 дней", ua: "11 днів" },
    seats: { ru: "151 место", ua: "151 місце" },
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=85",
    tags: [
      { text: { ru: "Скоро подорожание", ua: "Скоро здорожчання" }, color: "bg-orange-500 text-white font-bold" },
      { text: { ru: "Флагманское направление", ua: "Флагманський напрямок" }, color: "bg-amber-400 text-slate-950 font-black" }
    ],
    avatars: [],
    coords: "75°00'00\" S 00°00'00\" E"
  }
];

export default function HeroToursSlider({ activeTour, onSelectTour }) {
  const { language, openBookingModal } = useTours();
  const isUa = language === 'ua';
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full">
      {/* Стрелки прокрутки слева и справа (десктоп) */}
      <button
        onClick={() => scroll('left')}
        className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-ocean-900/90 backdrop-blur-md border border-white/20 text-white hover:bg-amber-500 hover:text-slate-950 items-center justify-center transition-all duration-300 shadow-luxury hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-ocean-900/90 backdrop-blur-md border border-white/20 text-white hover:bg-amber-500 hover:text-slate-950 items-center justify-center transition-all duration-300 shadow-luxury hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Округлая шельф-панель (Glassmorphism Shelf Container) */}
      <div className="bg-[#091316]/80 backdrop-blur-2xl border border-white/10 rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 lg:p-5 shadow-2xl relative overflow-hidden">
        
        {/* Горизонтальный скролл-контейнер слайдера */}
        <div
          ref={sliderRef}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto scrollbar-none py-1 scroll-smooth select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* КАРТОЧКА 1: Получить персональное предложение */}
          <div className="w-[210px] sm:w-[230px] h-[310px] sm:h-[330px] rounded-2xl bg-[#0f1d21] border border-white/10 p-5 shrink-0 flex flex-col justify-between relative overflow-hidden group shadow-xl">
            {/* Тонкая декоративная светящаяся кривая нить */}
            <svg 
              className="absolute -right-10 top-16 w-44 h-44 text-amber-500/20 pointer-events-none group-hover:text-amber-500/40 transition-colors"
              viewBox="0 0 100 100" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="0.8"
            >
              <path d="M10,80 Q40,10 80,40 T90,90" />
              <circle cx="80" cy="40" r="2" fill="#F59E0B" />
            </svg>

            <div>
              <h3 className="font-sans text-base sm:text-lg font-bold text-white leading-snug tracking-tight mb-2">
                {isUa ? "Отримати персональну пропозицію" : "Получить персональное предложение"}
              </h3>
              
              <div className="text-[11px] font-mono text-sand-400/80 tracking-wider">
                37°40'76" E<br />N 67°45'75"
              </div>
            </div>

            {/* Белая премиальная кнопка-пилс */}
            <button
              onClick={() => openBookingModal(null)}
              className="w-full py-2.5 px-4 rounded-full bg-white hover:bg-sand-100 text-slate-950 text-xs font-bold tracking-wide transition-all shadow-md flex items-center justify-between group-hover:scale-[1.02]"
            >
              <span className="truncate">
                {isUa ? "Отримати пропозицію" : "Получить предложение"}
              </span>
              <ChevronRight className="w-4 h-4 flex-shrink-0 text-slate-900 ml-1" />
            </button>
          </div>

          {/* КАРТОЧКИ ТУРОВ ИЗ SNIPPET */}
          {heroSliderTours.map((tour) => {
            const isActive = activeTour?.id === tour.id;
            return (
              <motion.div
                key={tour.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => onSelectTour(tour)}
                onClick={() => onSelectTour(tour)}
                className={`w-[220px] sm:w-[245px] h-[310px] sm:h-[330px] rounded-2xl overflow-hidden relative shrink-0 shadow-xl cursor-pointer group transition-all duration-300 border ${
                  isActive 
                    ? 'border-amber-400 ring-2 ring-amber-400/30' 
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                {/* Фоновое фото тура с мягким увеличением при наведении */}
                <img
                  src={tour.image}
                  alt={tour.title[language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Градиентное затемнение сверху и снизу */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

                {/* Верхний блок бейджей */}
                <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-1 z-10 pointer-events-none">
                  {/* Количество мест или тег "Распродано" */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {tour.seats[language] && (
                      <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/15 shadow-sm flex items-center space-x-1">
                        <Users className="w-3 h-3 text-sand-300" />
                        <span>{tour.seats[language]}</span>
                      </span>
                    )}

                    {tour.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm ${tag.color}`}
                      >
                        {tag.text[language]}
                      </span>
                    ))}
                  </div>

                  {/* Аватары попутчиков или статус */}
                  {(tour.avatars.length > 0 || tour.badgeExtra) && (
                    <div className="flex items-center -space-x-1.5 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/10">
                      {tour.avatars.map((ava, i) => (
                        <img
                          key={i}
                          src={ava}
                          alt="traveler"
                          className="w-5 h-5 rounded-full object-cover border border-white/30"
                        />
                      ))}
                      {tour.badgeExtra && (
                        <span className="text-[10px] font-black text-amber-400 px-1">
                          {tour.badgeExtra}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Нижняя полупрозрачная плашка с названием и датами */}
                <div className="absolute inset-x-3 bottom-3 z-10">
                  <div className="bg-black/70 backdrop-blur-md rounded-xl p-3 border border-white/15 shadow-lg group-hover:bg-black/85 transition-colors">
                    <h4 className="font-sans font-bold text-sm text-white leading-snug line-clamp-1 mb-1 group-hover:text-amber-400 transition-colors">
                      {tour.title[language]}
                    </h4>
                    
                    <div className="text-[11px] text-sand-300 flex items-center space-x-1.5 font-medium truncate">
                      <span className="truncate">{tour.dates[language]}</span>
                      <span className="text-sand-500">•</span>
                      <span className="text-amber-400 font-semibold flex-shrink-0">
                        {tour.duration[language]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ПОСЛЕДНЯЯ КАРТОЧКА: Смотреть все */}
          <Link
            to="/catalog"
            className="w-[160px] sm:w-[180px] h-[310px] sm:h-[330px] rounded-2xl bg-gradient-to-br from-ocean-900/90 to-ocean-950/90 border border-white/10 hover:border-amber-500/50 p-5 shrink-0 flex flex-col items-center justify-center text-center group transition-all duration-300 shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-ocean-800 border border-white/15 text-sand-200 group-hover:text-amber-400 group-hover:scale-110 flex items-center justify-center transition-all mb-3 shadow-md">
              <ArrowRight className="w-5 h-5" />
            </div>
            
            <span className="font-serif text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
              {isUa ? "Дивитися всі" : "Смотреть все"}
            </span>
            <span className="text-[11px] text-sand-400 mt-1">
              {isUa ? "Календар виїздів →" : "Календарь выездов →"}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
