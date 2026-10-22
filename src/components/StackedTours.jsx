import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, ChevronRight, Sparkles, MapPin, 
  Calendar, Clock, ArrowUpRight 
} from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function StackedTours() {
  const { language, openBookingModal } = useTours();
  const isUa = language === 'ua';

  // Вкладка: "Групові" / "Індивідуальні"
  const [activeTab, setActiveTab] = useState('group');

  // Активная развернутая карточка в колоде (по умолчанию 3 - предпоследняя или 4, чтобы сверху были видны корешки как на скриншоте)
  const [activeCardIndex, setActiveCardIndex] = useState(3);

  // Список мировых экспедиций для колоды (строго без РФ!)
  const stackDeckTours = [
    {
      id: "antarctica",
      slug: "antarctica",
      title: { ua: "Антарктида 2027", ru: "Антарктида 2027" },
      dates: { ua: "05 — 15 лютого 2027", ru: "05 — 15 февраля 2027" },
      duration: { ua: "11 днів", ru: "11 дней" },
      priceEUR: 6900,
      seats: { ua: "14 місць", ru: "14 мест" },
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Антарктика", ru: "Антарктика" }
    },
    {
      id: "dolomites",
      slug: "dolomites",
      title: { ua: "Доломітові Альпи", ru: "Доломитовые Альпы" },
      dates: { ua: "18 — 25 червня 2027", ru: "18 — 25 июня 2027" },
      duration: { ua: "8 днів", ru: "8 дней" },
      priceEUR: 1850,
      seats: { ua: "10 місць", ru: "10 мест" },
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Італія", ru: "Италия" }
    },
    {
      id: "norway",
      slug: "norway-fjords-loft",
      title: { ua: "Норвегія: Лофотени", ru: "Норвегия: Лофотены" },
      dates: { ua: "04 — 12 липня 2027", ru: "04 — 12 июля 2027" },
      duration: { ua: "9 днів", ru: "9 дней" },
      priceEUR: 2450,
      seats: { ua: "12 місць", ru: "12 мест" },
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Норвегія", ru: "Норвегия" }
    },
    {
      id: "iceland",
      slug: "iceland-aurora-borealis",
      title: { ua: "Ісландія", ru: "Исландия" },
      dates: { ua: "10 — 17 серпня 2027", ru: "10 — 17 августа 2027" },
      duration: { ua: "8 днів", ru: "8 дней" },
      priceEUR: 2250,
      seats: { ua: "12 місць", ru: "12 мест" },
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Ісландія", ru: "Исландия" }
    },
    {
      id: "patagonia",
      slug: "patagonia-mystic-fjords",
      title: { ua: "Експедиція в Патагонію", ru: "Экспедиция в Патагонию" },
      dates: { ua: "14 — 25 листопада 2027", ru: "14 — 25 ноября 2027" },
      duration: { ua: "12 днів", ru: "12 дней" },
      priceEUR: 3850,
      seats: { ua: "8 місць", ru: "8 мест" },
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Чилі & Аргентина", ru: "Чили & Аргентина" }
    },
    {
      id: "madagascar",
      slug: "madagascar",
      title: { ua: "Мадагаскар", ru: "Мадагаскар" },
      dates: { ua: "26 листопада — 02 грудня 2027", ru: "26 ноября — 02 декабря 2027" },
      duration: { ua: "7 днів", ru: "7 дней" },
      priceEUR: 2850,
      seats: { ua: "12 місць", ru: "12 мест" },
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Мадагаскар", ru: "Мадагаскар" }
    }
  ];

  return (
    <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
      
      {/* 1. ШАПКА БЛОКА С ПЕРЕКЛЮЧАТЕЛЕМ SEGMENTED CONTROL */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-1 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUa ? "Ексклюзивні напрямки" : "Эксклюзивные направления"}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sand-100">
            {isUa ? "Наші подорожі" : "Наши путешествия"}
          </h2>
        </div>

        {/* Сдвоенный переключатель Segmented Control */}
        <div className="w-full sm:w-auto bg-[#0A1316] p-1.5 rounded-full border border-white/10 flex items-center relative shadow-lg">
          <button
            onClick={() => setActiveTab('group')}
            className={`flex-1 sm:flex-initial px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider relative transition-colors duration-300 z-10 ${
              activeTab === 'group' ? 'text-slate-950' : 'text-sand-300 hover:text-white'
            }`}
          >
            {activeTab === 'group' && (
              <motion.div
                layoutId="activeStackedTab"
                className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span>{isUa ? "Групові" : "Групповые"}</span>
          </button>

          <button
            onClick={() => setActiveTab('individual')}
            className={`flex-1 sm:flex-initial px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider relative transition-colors duration-300 z-10 ${
              activeTab === 'individual' ? 'text-slate-950' : 'text-sand-300 hover:text-white'
            }`}
          >
            {activeTab === 'individual' && (
              <motion.div
                layoutId="activeStackedTab"
                className="absolute inset-0 bg-white rounded-full shadow-md -z-10"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span>{isUa ? "Індивідуальні" : "Индивидуальные"}</span>
          </button>
        </div>
      </div>

      {/* 2. КОЛОДА СКЛАДЫВАЮЩИХСЯ КАРТОЧЕК (ТОЧНО КАК НА СКРИНШОТЕ NEVEREND) */}
      <div className="relative flex flex-col select-none">
        {stackDeckTours.map((tour, index) => {
          const isCurrentActive = index === activeCardIndex;
          const isBeforeActive = index < activeCardIndex;
          const isAfterActive = index > activeCardIndex;

          if (isCurrentActive) {
            // АКТИВНАЯ БОЛЬШАЯ РАСКРЫТАЯ КАРТОЧКА (ТОЧНО КАК НА СКРИНШОТЕ)
            return (
              <motion.div
                layout
                key={tour.id}
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                className="relative h-[440px] sm:h-[490px] rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-white/20 group my-0.5 z-20"
              >
                {/* Фоновое полноразмерное фото экспедиции */}
                <img
                  src={tour.image}
                  alt={tour.title[language]}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Градиенты затемнения сверху и снизу для идеальной читаемости */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/20 to-black/80 pointer-events-none" />

                {/* Верхний блок: Название тура, даты, длительность и цена */}
                <div className="absolute top-6 left-6 right-6 z-10 text-white">
                  <h3 className="font-sans text-xl sm:text-2xl font-bold leading-tight mb-1 text-white drop-shadow-lg">
                    {tour.title[language]}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-sand-200/90 font-medium mb-2 drop-shadow">
                    {tour.dates[language]} • {tour.duration[language]}
                  </p>

                  <div className="text-lg sm:text-xl font-bold text-white tracking-tight drop-shadow">
                    {isUa ? "від" : "от"} {tour.priceEUR.toLocaleString()} €
                  </div>
                </div>

                {/* Нижний правый угол: стеклянный бейдж количества мест */}
                <div className="absolute bottom-5 right-5 z-10">
                  <div className="bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center space-x-1.5 shadow-lg">
                    <Users className="w-3.5 h-3.5 text-sand-100" />
                    <span>{tour.seats[language]}</span>
                  </div>
                </div>

                {/* Нижний левый угол: кнопки бронирования и деталей */}
                <div className="absolute bottom-5 left-5 z-10 flex items-center space-x-2">
                  <button
                    onClick={() => openBookingModal(tour)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    {isUa ? "Бронь" : "Бронь"}
                  </button>
                  <Link
                    to={`/tour/${tour.slug}`}
                    className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-medium text-xs transition-all flex items-center space-x-1"
                  >
                    <span>{isUa ? "Деталі" : "Детали"}</span>
                    <ArrowUpRight className="w-3 h-3 text-white" />
                  </Link>
                </div>
              </motion.div>
            );
          }

          if (isBeforeActive) {
            // ВЕРХНИЕ КОРЕШКИ-ВКЛАДКИ (ЛЕЖАТ СВЕРХУ ДРУГ НАД ДРУГОМ С ВИДИМЫМ ЗАОКРУГЛЕННЫМ ВЕРХОМ)
            return (
              <motion.div
                layout
                key={tour.id}
                onClick={() => setActiveCardIndex(index)}
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                className="relative h-[50px] -mb-1 rounded-t-[24px] sm:rounded-t-[28px] overflow-hidden cursor-pointer border-t border-x border-white/20 shadow-xl transition-all duration-300 hover:brightness-110 group z-10"
              >
                <img
                  src={tour.image}
                  alt={tour.title[language]}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

                <div className="relative z-10 h-full px-5 flex items-center justify-between">
                  <span className="font-sans font-semibold text-sm sm:text-base text-white truncate drop-shadow-md">
                    {tour.title[language]}
                  </span>
                  
                  <div className="flex items-center space-x-2 text-sand-300 text-xs font-medium">
                    <span className="text-amber-400 font-bold">{tour.priceEUR} €</span>
                    <span className="text-sand-400 text-sm">›</span>
                  </div>
                </div>
              </motion.div>
            );
          }

          if (isAfterActive) {
            // НИЖНИЕ КОРЕШКИ-ВКЛАДКИ (ЛЕЖАТ ПОД АКТИВНОЙ КАРТОЧКОЙ)
            return (
              <motion.div
                layout
                key={tour.id}
                onClick={() => setActiveCardIndex(index)}
                transition={{ type: "spring", stiffness: 350, damping: 32 }}
                className="relative h-[50px] -mt-1 rounded-b-[24px] sm:rounded-b-[28px] overflow-hidden cursor-pointer border-b border-x border-white/20 shadow-xl transition-all duration-300 hover:brightness-110 group z-10"
              >
                <img
                  src={tour.image}
                  alt={tour.title[language]}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />

                <div className="relative z-10 h-full px-5 flex items-center justify-between">
                  <span className="font-sans font-semibold text-sm sm:text-base text-white truncate drop-shadow-md">
                    {tour.title[language]}
                  </span>
                  
                  <div className="flex items-center space-x-2 text-sand-300 text-xs font-medium">
                    <span className="text-amber-400 font-bold">{tour.priceEUR} €</span>
                    <span className="text-sand-400 text-sm">›</span>
                  </div>
                </div>
              </motion.div>
            );
          }

          return null;
        })}
      </div>

      {/* 3. КНОПКА «СМОТРЕТЬ ВСЕ ›» ТОЧНО КАК ОБВЕДЕНО В ЗЕЛЕНЫЙ КРУГ НА СКРИНШОТЕ */}
      <Link
        to="/catalog"
        className="mt-4 w-full py-3.5 px-6 rounded-2xl bg-[#E6E8EA] hover:bg-white text-slate-900 font-semibold text-sm sm:text-base flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-[0.99] group"
      >
        <span>{isUa ? "Дивитися всі" : "Смотреть все"}</span>
        <ChevronRight className="w-4 h-4 text-slate-900 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  );
}