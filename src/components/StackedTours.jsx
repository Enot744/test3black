import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Calendar, Clock, ArrowRight, ArrowUpRight, 
  Sparkles, Flame, Shield, MapPin, Check 
} from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function StackedTours() {
  const { tours, language, openBookingModal } = useTours();
  const isUa = language === 'ua';

  // Вкладка: "Групові" / "Індивідуальні"
  const [activeTab, setActiveTab] = useState('group');

  // Активная развернутая карточка в колоде (по умолчанию первая)
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  // Список мировых экспедиций для колоды (строго без РФ!)
  const stackDeckTours = [
    {
      id: "iceland",
      slug: "iceland-aurora-borealis",
      title: { ua: "Ісландія: Льодовики та Аврора", ru: "Исландия: Ледники и Аврора" },
      subtitle: { 
        ua: "Повне кільце навколо острова, льодовикова лагуна Йокульсарлон, водоспади та термальні джерела.",
        ru: "Полное кольцо вокруг острова, ледниковая лагуна Йокульсарлон, водопады и термальные источники."
      },
      dates: { ua: "10 — 17 серпня 2026", ru: "10 — 17 августа 2026" },
      duration: { ua: "8 днів", ru: "8 дней" },
      priceEUR: 2250,
      seats: { ua: "👥 12 місць", ru: "👥 12 мест" },
      urgency: { ua: "🔥 Залишилось 2 місця", ru: "🔥 Осталось 2 места" },
      badge: { ua: "Хіт сезону", ru: "Хит сезона" },
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Ісландія", ru: "Исландия" }
    },
    {
      id: "norway",
      slug: "norway-fjords-loft",
      title: { ua: "Норвегія: Лофотени та Фіорди", ru: "Норвегия: Лофотены и Фьорды" },
      subtitle: { 
        ua: "Автентичні рибальські рорбу, сходження на панорамні шпилі, сауни на березі океану та каякінг.",
        ru: "Аутентичные рыбацкие рорбу, восхождения на панорамные пики, сауны у океана и каякинг."
      },
      dates: { ua: "04 — 12 липня 2026", ru: "04 — 12 июля 2026" },
      duration: { ua: "9 днів", ru: "9 дней" },
      priceEUR: 2450,
      seats: { ua: "👥 10 місць", ru: "👥 10 мест" },
      urgency: { ua: "Гарантований виїзд", ru: "Гарантированный выезд" },
      badge: { ua: "Преміум лоджі", ru: "Премиум лоджи" },
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Норвегія", ru: "Норвегия" }
    },
    {
      id: "dolomites",
      slug: "dolomites",
      title: { ua: "Доломітові Альпи: Величні Піки", ru: "Доломитовые Альпы: Величественные Пики" },
      subtitle: { 
        ua: "Трекінг навколо легендарних Tre Cime di Lavaredo, бірюзове озеро Lago di Braies та альпійські шале 5*.",
        ru: "Трекинг вокруг легендарных Tre Cime di Lavaredo, бирюзовое озеро Lago di Braies и альпийские шале 5*."
      },
      dates: { ua: "18 — 25 червня 2026", ru: "18 — 25 июня 2026" },
      duration: { ua: "8 днів", ru: "8 дней" },
      priceEUR: 1850,
      seats: { ua: "👥 8 місць", ru: "👥 8 мест" },
      urgency: { ua: "🔥 Залишилось 3 місця", ru: "🔥 Осталось 3 места" },
      badge: { ua: "Альпійський комфорт", ru: "Альпийский комфорт" },
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Італія", ru: "Италия" }
    },
    {
      id: "patagonia",
      slug: "patagonia-mystic-fjords",
      title: { ua: "Патагонія: Вежі Фіцроя", ru: "Патагония: Башни Фицроя" },
      subtitle: { 
        ua: "Торрес-дель-Пайне, велетенський льодовик Періто-Морено, приватні ранчо та дегустації на краю світу.",
        ru: "Торрес-дель-Пайне, ледник Перито-Морено, частные ранчо и дегустации на краю света."
      },
      dates: { ua: "14 — 25 листопада 2026", ru: "14 — 25 ноября 2026" },
      duration: { ua: "12 днів", ru: "12 дней" },
      priceEUR: 3850,
      seats: { ua: "👥 10 місць", ru: "👥 10 мест" },
      urgency: { ua: "Експедиція року", ru: "Экспедиция года" },
      badge: { ua: "Флагман", ru: "Флагман" },
      image: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Чилі & Аргентина", ru: "Чили & Аргентина" }
    },
    {
      id: "madagascar",
      slug: "madagascar",
      title: { ua: "Мадагаскар: Алея Баобабів", ru: "Мадагаскар: Аллея Баобабов" },
      subtitle: { 
        ua: "Джип-експедиція до кам'яного лісу Цінжі, незаймані океанські лагуни та величні вікові баобаби.",
        ru: "Джип-экспедиция к каменному лесу Цинжи, нетронутые океанские лагуны и вековые баобабы."
      },
      dates: { ua: "26 листопада — 02 грудня 2026", ru: "26 ноября — 02 декабря 2026" },
      duration: { ua: "7 днів", ru: "7 дней" },
      priceEUR: 2850,
      seats: { ua: "👥 12 місць", ru: "👥 12 мест" },
      urgency: { ua: "Екзотика", ru: "Экзотика" },
      badge: { ua: "Новинка", ru: "Новинка" },
      image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Мадагаскар", ru: "Мадагаскар" }
    },
    {
      id: "antarctica",
      slug: "antarctica",
      title: { ua: "Антарктида: Полярний Круїз", ru: "Антарктида: Полярный Круиз" },
      subtitle: { 
        ua: "Експедиційне судно льодового класу, величні столові айсберги, колонії пінгвінів та кити.",
        ru: "Экспедиционное судно ледового класса, гигантские айсберги, колонии пингвинов и киты."
      },
      dates: { ua: "12 — 22 лютого 2027", ru: "12 — 22 февраля 2027" },
      duration: { ua: "11 днів", ru: "11 дней" },
      priceEUR: 6900,
      seats: { ua: "👥 14 місць", ru: "👥 14 мест" },
      urgency: { ua: "🔥 Скоро здорожчання", ru: "🔥 Скоро подорожание" },
      badge: { ua: "VIP Експедиція", ru: "VIP Экспедиция" },
      image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1400&q=85",
      country: { ua: "Антарктика", ru: "Антарктика" }
    }
  ];

  const activeTour = stackDeckTours[activeCardIndex] || stackDeckTours[0];

  return (
    <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* 1. ШАПКА БЛОКА С ПЕРЕКЛЮЧАТЕЛЕМ SEGMENTED CONTROL */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14">
        <div>
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isUa ? "Ексклюзивні напрямки" : "Эксклюзивные направления"}</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100">
            {isUa ? "Наші подорожі" : "Наши путешествия"}
          </h2>
        </div>

        {/* Сдвоенный переключатель (Segmented Control на всю ширину на мобилках) */}
        <div className="w-full sm:w-auto bg-[#0A1316] p-1.5 rounded-full border border-white/10 flex items-center relative shadow-lg">
          <button
            onClick={() => setActiveTab('group')}
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider relative transition-colors duration-300 z-10 ${
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
            className={`flex-1 sm:flex-initial px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider relative transition-colors duration-300 z-10 ${
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

      {/* 2. ВИД ДЛЯ МОБИЛЬНЫХ ТЕЛЕФОНОВ (< 1024px): APPLE WALLET / STICKY CARD STACK */}
      <div className="block lg:hidden">
        <div className="relative pb-6 space-y-3">
          {stackDeckTours.map((tour, index) => {
            const isExpanded = activeCardIndex === index;
            return (
              <motion.div
                key={tour.id}
                layout
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="overflow-hidden rounded-[26px] border border-white/15 bg-ocean-900 shadow-2xl relative"
              >
                {/* СВЕРНУТЫЙ «КОРЕШОК» КАРТОЧКИ (Виден всегда как вкладка Apple Wallet) */}
                <div
                  onClick={() => setActiveCardIndex(index)}
                  className={`h-[58px] px-5 flex items-center justify-between cursor-pointer relative overflow-hidden select-none transition-colors ${
                    isExpanded ? 'bg-black/60 border-b border-white/10' : 'bg-ocean-950 hover:bg-ocean-900'
                  }`}
                >
                  {/* Фоновое фото корешка */}
                  <img
                    src={tour.image}
                    alt={tour.title[language]}
                    className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-[2px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ocean-950 via-ocean-950/90 to-transparent" />

                  {/* Название направления на корешке */}
                  <div className="relative z-10 flex items-center space-x-2.5 truncate">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-sans font-bold text-sm text-white truncate">
                      {tour.country[language]}: {tour.title[language].split(':')[0]}
                    </span>
                  </div>

                  {/* Цена на корешке */}
                  <div className="relative z-10 flex items-center space-x-2 flex-shrink-0">
                    <span className="text-amber-400 font-serif font-bold text-sm">
                      {tour.priceEUR} €
                    </span>
                    <span className={`text-sand-400 text-xs transition-transform duration-300 ${isExpanded ? 'rotate-90 text-amber-400' : ''}`}>
                      ›
                    </span>
                  </div>
                </div>

                {/* РАЗВЕРНУТОЕ ТЕЛО КАРТОЧКИ (Плавный аккордеон) */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      className="overflow-hidden"
                    >
                      <div className="relative h-[420px] sm:h-[480px] p-6 flex flex-col justify-between overflow-hidden">
                        {/* Фоновое полноэкранное фото с кинематографичным зумом */}
                        <img
                          src={tour.image}
                          alt={tour.title[language]}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 pointer-events-none" />

                        {/* Верхняя плашка внутри раскрытой карточки */}
                        <div className="relative z-10">
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                              {tour.badge[language]}
                            </span>
                            <span className="bg-black/60 backdrop-blur-md text-amber-400 border border-white/10 text-[11px] font-bold px-3 py-1 rounded-full">
                              {tour.urgency[language]}
                            </span>
                          </div>

                          <h3 className="font-serif text-2xl font-bold text-white leading-tight mb-2">
                            {tour.title[language]}
                          </h3>

                          <div className="text-xs text-sand-300 font-medium flex items-center space-x-2">
                            <span>{tour.dates[language]}</span>
                            <span>•</span>
                            <span>{tour.duration[language]}</span>
                          </div>
                        </div>

                        {/* Нижняя плашка внутри раскрытой карточки */}
                        <div className="relative z-10 pt-4 border-t border-white/15">
                          <p className="text-xs text-sand-200 line-clamp-2 leading-relaxed mb-4">
                            {tour.subtitle[language]}
                          </p>

                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <span className="text-[10px] uppercase text-sand-400 font-bold block">
                                {isUa ? "Вартість" : "Стоимость"}
                              </span>
                              <span className="text-2xl font-serif font-black text-white">
                                {tour.priceEUR} €
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Link
                                to={`/tour/${tour.slug}`}
                                className="px-4 py-2.5 rounded-xl bg-white/15 backdrop-blur-md hover:bg-white/25 text-white text-xs font-bold flex items-center space-x-1 transition-colors"
                              >
                                <span>{isUa ? "Деталі" : "Детали"}</span>
                                <ArrowUpRight className="w-3.5 h-3.5" />
                              </Link>

                              <button
                                onClick={() => openBookingModal(tour)}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-black shadow-lg hover:scale-105 transition-all"
                              >
                                {isUa ? "Бронь" : "Бронь"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. ВИД ДЛЯ БОЛЬШИХ ЭКРАНОВ (>= 1024px): 2-КОЛОНОЧНЫЙ ИНТЕРАКТИВНЫЙ ДЕК-ЛЕЙАУТ */}
      <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
        
        {/* ЛЕВАЯ КОЛОНКА: СТЕК КАРТОЧЕК С ТАБАМИ */}
        <div className="col-span-5 space-y-2.5">
          {stackDeckTours.map((tour, index) => {
            const isActive = activeCardIndex === index;
            return (
              <motion.div
                key={tour.id}
                whileHover={{ x: 6 }}
                onClick={() => setActiveCardIndex(index)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex items-center justify-between ${
                  isActive
                    ? 'bg-ocean-900 border-amber-500/50 shadow-luxury'
                    : 'bg-ocean-950/70 border-white/10 hover:border-white/25'
                }`}
              >
                {/* Фоновая подсветка активного таба */}
                {isActive && (
                  <motion.div
                    layoutId="activeStackedTabLeft"
                    className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-transparent pointer-events-none"
                  />
                )}

                <div className="flex items-center space-x-3.5 relative z-10 truncate">
                  <div className={`w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 border ${
                    isActive ? 'border-amber-400' : 'border-white/15'
                  }`}>
                    <img src={tour.image} alt={tour.title[language]} className="w-full h-full object-cover" />
                  </div>

                  <div className="truncate">
                    <h4 className={`font-sans font-bold text-sm truncate ${
                      isActive ? 'text-amber-400' : 'text-white'
                    }`}>
                      {tour.title[language]}
                    </h4>
                    <span className="text-[11px] text-sand-400 block truncate font-medium">
                      {tour.dates[language]} • {tour.duration[language]}
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0 ml-3 relative z-10">
                  <span className="font-serif font-black text-base text-white block">
                    {tour.priceEUR} €
                  </span>
                  <span className="text-[10px] text-sand-400 font-bold">
                    {tour.seats[language]}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ПРАВАЯ КОЛОНКА: КРУПНАЯ РАСКРЫТАЯ КАРТОЧКА С ШИРОКИМ ПРЕВЬЮ */}
        <div className="col-span-7 sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTour.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-[520px] rounded-[32px] overflow-hidden border border-white/20 shadow-2xl relative p-8 flex flex-col justify-between bg-ocean-950"
            >
              {/* Большое фоновое фото */}
              <img
                src={activeTour.image}
                alt={activeTour.title[language]}
                className="absolute inset-0 w-full h-full object-cover filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/50 pointer-events-none" />

              {/* Верхняя часть карточки */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-md">
                      {activeTour.badge[language]}
                    </span>
                    <span className="bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/10">
                      {activeTour.country[language]}
                    </span>
                  </div>

                  <span className="bg-black/70 backdrop-blur-md text-amber-400 border border-white/15 text-xs font-bold px-3.5 py-1 rounded-full">
                    {activeTour.urgency[language]}
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight mb-2 drop-shadow-md">
                  {activeTour.title[language]}
                </h3>

                <p className="text-sm text-sand-200/90 max-w-lg leading-relaxed line-clamp-2">
                  {activeTour.subtitle[language]}
                </p>
              </div>

              {/* Нижняя часть карточки */}
              <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-xs text-sand-300 font-semibold mb-1">
                    <span>📅 {activeTour.dates[language]}</span>
                    <span>⏱️ {activeTour.duration[language]}</span>
                    <span>{activeTour.seats[language]}</span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-serif font-black text-amber-400">
                      {activeTour.priceEUR} €
                    </span>
                    <span className="text-xs text-sand-400">
                      / {isUa ? "за людину" : "за человека"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Link
                    to={`/tour/${activeTour.slug}`}
                    className="px-5 py-3 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/25 text-white text-xs font-bold tracking-wider uppercase flex items-center space-x-1.5 transition-colors"
                  >
                    <span>{isUa ? "Програма туру" : "Программа тура"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => openBookingModal(activeTour)}
                    className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs tracking-wider uppercase shadow-luxury hover:scale-105 transition-all"
                  >
                    {isUa ? "Забронювати" : "Забронировать"}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
