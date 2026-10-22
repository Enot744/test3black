import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, Users, MapPin, CheckCircle, 
  XCircle, ChevronDown, Award, ShieldCheck, DollarSign, Send 
} from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function TourDetail() {
  const { slug } = useParams();
  const { tours, language, openBookingModal } = useTours();

  const tour = tours.find((t) => t.slug === slug);

  // Состояние раскрытых дней программы (по умолчанию День 1 открыт)
  const [openDays, setOpenDays] = useState({ 1: true });

  const toggleDay = (dayNum) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayNum]: !prev[dayNum],
    }));
  };

  if (!tour) {
    return (
      <div className="pt-36 pb-24 text-center max-w-md mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-3xl font-bold text-sand-100 mb-4">
          {language === 'ua' ? "Подорож не знайдено" : "Путешествие не найдено"}
        </h2>
        <p className="text-sand-400 text-sm mb-6">
          {language === 'ua'
            ? "Можливо, маршрут був перенесений або знятий з календаря."
            : "Возможно, маршрут был перенесен или снят с календаря."}
        </p>
        <Link
          to="/catalog"
          className="px-6 py-3 rounded-xl bg-amber-600 text-sand-100 text-sm font-semibold"
        >
          {language === 'ua' ? "До всіх експедицій" : "Ко всем экспедициям"}
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pb-24"
    >
      {/* 1. HERO ОБЛОЖКА ТУРА */}
      <section className="relative min-h-[70vh] sm:min-h-[80vh] flex items-end pb-16 pt-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.heroImage}
            alt={tour.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/60 to-ocean-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2 text-sand-300 hover:text-amber-500 text-xs uppercase tracking-wider mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'ua' ? "Назад до каталогу" : "Назад в каталог"}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {tour.badge && (
              <span className="glass-badge text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
                {tour.badge[language]}
              </span>
            )}
            <span className="glass-panel text-sand-200 text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span>{tour.country}</span>
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-sand-100 max-w-4xl leading-tight mb-6">
            {tour.title[language]}
          </h1>

          <p className="text-sand-200 text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
            {tour.subtitle[language]}
          </p>

          {/* Мета-панель тура */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl glass-panel max-w-3xl">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-sand-400 block mb-1">
                {language === 'ua' ? "Тривалість" : "Длительность"}
              </span>
              <span className="font-serif text-lg font-bold text-sand-100">
                {tour.durationDays} {language === 'ua' ? "днів" : "дней"}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-sand-400 block mb-1">
                {language === 'ua' ? "Дати" : "Даты"}
              </span>
              <span className="text-sm font-semibold text-sand-100">
                {tour.dates}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-sand-400 block mb-1">
                {language === 'ua' ? "Розмір групи" : "Размер группы"}
              </span>
              <span className="text-sm font-semibold text-sand-100">
                {tour.groupSize}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-sand-400 block mb-1">
                {language === 'ua' ? "Вартість" : "Стоимость"}
              </span>
              <span className="font-serif text-xl font-bold text-amber-500">
                ${tour.priceUSD.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ОСНОВНОЙ КОНТЕНТ: ПРОГРАММА, ВКЛЮЧЕНО / НЕ ВКЛЮЧЕНО, ТИМЛИДЕР */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Левые две колонки: Описание, Программа по дням, Включено/Не включено, Галерея */}
          <div className="lg:col-span-2 space-y-16">
            {/* Описание тура */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sand-100 mb-6">
                {language === 'ua' ? "Про експедицію" : "Об экспедиции"}
              </h2>
              <p className="text-sand-300 text-base leading-relaxed">
                {tour.description[language]}
              </p>
            </div>

            {/* Аккордеон программы по дням */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sand-100">
                  {language === 'ua' ? "Програма по днях" : "Программа по дням"}
                </h2>
                <span className="text-xs text-sand-400">
                  {tour.program.length} {language === 'ua' ? "етапів" : "этапов"}
                </span>
              </div>

              <div className="space-y-4">
                {tour.program.map((item) => {
                  const isOpen = !!openDays[item.day];
                  return (
                    <div
                      key={item.day}
                      className="rounded-2xl border border-sand-100/10 bg-ocean-850 overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => toggleDay(item.day)}
                        className="w-full p-5 text-left flex items-center justify-between hover:bg-ocean-800/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <span className="w-8 h-8 rounded-full bg-amber-600/20 text-amber-500 font-serif font-bold flex items-center justify-center text-sm flex-shrink-0">
                            {item.day}
                          </span>
                          <span className="font-serif text-lg font-bold text-sand-100">
                            {item.title[language]}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-sand-400 transition-transform duration-300 ${
                            isOpen ? 'rotate-180 text-amber-500' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-5 pb-5 pt-1 text-sm text-sand-300/90 leading-relaxed border-t border-sand-100/5 pl-16">
                              {item.desc[language]}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Списки "Що входить" / "Що не входить" */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              {/* Входит */}
              <div className="p-6 rounded-2xl bg-ocean-850 border border-sand-100/10">
                <h3 className="font-serif text-xl font-bold text-sand-100 mb-4 flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span>{language === 'ua' ? "У вартість входить" : "В стоимость входит"}</span>
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-sand-300">
                  {tour.included[language].map((inc, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Не входит */}
              <div className="p-6 rounded-2xl bg-ocean-850 border border-sand-100/10">
                <h3 className="font-serif text-xl font-bold text-sand-100 mb-4 flex items-center space-x-2">
                  <XCircle className="w-5 h-5 text-amber-500/80" />
                  <span>{language === 'ua' ? "У вартість не входить" : "В стоимость не входит"}</span>
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-sand-400">
                  {tour.notIncluded[language].map((notInc, i) => (
                    <li key={i} className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mt-2 flex-shrink-0" />
                      <span>{notInc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Галерея маршрута */}
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-sand-100 mb-6">
                {language === 'ua' ? "Галерея маршруту" : "Галерея маршрута"}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {tour.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                    <img
                      src={imgUrl}
                      alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка (Sticky карточка бронирования и Тимлидер) */}
          <div className="space-y-8">
            {/* Sticky блок бронирования */}
            <div className="sticky top-28 p-8 rounded-3xl bg-ocean-850 border border-sand-100/15 shadow-2xl space-y-6">
              <div>
                <span className="text-xs uppercase tracking-wider text-sand-400 block mb-1">
                  {language === 'ua' ? "Фіксована ціна" : "Фиксированная цена"}
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="font-serif text-4xl font-bold text-sand-100">
                    ${tour.priceUSD.toLocaleString()}
                  </span>
                  <span className="text-xs text-sand-400">
                    / {language === 'ua' ? "особа" : "человек"}
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 text-xs text-sand-300 pb-4 border-b border-sand-100/10">
                <div className="flex justify-between">
                  <span className="text-sand-400">{language === 'ua' ? "Дати туру:" : "Даты тура:"}</span>
                  <span className="font-semibold text-sand-200">{tour.dates}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-400">{language === 'ua' ? "Формат групи:" : "Формат группы:"}</span>
                  <span className="font-semibold text-sand-200">{tour.groupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sand-400">{language === 'ua' ? "Складність:" : "Сложность:"}</span>
                  <span className="font-semibold text-sand-200">{tour.difficulty}</span>
                </div>
              </div>

              <button
                onClick={() => openBookingModal(tour)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-sand-100 font-semibold text-sm uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center space-x-2"
              >
                <span>{language === 'ua' ? "Забронювати місце" : "Забронировать место"}</span>
                <Send className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-[11px] text-sand-400 justify-center">
                <ShieldCheck className="w-4 h-4 text-amber-500" />
                <span>
                  {language === 'ua'
                    ? "Гарантія повернення завдатку при форс-мажорах"
                    : "Гарантия возврата предоплаты при форс-мажорах"}
                </span>
              </div>
            </div>

            {/* Карточка тимлидера */}
            <div className="p-6 rounded-3xl bg-ocean-850/60 border border-sand-100/10">
              <span className="text-amber-500 text-[11px] font-semibold uppercase tracking-widest block mb-4">
                {language === 'ua' ? "Тімлідер експедиції" : "Тимлидер экспедиции"}
              </span>

              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={tour.teamLeader.photo}
                  alt={tour.teamLeader.name[language]}
                  className="w-16 h-16 rounded-full object-cover border-2 border-amber-600/40"
                />
                <div>
                  <h4 className="font-serif text-lg font-bold text-sand-100">
                    {tour.teamLeader.name[language]}
                  </h4>
                  <p className="text-xs text-amber-500/90 font-medium">
                    {tour.teamLeader.role[language]}
                  </p>
                </div>
              </div>

              <div className="text-xs text-sand-300/80 space-y-2 leading-relaxed">
                <p className="font-medium text-sand-200">
                  {tour.teamLeader.experience[language]}
                </p>
                <p>{tour.teamLeader.bio[language]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
