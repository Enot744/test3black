import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, ArrowRight } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function TourCard({ tour }) {
  const { language, openBookingModal } = useTours();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group relative flex flex-col h-full bg-ocean-850/80 rounded-2xl overflow-hidden border border-sand-100/10 hover:border-amber-600/40 hover:shadow-2xl hover:shadow-amber-950/20 transition-all"
    >
      {/* Изображение и верхние бейджи */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={tour.heroImage}
          alt={tour.title[language]}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/30 to-transparent" />

        {/* Бейдж сезона/статуса */}
        {tour.badge && (
          <div className="absolute top-4 left-4">
            <span className="glass-badge text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
              {tour.badge[language]}
            </span>
          </div>
        )}

        {/* Локация */}
        <div className="absolute bottom-3 left-4 flex items-center space-x-1.5 text-sand-200 text-xs font-medium bg-ocean-950/70 backdrop-blur-md px-2.5 py-1 rounded-md">
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          <span>{tour.country}</span>
        </div>

        {/* Сложность */}
        <div className="absolute bottom-3 right-4 text-sand-300 text-xs bg-ocean-950/70 backdrop-blur-md px-2.5 py-1 rounded-md">
          {tour.difficulty}
        </div>
      </div>

      {/* Контент карточки */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          {/* Метаданные: Даты и Размер группы */}
          <div className="flex items-center justify-between text-xs text-sand-400 mb-3 pb-3 border-b border-sand-100/10">
            <div className="flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-600" />
              <span>{tour.dates}</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>{tour.groupSize}</span>
            </div>
          </div>

          {/* Заголовок */}
          <Link to={`/tour/${tour.slug}`}>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-sand-100 mb-2 leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
              {tour.title[language]}
            </h3>
          </Link>

          {/* Краткое описание */}
          <p className="text-sand-300/80 text-sm line-clamp-2 leading-relaxed mb-4">
            {tour.subtitle[language]}
          </p>
        </div>

        {/* Нижний бар: Цена и кнопки действий */}
        <div className="pt-4 mt-auto border-t border-sand-100/10 flex items-center justify-between">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-sand-400">
              {language === 'ua' ? 'Вартість туру' : 'Стоимость тура'}
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-serif font-bold text-amber-400">
                {tour.priceEUR ? `${tour.priceEUR.toLocaleString()} €` : `${tour.priceUSD.toLocaleString()} €`}
              </span>
              <span className="text-xs text-sand-400">
                / {tour.durationDays} {language === 'ua' ? 'днів' : 'дней'}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => openBookingModal(tour)}
              className="px-3 py-2 text-xs font-semibold rounded-lg bg-amber-600/15 text-amber-400 border border-amber-600/30 hover:bg-amber-600 hover:text-white transition-all duration-200"
            >
              {language === 'ua' ? 'Місце' : 'Место'}
            </button>

            <Link
              to={`/tour/${tour.slug}`}
              className="w-9 h-9 rounded-lg bg-ocean-800 hover:bg-amber-600 text-sand-100 flex items-center justify-center transition-colors group/btn"
              title={language === 'ua' ? 'Детальніше' : 'Подробнее'}
            >
              <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
