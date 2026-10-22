import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, RotateCcw, Filter, SlidersHorizontal, MapPin, Calendar, Compass } from 'lucide-react';
import { useTours } from '../context/ToursContext';
import TourCard from '../components/TourCard';

export default function Catalog() {
  const {
    filteredTours,
    language,
    t,
    selectedRegion,
    setSelectedRegion,
    selectedMonth,
    setSelectedMonth,
    selectedDifficulty,
    setSelectedDifficulty,
    maxPrice,
    setMaxPrice,
    searchQuery,
    setSearchQuery,
    resetFilters,
  } = useTours();

  const regions = [
    { key: 'all', label: { ua: 'Всі регіони', ru: 'Все регионы' } },
    { key: 'south-america', label: { ua: 'Південна Америка', ru: 'Южная Америка' } },
    { key: 'europe', label: { ua: 'Європа', ru: 'Европа' } },
    { key: 'africa', label: { ua: 'Африка', ru: 'Африка' } },
    { key: 'asia', label: { ua: 'Азія', ru: 'Азия' } },
  ];

  const months = [
    { key: 'all', label: { ua: 'Всі дати', ru: 'Все даты' } },
    { key: '07', label: { ua: 'Липень', ru: 'Июль' } },
    { key: '09', label: { ua: 'Вересень', ru: 'Сентябрь' } },
    { key: '10', label: { ua: 'Жовтень', ru: 'Октябрь' } },
    { key: '11', label: { ua: 'Листопад', ru: 'Ноябрь' } },
  ];

  const difficulties = [
    { key: 'all', label: { ua: 'Будь-яка складність', ru: 'Любая сложность' } },
    { key: 'easy', label: { ua: 'Легка (комфорт)', ru: 'Легкая (комфорт)' } },
    { key: 'medium', label: { ua: 'Середня (актив)', ru: 'Средняя (актив)' } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-24 min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок страницы */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
            {language === 'ua' ? "Календар 2025/2026" : "Календарь 2025/2026"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-sand-100 mb-4">
            {language === 'ua' ? "Всі авторські експедиції" : "Все авторские экспедиции"}
          </h1>
          <p className="text-sand-300 text-sm sm:text-base leading-relaxed">
            {language === 'ua'
              ? "Оберіть свій наступний куточок планети. Ми подорожуємо тільки малими групами та закриваємо бронювання заздалегідь."
              : "Выберите следующую точку на глобусе. Мы путешествуем малыми группами и бронируем места заранее."}
          </p>
        </div>

        {/* Панель фильтров */}
        <div className="glass-panel rounded-2xl p-6 mb-12 border border-sand-100/10 shadow-xl space-y-6">
          {/* Верхняя строка: Поиск и сброс */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pb-5 border-b border-sand-100/10">
            {/* Поле поиска */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ua' ? "Пошук за країною чи назвою..." : "Поиск по стране или названию..."}
                className="w-full pl-10 pr-4 py-2.5 bg-ocean-850 rounded-xl border border-sand-100/10 text-sand-100 placeholder-sand-400/50 text-sm focus:outline-none focus:border-amber-600 transition-colors"
              />
            </div>

            {/* Количество найденных туров и кнопка сброса */}
            <div className="flex items-center space-x-4 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-xs text-sand-400">
                {language === 'ua' ? `Знайдено: ${filteredTours.length}` : `Найдено: ${filteredTours.length}`}
              </span>

              <button
                onClick={resetFilters}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-ocean-800 hover:bg-ocean-700 text-sand-300 hover:text-sand-100 text-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.common.clearFilters}</span>
              </button>
            </div>
          </div>

          {/* Строка с табами регионов */}
          <div>
            <span className="block text-xs font-semibold text-sand-400 uppercase tracking-wider mb-2.5">
              {language === 'ua' ? "Регіон" : "Регион"}
            </span>
            <div className="flex flex-wrap gap-2">
              {regions.map((reg) => (
                <button
                  key={reg.key}
                  onClick={() => setSelectedRegion(reg.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedRegion === reg.key
                      ? 'bg-amber-600 text-sand-100 shadow-glow-amber'
                      : 'bg-ocean-850 text-sand-300 hover:bg-ocean-800'
                  }`}
                >
                  {reg.label[language]}
                </button>
              ))}
            </div>
          </div>

          {/* Дополнительные фильтры: Месяц, Сложность, Бюджет */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {/* Месяц */}
            <div>
              <label className="block text-xs font-semibold text-sand-400 uppercase tracking-wider mb-2">
                {language === 'ua' ? "Місяць поїздки" : "Месяц поездки"}
              </label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ocean-850 border border-sand-100/10 rounded-xl text-sand-100 text-xs focus:outline-none focus:border-amber-600"
              >
                {months.map((m) => (
                  <option key={m.key} value={m.key} className="bg-ocean-900">
                    {m.label[language]}
                  </option>
                ))}
              </select>
            </div>

            {/* Сложность */}
            <div>
              <label className="block text-xs font-semibold text-sand-400 uppercase tracking-wider mb-2">
                {language === 'ua' ? "Рівень активності" : "Уровень активности"}
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-ocean-850 border border-sand-100/10 rounded-xl text-sand-100 text-xs focus:outline-none focus:border-amber-600"
              >
                {difficulties.map((d) => (
                  <option key={d.key} value={d.key} className="bg-ocean-900">
                    {d.label[language]}
                  </option>
                ))}
              </select>
            </div>

            {/* Бюджет */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-sand-400 uppercase tracking-wider">
                  {language === 'ua' ? "Бюджет до:" : "Бюджет до:"}
                </label>
                <span className="text-xs font-bold text-amber-500">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="2500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Сетка туров или заглушка при пустом результате */}
        {filteredTours.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center glass-panel rounded-3xl p-8 max-w-lg mx-auto border border-sand-100/10">
            <Compass className="w-12 h-12 text-amber-500/50 mx-auto mb-4 animate-spin duration-[8000ms]" />
            <h3 className="font-serif text-2xl font-bold text-sand-100 mb-2">
              {t.common.noResults}
            </h3>
            <p className="text-sand-400 text-xs leading-relaxed mb-6">
              {t.common.tryResetting}
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-sand-100 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              {t.common.clearFilters}
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
