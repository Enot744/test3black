import React, { createContext, useContext, useState, useMemo } from 'react';
import { initialTours } from '../data/initialTours';

const ToursContext = createContext(null);

export const ToursProvider = ({ children }) => {
  // База туров (готова к расширению через API / Админку)
  const [tours, setTours] = useState(initialTours);
  
  // Текущий язык: 'ua' по умолчанию, доступен 'ru'
  const [language, setLanguage] = useState('ua');

  // Фильтры каталога
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [searchQuery, setSearchQuery] = useState('');

  // Состояние модального окна бронирования
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTour, setBookingTour] = useState(null);

  // Переключение языка
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ua' ? 'ru' : 'ua'));
  };

  // Открытие модалки бронирования (для конкретного тура или общее)
  const openBookingModal = (tour = null) => {
    setBookingTour(tour);
    setIsBookingOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingOpen(false);
    setBookingTour(null);
  };

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedRegion('all');
    setSelectedMonth('all');
    setSelectedDifficulty('all');
    setMaxPrice(5000);
    setSearchQuery('');
  };

  // Реактивная фильтрация туров
  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      // Регион
      if (selectedRegion !== 'all' && tour.regionKey !== selectedRegion) {
        return false;
      }

      // Месяц
      if (selectedMonth !== 'all' && tour.monthKey !== selectedMonth) {
        return false;
      }

      // Сложность
      if (selectedDifficulty !== 'all' && tour.difficultyLevel !== selectedDifficulty) {
        return false;
      }

      // Бюджет
      if (tour.priceUSD > maxPrice) {
        return false;
      }

      // Поиск по названию / стране
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const titleMatch = tour.title[language].toLowerCase().includes(query);
        const countryMatch = tour.country.toLowerCase().includes(query);
        const descMatch = tour.subtitle[language].toLowerCase().includes(query);
        if (!titleMatch && !countryMatch && !descMatch) {
          return false;
        }
      }

      return true;
    });
  }, [tours, selectedRegion, selectedMonth, selectedDifficulty, maxPrice, searchQuery, language]);

  // Словари интерфейса для мультиязычности UA/RU
  const translations = {
    ua: {
      nav: {
        home: "Головна",
        catalog: "Всі подорожі",
        about: "Про клуб",
        bookNow: "Забронювати",
      },
      hero: {
        badge: "Клуб авторських подорожей 2025/2026",
        titleLine1: "Подорожі, які",
        titleLine2: "змінюють свідомість",
        subtitle: "Маленькі закриті групи до 8-10 осіб, унікальні локації поза масовим туризмом та супровід світових експертів.",
        exploreBtn: "Обрати експедицію",
        aboutBtn: "Філософія клубу",
        statsYears: "Років досвіду",
        statsExpeditions: "Проведених турів",
        statsHappy: "Задоволених мандрівників",
        statsScore: "Рейтинг вражень",
      },
      common: {
        days: "днів",
        from: "від",
        person: "особа",
        details: "Детальніше",
        bookTour: "Забронювати місце",
        allTours: "Всі подорожі",
        clearFilters: "Скинути фільтри",
        noResults: "За вашими критеріями експедицій не знайдено",
        tryResetting: "Спробуйте змінити параметри пошуку або скинути фільтри",
        reviewsTitle: "Що кажуть наші мандрівники",
        reviewsSubtitle: "Чесні враження людей, які відкрили планету разом з AURA Expeditions",
        faqTitle: "Часті запитання",
        faqSubtitle: "Все, що вам потрібно знати перед вашою першою подорожжю",
      }
    },
    ru: {
      nav: {
        home: "Главная",
        catalog: "Все путешествия",
        about: "О клубе",
        bookNow: "Забронировать",
      },
      hero: {
        badge: "Клуб авторских путешествий 2025/2026",
        titleLine1: "Путешествия, которые",
        titleLine2: "меняют сознание",
        subtitle: "Маленькие закрытые группы до 8-10 человек, уникальные локации вне массового туризма и сопровождение признанных экспертов.",
        exploreBtn: "Выбрать экспедицию",
        aboutBtn: "Философия клуба",
        statsYears: "Лет опыта",
        statsExpeditions: "Проведенных туров",
        statsHappy: "Довольных путешественников",
        statsScore: "Рейтинг впечатлений",
      },
      common: {
        days: "дней",
        from: "от",
        person: "человек",
        details: "Подробнее",
        bookTour: "Забронировать место",
        allTours: "Все путешествия",
        clearFilters: "Сбросить фильтры",
        noResults: "По вашим критериям экспедиций не найдено",
        tryResetting: "Попробуйте изменить параметры поиска или сбросить фильтры",
        reviewsTitle: "Что говорят наши путешественники",
        reviewsSubtitle: "Честные эмоции людей, исследовавших планету вместе с AURA Expeditions",
        faqTitle: "Частые вопросы",
        faqSubtitle: "Все, что вам нужно знать перед вашей первой экспедицией",
      }
    }
  };

  const t = translations[language];

  return (
    <ToursContext.Provider
      value={{
        tours,
        setTours,
        language,
        setLanguage,
        toggleLanguage,
        t,
        // Фильтры
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
        filteredTours,
        // Модалка бронирования
        isBookingOpen,
        bookingTour,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </ToursContext.Provider>
  );
};

export const useTours = () => {
  const context = useContext(ToursContext);
  if (!context) {
    throw new Error('useTours must be used within a ToursProvider');
  }
  return context;
};
