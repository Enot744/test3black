import React, { useRef, useState, useEffect } from 'react';
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
    slug: "madagascar",
    title: { ru: "Мадагаскар", ua: "Мадагаскар" },
    dates: { ru: "26 ноября — 02 декабря 2026", ua: "26 листопада — 02 грудня 2026" },
    duration: { ru: "7 дней", ua: "7 днів" },
    seats: { ru: "12 мест", ua: "12 місць" },
    priceEUR: 2850,
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1920&q=85",
    tags: [
      { text: { ru: "Флагманское направление", ua: "Флагманський напрямок" }, color: "bg-amber-400 text-slate-950 font-black" }
    ],
    avatars: [],
    coords: "18°55'00\" S 47°32'00\" E"
  },
  {
    id: "antarctica-2027",
    slug: "antarctica",
    title: { ru: "Антарктида 2027", ua: "Антарктида 2027" },
    dates: { ru: "05 — 15 февраля 2027", ua: "05 — 15 лютого 2027" },
    duration: { ru: "11 дней", ua: "11 днів" },
    seats: { ru: "Распродано", ua: "Розпродано" },
    priceEUR: 6900,
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1920&q=85",
    tags: [
      { text: { ru: "РАСПРОДАНО", ua: "РОЗПРОДАНО" }, color: "bg-rose-600 text-white font-bold" }
    ],
    avatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    ],
    badgeExtra: "3+",
    coords: "82°51'40\" S 135°00'00\" W"
  },
  {
    id: "dolomites",
    slug: "dolomites",
    title: { ru: "Доломитовые Альпы", ua: "Доломітові Альпи" },
    dates: { ru: "18 — 25 июня 2027", ua: "18 — 25 червня 2027" },
    duration: { ru: "8 дней", ua: "8 днів" },
    seats: { ru: "10 мест", ua: "10 місць" },
    priceEUR: 1850,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85",
    tags: [
      { text: { ru: "Комфорт 5*", ua: "Комфорт 5*" }, color: "bg-emerald-500/90 text-white font-bold" }
    ],
    avatars: [],
    coords: "46°26'00\" N 11°51'00\" E"
  },
  {
    id: "iceland",
    slug: "iceland",
    title: { ru: "Исландия: Ледники & Аврора", ua: "Ісландія: Льодовики & Аврора" },
    dates: { ru: "10 — 17 августа 2027", ua: "10 — 17 серпня 2027" },
    duration: { ru: "8 дней", ua: "8 днів" },
    seats: { ru: "20 мест", ua: "20 місць" },
    priceEUR: 2250,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85",
    tags: [],
    avatars: [],
    coords: "64°57'47\" N 19°01'15\" W"
  },
  {
    id: "norway",
    slug: "norway",
    title: { ru: "Норвегия: Фьорды и Лофотены", ua: "Норвегія: Фіорди та Лофотени" },
    dates: { ru: "04 — 12 июля 2027", ua: "04 — 12 липня 2027" },
    duration: { ru: "9 дней", ua: "9 днів" },
    seats: { ru: "14 мест", ua: "14 місць" },
    priceEUR: 2450,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=85",
    tags: [],
    avatars: [],
    coords: "68°10'00\" N 13°45'00\" E"
  },
  {
    id: "morocco",
    slug: "morocco",
    title: { ru: "Марокко: Сахара & Атлас", ua: "Марокко: Сахара & Атлас" },
    dates: { ru: "15 — 23 октября 2027", ua: "15 — 23 жовтня 2027" },
    duration: { ru: "9 дней", ua: "9 днів" },
    seats: { ru: "12 мест", ua: "12 місць" },
    priceEUR: 1650,
    image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1920&q=85",
    tags: [
      { text: { ru: "Атлантика", ua: "Атлантика" }, color: "bg-cyan-600/90 text-white font-bold" }
    ],
    avatars: [],
    coords: "31°37'00\" N 08°00'00\" W"
  },
  {
    id: "patagonia",
    slug: "patagonia",
    title: { ru: "Патагония: Башни Фицроя", ua: "Патагонія: Вежі Фіцроя" },
    dates: { ru: "14 — 25 ноября 2027", ua: "14 — 25 листопада 2027" },
    duration: { ru: "12 дней", ua: "12 днів" },
    seats: { ru: "8 мест", ua: "8 місць" },
    priceEUR: 3850,
    image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1920&q=85",
    tags: [
      { text: { ru: "Экспедиция года", ua: "Експедиція року" }, color: "bg-amber-500 text-slate-950 font-black" }
    ],
    avatars: [],
    coords: "51°15'00\" S 72°53'00\" W"
  },
  {
    id: "japan",
    slug: "japan",
    title: { ru: "Япония: Клены & Онсены", ua: "Японія: Клени & Онсени" },
    dates: { ru: "20 — 30 ноября 2027", ua: "20 — 30 листопада 2027" },
    duration: { ru: "11 дней", ua: "11 днів" },
    seats: { ru: "10 мест", ua: "10 місць" },
    priceEUR: 4200,
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=85",
    tags: [
      { text: { ru: "Премиум", ua: "Преміум" }, color: "bg-indigo-600/90 text-white font-bold" }
    ],
    avatars: [],
    coords: "35°41'22\" N 139°41'30\" E"
  },
  {
    id: "antarctica-2028",
    slug: "antarctica",
    title: { ru: "Антарктида 2028", ua: "Антарктида 2028" },
    dates: { ru: "12 — 22 февраля 2028", ua: "12 — 22 лютого 2028" },
    duration: { ru: "11 дней", ua: "11 днів" },
    seats: { ru: "151 место", ua: "151 місце" },
    priceEUR: 7200,
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1920&q=85",
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
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Отслеживаем скролл для точек пагинации на мобильном
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      const cardWidth = 270;
      const index = Math.round(scrollLeft / cardWidth);
      setActiveSlideIndex(Math.min(Math.max(index, 0), heroSliderTours.length - 1));
    }
  };

  // Карточка персонального предложения
  const renderOfferCard = (isMobile = false) => (
    <div className={`${isMobile ? 'min-w-[270px] w-[78vw] max-w-[300px]' : 'w-[210px] sm:w-[230px]'} h-[310px] sm:h-[330px] rounded-2xl bg-[#0f1d21] border border-white/10 p-5 shrink-0 flex flex-col justify-between relative overflow-hidden group shadow-xl snap-center`}>
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
  );

  return (
    <div className="relative w-full">
      {/* Стрелки прокрутки: только для десктопа (hidden md:flex) */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-ocean-900/90 backdrop-blur-md border border-white/20 text-white hover:bg-amber-500 hover:text-slate-950 items-center justify-center transition-all duration-300 shadow-luxury hover:scale-110"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-ocean-900/90 backdrop-blur-md border border-white/20 text-white hover:bg-amber-500 hover:text-slate-950 items-center justify-center transition-all duration-300 shadow-luxury hover:scale-110"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Округлая шельф-панель (на мобилках чистый контейнер без толстых рамок) */}
      <div className="sm:bg-[#091316]/80 sm:backdrop-blur-2xl sm:border sm:border-white/10 sm:rounded-[32px] sm:p-4 lg:p-5 sm:shadow-2xl relative overflow-hidden">
        
        {/* Горизонтальный скролл-контейнер слайдера (Mobile-First Snap Carousel) */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory px-4 sm:px-1 py-1 scroll-smooth select-none no-scrollbar -mx-4 sm:mx-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* На десктопе карточка предложения идет первой */}
          <div className="hidden sm:block shrink-0">
            {renderOfferCard(false)}
          </div>

          {/* Карточки туров */}
          {heroSliderTours.map((tour, index) => {
            const isActive = activeTour?.id === tour.id;
            return (
              <React.Fragment key={tour.id}>
                {/* На мобилках вставляем карточку предложения после первых 2 туров */}
                {index === 2 && (
                  <div className="block sm:hidden shrink-0 snap-center">
                    {renderOfferCard(true)}
                  </div>
                )}

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => onSelectTour(tour)}
                  onClick={() => onSelectTour(tour)}
                  className={`min-w-[260px] w-[78vw] max-w-[300px] sm:min-w-0 sm:w-[245px] h-[310px] sm:h-[330px] rounded-2xl overflow-hidden relative shrink-0 shadow-xl cursor-pointer group transition-all duration-300 snap-center border ${
                    isActive 
                      ? 'border-amber-400 ring-2 ring-amber-400/30' 
                      : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  {/* Фоновое фото тура с чистым природным пейзажем */}
                  <img
                    src={tour.image}
                    alt={tour.title[language]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Градиентное затемнение */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

                  {/* Верхний блок бейджей */}
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-1 z-10 pointer-events-none">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {tour.seats[language] && (
                        <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/15 shadow-sm flex items-center space-x-1">
                          <Users className="w-3 h-3 text-amber-400" />
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

                    {(tour.avatars?.length > 0 || tour.badgeExtra) && (
                      <div className="flex items-center -space-x-1.5 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded-full border border-white/10">
                        {tour.avatars?.map((ava, i) => (
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
                    <div className="bg-black/75 backdrop-blur-md rounded-xl p-3 border border-white/15 shadow-lg group-hover:bg-black/90 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-sans font-bold text-sm text-white leading-snug line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {tour.title[language]}
                        </h4>
                        <span className="text-amber-400 text-xs font-black">
                          {tour.priceEUR} €
                        </span>
                      </div>
                      
                      <div className="text-[11px] text-sand-300 flex items-center space-x-1.5 font-medium truncate">
                        <span className="truncate">{tour.dates[language]}</span>
                        <span className="text-sand-500">•</span>
                        <span className="text-sand-300 flex-shrink-0">
                          {tour.duration[language]}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}

          {/* Смотреть все */}
          <Link
            to="/catalog"
            className="min-w-[170px] w-[50vw] sm:w-[180px] h-[310px] sm:h-[330px] rounded-2xl bg-gradient-to-br from-ocean-900/90 to-ocean-950/90 border border-white/10 hover:border-amber-500/50 p-5 shrink-0 flex flex-col items-center justify-center text-center group transition-all duration-300 shadow-xl snap-center"
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

        {/* Мобильные точки пагинации (pagination dots) */}
        <div className="flex md:hidden items-center justify-center space-x-1.5 mt-3">
          {heroSliderTours.slice(0, 6).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeSlideIndex === idx
                  ? 'w-6 bg-amber-500'
                  : 'w-1.5 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
