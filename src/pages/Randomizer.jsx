import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, MapPin, ArrowRight, RotateCw, 
  Gift, ShieldCheck, Zap, Video, Eye, Globe2
} from 'lucide-react';
import { useTours } from '../context/ToursContext';
import FlyingPlane from '../components/FlyingPlane';
import worldMapSvg from '../assets/world-map.svg';

export default function Randomizer() {
  const { tours, language, openBookingModal } = useTours();
  const isUa = language === 'ua';

  // Стадии работы глобуса: 'idle' | 'spinning' | 'zooming' | 'video'
  const [stage, setStage] = useState('idle');
  const [bgOffset, setBgOffset] = useState(0);
  const [selectedTour, setSelectedTour] = useState(null);
  const [targetLocation, setTargetLocation] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [displayedZoom, setDisplayedZoom] = useState(1.0);
  const [displayedCoords, setDisplayedCoords] = useState("64.9631° N, 19.0208° W");
  const [flashingCountry, setFlashingCountry] = useState(isUa ? "Очікування..." : "Ожидание...");
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  // Параметры карты и сферы:
  const MAP_WIDTH = 800;
  const SPHERE_SIZE = 320;

  // Фон по умолчанию — без фото (только карта мира + самолёт)
  const defaultBg = null;

  // Ref'ы для самолёта (контейнер страницы и глобус) + ширина тайла фоновой карты
  const pageRef = useRef(null);
  const globeRef = useRef(null);
  const [mapTileW, setMapTileW] = useState(1400);

  useEffect(() => {
    const measure = () => {
      const h = pageRef.current ? pageRef.current.getBoundingClientRect().height : window.innerHeight;
      // Карта 950x620 — сохраняем пропорции, растягивая на всю высоту экрана
      setMapTileW(Math.round(h * (950 / 620)));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Локации с координатами, видео с дрона и динамическими фото для фона сайта
  const tourLocations = [
    {
      id: "iceland-camper-adventure",
      name: isUa ? "Ісландія" : "Исландия",
      countryLabel: isUa ? "Ісландія • Кемпери & Водоспади" : "Исландия • Кемперы & Водопады",
      coordsText: "64.9631° N, 19.0208° W",
      normX: 0.428,
      normY: 0.22,
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      bgPhoto: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=2400&q=85",
      heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=85",
      glow1: "bg-emerald-400/20",
      glow2: "bg-cyan-400/20",
    },
    {
      id: "norway-camper-fjords",
      aliasId: "norway-fjords-camper",
      name: isUa ? "Норвегія" : "Норвегия",
      countryLabel: isUa ? "Норвегія • Фіорди & Язик Троля" : "Норвегия • Фьорды & Язык Тролля",
      coordsText: "60.4720° N, 8.4689° E",
      normX: 0.542,
      normY: 0.20,
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      bgPhoto: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85",
      heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85",
      glow1: "bg-teal-400/20",
      glow2: "bg-sky-400/20",
    },
    {
      id: "patagonia-4x4-expedition",
      name: isUa ? "Патагонія" : "Патагония",
      countryLabel: isUa ? "Патагонія • Торрес-дель-Пайне 4х4" : "Патагония • Торрес-дель-Пайне 4х4",
      coordsText: "51.2532° S, 72.8814° W",
      normX: 0.305,
      normY: 0.72,
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      bgPhoto: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=2400&q=85",
      heroImage: "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=1200&q=85",
      glow1: "bg-indigo-400/20",
      glow2: "bg-cyan-400/20",
    },
    {
      id: "peru-machu-picchu-trek",
      name: isUa ? "Перу" : "Перу",
      countryLabel: isUa ? "Перу • Мачу-Пікчу & Райдужні гори" : "Перу • Мачу-Пикчу & Радужные горы",
      coordsText: "13.1631° S, 72.5450° W",
      normX: 0.265,
      normY: 0.60,
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      bgPhoto: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=2400&q=85",
      heroImage: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=85",
      glow1: "bg-emerald-500/25",
      glow2: "bg-amber-500/20",
    },
    {
      id: "namibia-safari-expedition",
      name: isUa ? "Намібія" : "Намибия",
      countryLabel: isUa ? "Намібія • Дюни Соссусфлей & Сафарі" : "Намибия • Дюны Соссусфлей & Сафари",
      coordsText: "22.5609° S, 17.0658° E",
      normX: 0.522,
      normY: 0.66,
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      bgPhoto: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=85",
      heroImage: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85",
      glow1: "bg-amber-500/25",
      glow2: "bg-orange-500/20",
    },
    {
      id: "oman-4x4-desert",
      name: isUa ? "Оман" : "Оман",
      countryLabel: isUa ? "Оман • Каньйони & Пустеля Вахіба" : "Оман • Каньоны & Пустыня Вахиба",
      coordsText: "23.5880° N, 58.3829° E",
      normX: 0.630,
      normY: 0.45,
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      bgPhoto: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=85",
      heroImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=85",
      glow1: "bg-amber-400/25",
      glow2: "bg-orange-600/20",
    },
    {
      id: "japan-autumn-zen",
      aliasId: "japan-autumn-expedition",
      name: isUa ? "Японія" : "Япония",
      countryLabel: isUa ? "Японія • Клени Момідзі & Кіото" : "Япония • Клены Момидзи & Киото",
      coordsText: "35.6762° N, 139.6503° E",
      normX: 0.825,
      normY: 0.36,
      videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
      bgPhoto: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2400&q=85",
      heroImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85",
      glow1: "bg-rose-500/25",
      glow2: "bg-amber-400/20",
    },
  ];

  const intervalRef = useRef(null);
  const zoomIntervalRef = useRef(null);
  const timeoutRef1 = useRef(null);
  const timeoutRef2 = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (zoomIntervalRef.current) clearInterval(zoomIntervalRef.current);
      if (timeoutRef1.current) clearTimeout(timeoutRef1.current);
      if (timeoutRef2.current) clearTimeout(timeoutRef2.current);
    };
  }, []);

  const handleSpinGlobe = () => {
    if (stage === 'spinning' || stage === 'zooming') return;

    setStage('spinning');
    setZoomLevel(1);
    setDisplayedZoom(1.0);
    setShockwaveActive(false);
    setSelectedTour(null);
    setVideoFailed(false);

    // 1. Выбор случайного тура
    const availableTours = tours && tours.length > 0 ? tours : [];
    const targetTour = availableTours.length > 0 
      ? availableTours[Math.floor(Math.random() * availableTours.length)]
      : null;

    const locInfo = tourLocations.find(l => l.id === targetTour?.id || l.aliasId === targetTour?.id) || tourLocations[Math.floor(Math.random() * tourLocations.length)];
    setTargetLocation(locInfo);

    // 2. Расчет поворота глобуса:
    const spinRevolutions = 3;
    const baseShift = bgOffset + (spinRevolutions * MAP_WIDTH);
    const desiredMod = ((locInfo.normX * MAP_WIDTH - (SPHERE_SIZE / 2)) % MAP_WIDTH + MAP_WIDTH) % MAP_WIDTH;
    const currentMod = ((baseShift % MAP_WIDTH) + MAP_WIDTH) % MAP_WIDTH;
    let diff = desiredMod - currentMod;
    if (diff < 0) diff += MAP_WIDTH;
    const targetOffset = baseShift + diff;

    setBgOffset(targetOffset);

    // Быстрая смена координат на радаре во время вращения (каждые 70 мс)
    intervalRef.current = setInterval(() => {
      const randomLoc = tourLocations[Math.floor(Math.random() * tourLocations.length)];
      setFlashingCountry(randomLoc.name);

      const lat = (Math.random() * 120 - 60).toFixed(4);
      const lng = (Math.random() * 360 - 180).toFixed(4);
      setDisplayedCoords(`${Math.abs(lat)}° ${lat >= 0 ? 'N' : 'S'}, ${Math.abs(lng)}° ${lng >= 0 ? 'E' : 'W'}`);
    }, 70);

    // 3. ФАЗА 2: ОСТАНОВКА ВРАЩЕНИЯ И КИНЕМАТОГРАФИЧЕСКИЙ ЗУМ (через 2.5 сек)
    timeoutRef1.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      setDisplayedCoords(locInfo.coordsText);
      setFlashingCountry(locInfo.name);
      setStage('zooming');
      setZoomLevel(7.5);

      // Динамический счетчик зума в HUD
      let currentZ = 1.0;
      zoomIntervalRef.current = setInterval(() => {
        currentZ += 0.35;
        if (currentZ >= 7.5) {
          currentZ = 7.5;
          if (zoomIntervalRef.current) clearInterval(zoomIntervalRef.current);
        }
        setDisplayedZoom(Number(currentZ.toFixed(1)));
      }, 70);

      // 4. ФАЗА 3: ПЕРЕХОД В ЖИВОЕ ВИДЕО ПУТЕШЕСТВИЯ (через 1.7 сек после начала зума)
      timeoutRef2.current = setTimeout(() => {
        if (zoomIntervalRef.current) clearInterval(zoomIntervalRef.current);
        setDisplayedZoom(8.0);
        setStage('video');
        setSelectedTour(targetTour);
        setShockwaveActive(true);
      }, 1700);

    }, 2500);
  };

  const handleResetToMap = () => {
    setStage('idle');
    setZoomLevel(1);
    setDisplayedZoom(1.0);
    setSelectedTour(null);
  };

  const isSpinning = stage === 'spinning';
  const isZooming = stage === 'zooming';
  const isVideo = stage === 'video';

  // Показываем движущуюся карту ТОЛЬКО пока глобус в режиме ожидания или крутится.
  // Как только глобус прокрутился — движущаяся карта плавно убирается, и остаётся только фон выпавшего места!
  const showMovingMap = (stage === 'idle' || stage === 'spinning') && !selectedTour;

  // Динамический фото-фон места
  const currentBgPhoto = targetLocation?.bgPhoto;

  const currentGlow1 = (targetLocation && !showMovingMap)
    ? targetLocation.glow1
    : "bg-amber-500/8";

  const currentGlow2 = (targetLocation && !showMovingMap)
    ? targetLocation.glow2
    : "bg-emerald-950/20";

  return (
    <div ref={pageRef} className="min-h-screen bg-[#090d10] bg-gradient-to-b from-[#050709] via-[#090d10] to-[#040608] text-white relative overflow-hidden selection:bg-[#FA9A1B] selection:text-slate-950 flex flex-col justify-start lg:justify-center pt-24 md:pt-28 pb-8 px-4 sm:px-6">
      
      {/* 1. ФОНОВЫЕ СЛОИ: БЛАГОРОДНАЯ ТЁМНАЯ КАРТА МИРА (во время прокрутки) ИЛИ ФОН МЕСТА (после) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* А. Тонкая тёмная карта мира на ВЕСЬ экран — деликатная премиальная текстура в стиле AURA */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
          style={{
            opacity: showMovingMap ? (isSpinning ? 0.35 : 0.22) : 0,
            '--tile': `${mapTileW}px`,
            backgroundImage: `url("${worldMapSvg}")`,
            backgroundRepeat: "repeat-x",
            backgroundSize: `${mapTileW}px 100%`,
            backgroundPositionY: "center",
            animation: isSpinning 
              ? "bgMapSpin 2.5s cubic-bezier(0.15, 0.85, 0.25, 1) forwards" 
              : "bgMapScroll 90s linear infinite",
            filter: "brightness(0.85) contrast(1.25) drop-shadow(0 0 12px rgba(245, 158, 11, 0.35))",
          }}
        />

        {/* Б. Динамическое панорамное фото выпавшего места — остаётся главным атмосферным фоном после прокрутки */}
        <AnimatePresence mode="wait">
          {!showMovingMap && currentBgPhoto && (
            <motion.div
              key={currentBgPhoto}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 pointer-events-none"
            >
              <img
                src={currentBgPhoto}
                alt=""
                className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.1] saturate-[1.1]"
              />
              {/* Мягкие кинематографические градиенты для безупречной читаемости интерфейса */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050709]/95 via-[#090d10]/55 to-[#050709]/85" />
              <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#090d10]/30 to-[#050709]/80" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Мягкие акцентные световые пятна в благородных золотисто-графитовых тонах */}
        <div className={`absolute -top-24 left-1/4 w-[500px] h-[500px] rounded-full blur-[140px] transition-colors duration-1000 ${currentGlow1}`} />
        <div className={`absolute -bottom-24 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] transition-colors duration-1000 ${currentGlow2}`} />
      </div>

      {/* САМОЛЁТ: летает с разных сторон, при вращении глобуса делает плавный замедленный 3D-облёт */}
      <FlyingPlane 
        containerRef={pageRef} 
        globeRef={globeRef} 
        isOrbiting={isSpinning} 
        orbitDuration={5.8} 
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col justify-center my-auto">
        
        {/* ХЕДЕР СВЕРХУ В СТИЛЕ AURA EXPEDITIONS (СЕРИФ + ЗОЛОТО) */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-normal sm:font-medium tracking-tight drop-shadow-md">
            {isUa ? "Глобус удачі: Обери спонтанну подорож" : "Глобус удачи: Выбери спонтанное путешествие"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl mx-auto font-medium">
            {isUa 
              ? "Довірся долі та розкрути глобус — кинематографічний зум перенесе тебе в серце експедиції!" 
              : "Доверься судьбе и крути глобус — кинематографический зум перенесет тебя в сердце экспедиции!"}
          </p>
        </div>

        {/* ДВУХКОЛОНОЧНЫЙ SPLIT-SCREEN */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center max-w-6xl mx-auto w-full">
          
          {/* ЛЕВАЯ КОЛОНКА (6 колонок): КИНЕМАТОГРАФИЧЕСКИЙ 3D-ГЛОБУС ЗЕМЛИ */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            
            {/* Плашка радара координат с индикатором статуса в стиле AURA */}
            <div className="w-full max-w-[320px] bg-[#0e1417]/90 backdrop-blur-xl rounded-xl border border-white/10 px-3.5 py-2 mb-2 flex items-center justify-between text-xs shadow-xl">
              <div className="flex items-center space-x-2">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  isSpinning ? 'bg-amber-400 animate-ping' : 
                  isZooming ? 'bg-orange-500 animate-ping' : 
                  isVideo ? 'bg-red-500 animate-pulse' : 'bg-emerald-400 animate-pulse'
                }`} />
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-none">
                    {isVideo ? "LIVE КАМЕРА" : isZooming ? "ЗУМ ОБ'ЄКТИВА" : "РАДАР"}
                  </span>
                  <span className="text-xs font-black text-amber-300 font-mono mt-0.5 block">
                    {displayedCoords}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block leading-none">
                  {isZooming ? `x${displayedZoom}` : isVideo ? "ЕКСПЕДИЦІЯ" : "ФОКУС"}
                </span>
                <span className="text-xs font-bold text-white mt-0.5 block truncate max-w-[120px]">
                  {flashingCountry}
                </span>
              </div>
            </div>

            {/* ОСНОВНОЙ КОНТЕЙНЕР 3D ГЛОБУСА (270px - 320px) */}
            <div ref={globeRef} className="relative w-[270px] h-[270px] sm:w-[320px] sm:h-[320px] flex items-center justify-center my-1 select-none">
              
              {/* Атмосферное внешнее свечение планеты */}
              <div className={`absolute inset-2 sm:inset-4 rounded-full transition-all duration-700 pointer-events-none ${
                isSpinning 
                  ? 'bg-amber-400/35 blur-2xl scale-105' 
                  : isVideo 
                    ? 'bg-red-500/30 blur-2xl scale-100'
                    : selectedTour 
                      ? 'bg-emerald-400/30 blur-2xl scale-100'
                      : 'bg-cyan-400/25 blur-xl'
              }`} />

              {/* Ударная волна при остановке глобуса */}
              <AnimatePresence>
                {shockwaveActive && (
                  <motion.div
                    initial={{ scale: 0.85, opacity: 1 }}
                    animate={{ scale: 1.45, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.1, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-2 border-amber-400 pointer-events-none shadow-[0_0_25px_#F59E0B]"
                  />
                )}
              </AnimatePresence>

              {/* ВРАЩАЮЩАЯСЯ ПУНКТИРНАЯ ОРБИТА СО СПУТНИКОМ */}
              <div 
                className="absolute -inset-4 sm:-inset-5 rounded-full border border-dashed border-cyan-400/35 pointer-events-none"
                style={{ animation: 'spin 26s linear infinite' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_10px_#38BDF8]" />
                  <div className="w-5 h-0.5 bg-cyan-400/80 rounded" />
                </div>
              </div>

              {/* ТОНКОЕ КОЛЬЦО-КОМПАС С ДЕЛЕНИЯМИ N, S, W, E */}
              <div className="absolute -inset-1 rounded-full border border-cyan-300/35 pointer-events-none flex items-center justify-center">
                <span className="absolute top-1 text-[10px] font-black text-amber-300 tracking-wider">N</span>
                <span className="absolute bottom-1 text-[10px] font-bold text-cyan-300/70 tracking-wider">S</span>
                <span className="absolute left-1.5 text-[10px] font-bold text-cyan-300/70 tracking-wider">W</span>
                <span className="absolute right-1.5 text-[10px] font-bold text-cyan-300/70 tracking-wider">E</span>
              </div>

              {/* ОСНОВНАЯ КРУГЛАЯ 3D СФЕРА С ЛАЗУРНЫМ ОКЕАНОМ И ШЕЙДИНГОМ */}
              <div 
                className="relative w-full h-full rounded-full overflow-hidden border-2 border-cyan-400/50 shadow-2xl"
                style={{
                  background: 'radial-gradient(circle at 35% 28%, #0284c7 0%, #0369a1 40%, #02466b 75%, #05263b 100%)',
                  boxShadow: 'inset -35px -35px 60px rgba(2, 18, 32, 0.9), inset 15px 15px 40px rgba(56, 189, 248, 0.4), 0 0 50px rgba(56, 189, 248, 0.45)',
                }}
              >
                
                {/* 2. СЛОЙ ЗУМИРОВАНИЯ И ВРАЩЕНИЯ КАРТЫ (GOOGLE EARTH ZOOM x1 -> x8) */}
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ 
                    transform: `rotate(-15deg) scale(${zoomLevel * 1.15})`,
                    transformOrigin: '50% 50%',
                    transition: isZooming 
                      ? 'transform 1.7s cubic-bezier(0.25, 1, 0.5, 1)' 
                      : isSpinning 
                        ? 'none' 
                        : 'transform 0.8s ease-out',
                  }}
                >
                  {/* БЕСШОВНЫЙ СЛОЙ КАРТЫ МАТЕРИКОВ ЧЕРЕЗ REPEAT-X (НИКОГДА НЕ ПРОПАДАЕТ!) */}
                  <div
                    className="w-full h-full relative"
                    style={{
                      backgroundImage: `url("${worldMapSvg}")`,
                      backgroundRepeat: "repeat-x",
                      backgroundSize: `${MAP_WIDTH}px 100%`,
                      backgroundPositionX: `-${bgOffset}px`,
                      backgroundPositionY: "center",
                      transition: isSpinning 
                        ? "background-position-x 2.5s cubic-bezier(0.15, 0.85, 0.25, 1)" 
                        : "background-position-x 0.8s ease-out",
                      filter: isSpinning 
                        ? "sepia(20%) saturate(220%) brightness(1.15) blur(1px) drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))"
                        : "sepia(20%) saturate(220%) brightness(1.15) drop-shadow(0 0 6px rgba(52, 211, 153, 0.6))",
                      opacity: isVideo ? 0 : 1,
                    }}
                  />
                </div>

                {/* ЭФФЕКТ ПРОЛЕТА СКВОЗЬ ОБЛАКА ПРИ ЗУМЕ (BACKDROP-BLUR & MIST) */}
                <AnimatePresence>
                  {isZooming && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: [0, 0.75, 0], scale: [0.6, 1.4, 2.2] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.6, ease: "easeInOut" }}
                      className="absolute inset-0 rounded-full pointer-events-none backdrop-blur-[2px]"
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 40%, transparent 75%)',
                      }}
                    />
                  )}
                </AnimatePresence>

                {/* HUD ИНДИКАТОР МАСШТАБА GOOGLE EARTH (ZOOM: x2.0 -> x8.0) */}
                {isZooming && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-slate-950/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-cyan-400 text-cyan-300 text-xs font-black font-mono shadow-[0_0_20px_rgba(56,189,248,0.5)] flex items-center space-x-1.5"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>ZOOM: x{displayedZoom.toFixed(1)}</span>
                    </motion.div>
                  </div>
                )}

                {/* 3. ЖИВОЕ АТМОСФЕРНОЕ ВИДЕО ПУТЕШЕСТВИЯ С ДРОНА (STAGE === 'VIDEO') */}
                <AnimatePresence>
                  {isVideo && targetLocation && (
                    <motion.div
                      initial={{ opacity: 0, scale: 1.15 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full overflow-hidden z-20 bg-slate-950"
                    >
                      {/* Видео природы / гор / океана */}
                      {!videoFailed ? (
                        <video
                          key={targetLocation.id}
                          src={targetLocation.videoUrl}
                          autoPlay
                          loop
                          muted
                          playsInline
                          onError={() => setVideoFailed(true)}
                          className="w-full h-full object-cover scale-105"
                        />
                      ) : (
                        /* Fallback на анимированное фото тура (Ken-Burns) */
                        <img
                          src={targetLocation.heroImage}
                          alt={targetLocation.name}
                          className="w-full h-full object-cover animate-pulse"
                        />
                      )}

                      {/* Затемнение и виньетка для глубины */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

                      {/* HUD Оверлей поверх видео */}
                      <div className="absolute top-3 inset-x-0 flex justify-center pointer-events-none">
                        <span className="bg-red-600/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-white text-[10px] font-black tracking-wider flex items-center space-x-1 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                          <span>LIVE VIEW • x8.0</span>
                        </span>
                      </div>

                      {/* Название локации внизу видео */}
                      <div className="absolute bottom-3 inset-x-0 text-center px-4 pointer-events-none">
                        <span className="text-white text-xs font-black tracking-wide drop-shadow-md block truncate">
                          🎯 {targetLocation.name}
                        </span>
                        <span className="text-[10px] text-cyan-200/90 font-mono block">
                          {targetLocation.coordsText}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* НОЧНОЕ ЗАТЕМНЕНИЕ И ГЛУБИНА ПЛАНЕТЫ (СПРАВА СНИЗУ) */}
                <div 
                  className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${isVideo ? 'opacity-20' : 'opacity-100'}`}
                  style={{
                    background: 'radial-gradient(circle at 30% 25%, transparent 35%, rgba(2, 14, 26, 0.45) 70%, rgba(1, 8, 16, 0.95) 100%)',
                  }}
                />

                {/* ТЕПЛОЕ СОЛНЕЧНО-ЗОЛОТИСТОЕ СВЕЧЕНИЕ СЛЕВА СВЕРХУ */}
                <div 
                  className={`absolute -top-4 -left-4 w-[180px] h-[100px] rounded-[50%] pointer-events-none -rotate-45 transition-opacity duration-500 ${isVideo ? 'opacity-20' : 'opacity-100'}`}
                  style={{
                    background: 'radial-gradient(ellipse at 30% 30%, rgba(251, 191, 36, 0.38) 0%, rgba(255, 255, 255, 0.25) 35%, transparent 70%)',
                    filter: 'blur(3px)',
                  }}
                />

                {/* ВНУТРЕННИЙ ГОЛУБОЙ ОРЕОЛ АТМОСФЕРЫ ЗЕМЛИ */}
                <div 
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 35px rgba(56, 189, 248, 0.45)',
                  }}
                />

                {/* ПЕРЕКРЕСТИЕ РАДАРА В ЦЕНТРЕ (СТРОГО ГОРИЗОНТАЛЬНО) */}
                <div className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500 ${isVideo ? 'opacity-30' : 'opacity-100'}`}>
                  <div className="w-16 h-[1px] bg-cyan-300/40" />
                  <div className="h-16 w-[1px] bg-cyan-300/40 absolute" />
                  <div className="w-10 h-10 rounded-full border border-cyan-300/50 absolute flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border border-dashed border-cyan-200/40" />
                  </div>
                </div>

                {/* ЗОЛОТОЙ ПИН В ТОЧКЕ ОСТАНОВКИ ПРИ ЗУМЕ (НЕ ПЕРЕВОРАЧИВАЕТСЯ) */}
                {isZooming && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
                    <div className="absolute w-12 h-12 rounded-full border border-amber-300/60 animate-pulse" />
                    <div className="absolute w-8 h-8 rounded-full bg-[#fbbf24]/50 animate-ping" />
                    <div className="relative w-4 h-4 rounded-full bg-[#f97316] border-2 border-white shadow-[0_0_15px_#f97316]" />
                  </div>
                )}
              </div>
            </div>

            {/* КНОПКА ВОЗВРАТА К КАРТЕ ЕСЛИ ИДЕТ ВИДЕО */}
            {isVideo && (
              <button
                onClick={handleResetToMap}
                className="mt-2 text-xs font-bold text-cyan-300 hover:text-white flex items-center space-x-1.5 bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-all border border-cyan-400/30 cursor-pointer"
              >
                <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isUa ? "🗺 Повернутися до 3D-карти" : "🗺 Вернуться к 3D-карте"}</span>
              </button>
            )}

            {/* ЯРКАЯ ОРАНЖЕВАЯ КНОПКА ЗАПУСКА */}
            <button
              onClick={handleSpinGlobe}
              disabled={isSpinning || isZooming}
              className={`w-full max-w-[340px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-extrabold text-xs sm:text-sm md:text-base tracking-wide uppercase shadow-xl transition-all flex items-center justify-center space-x-2.5 mt-3 sm:mt-4 cursor-pointer active:scale-95 disabled:cursor-not-allowed ${
                isSpinning || isZooming
                  ? 'bg-slate-700/80 text-slate-300 border border-white/10'
                  : 'bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#EA580C] hover:from-[#d97706] hover:to-[#c2410c] text-white border border-amber-300/40 hover:shadow-orange-500/40 hover:shadow-2xl'
              }`}
            >
              <RotateCw className={`w-4 h-4 sm:w-5 sm:h-5 ${isSpinning || isZooming ? 'animate-spin' : ''}`} />
              <span>
                {isSpinning 
                  ? (isUa ? "Обираємо маршрут..." : "Выбираем маршрут...")
                  : isZooming 
                    ? (isUa ? "Приближення до точки..." : "Приближение к точке...")
                    : (isUa ? "🌍 КРУТИТИ ГЛОБУС (ВИПРОБУВАТИ ВДАЧУ)" : "🌍 КРУТИТЬ ГЛОБУС (ИСПЫТАТЬ УДАЧУ)")}
              </span>
            </button>

            <span className="text-[11px] sm:text-xs text-amber-300/90 font-medium mt-2 flex items-center space-x-1.5 text-center">
              <Gift className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>
                {isUa 
                  ? "Гарантований бонус -50 € до кожного виграного туру" 
                  : "Гарантированный бонус -50 € к каждому выпавшему туру"}
              </span>
            </span>
          </div>

          {/* ПРАВАЯ КОЛОНКА (6 колонок): ЗОНА РЕЗУЛЬТАТА В СТЕКЛЯННОЙ КАРТОЧКЕ */}
          <div className="lg:col-span-6 w-full flex flex-col justify-center">
            <AnimatePresence mode="wait">
              
              {/* СОСТОЯНИЕ 1: ДО ПРОКРУТКИ — СТИЛЬНАЯ КАРТОЧКА С ПРАВИЛАМИ И БОНУСОМ -50 € В СТИЛЕ AURA */}
              {!selectedTour && !isSpinning && !isZooming && (
                <motion.div
                  key="initial-placeholder"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-[#0e1417]/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-white/10 shadow-2xl text-center text-white relative overflow-hidden"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#161f24] border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <Compass className="w-6 h-6 sm:w-7 sm:h-7 animate-spin duration-[20000ms]" />
                  </div>

                  <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest block mb-1">
                    {isUa ? "✦ ГОТОВІ ДО ПРИГОДИ?" : "✦ ГОТОВЫ К ПРИКЛЮЧЕНИЮ?"}
                  </span>

                  <h3 className="font-serif text-lg sm:text-2xl font-normal text-white mb-2 leading-tight">
                    {isUa ? "Куди приведе тебе доля цього разу?" : "Куда приведет тебя судьба в этот раз?"}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 sm:mb-5 max-w-md mx-auto font-medium">
                    {isUa 
                      ? "Натисни кнопку зліва, щоб розкрутити глобус і довіритися випадку. Система обере твою наступну експедицію та подарує знижку -50 €!"
                      : "Нажми кнопку слева, чтобы раскрутить глобус и довериться случаю. Система выберет следующую экспедицию и подарит скидку -50 €!"}
                  </p>

                  <div className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-2 text-xs text-slate-300">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{isUa ? "6 унікальних авторських напрямків" : "6 уникальных авторских направлений"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Gift className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span>{isUa ? "Знижка -50 € закріплюється на 24 години" : "Скидка -50 € закрепляется на 24 часа"}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{isUa ? "Невеликі групи 8-12 мандрівників" : "Небольшие группы 8-12 путешественников"}</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* СОСТОЯНИЕ 2: ПРОЦЕСС ВРАЩЕНИЯ ИЛИ ЗУМА */}
              {(isSpinning || isZooming) && (
                <motion.div
                  key="spinning-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0e1417]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-amber-500/30 shadow-2xl text-center py-10 sm:py-12 text-white"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
                    {isZooming ? (
                      <Eye className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse text-amber-300" />
                    ) : (
                      <RotateCw className="w-7 h-7 sm:w-8 sm:h-8 animate-spin" />
                    )}
                  </div>

                  <span className="text-xs font-black text-amber-400 uppercase tracking-widest block mb-2 animate-pulse">
                    {isZooming 
                      ? (isUa ? `🚀 ПРИБЛИЖЕННЯ КАМЕРИ • ZOOM x${displayedZoom.toFixed(1)}` : `🚀 ПРИБЛИЖЕНИЕ КАМЕРЫ • ZOOM x${displayedZoom.toFixed(1)}`)
                      : (isUa ? "РАДАР СКАНУЄ ПЛАНЕТУ..." : "РАДАР СКАНИРУЕТ ПЛАНЕТУ...")}
                  </span>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-white mb-3 tracking-wide">
                    {flashingCountry}
                  </h3>

                  <p className="text-xs text-slate-400 max-w-xs mx-auto mb-5">
                    {isZooming 
                      ? (isUa ? "Пролітаємо крізь хмари в точку висадки експедиції..." : "Пролетаем сквозь облака в точку высадки экспедиции...")
                      : (isUa ? "Шукаємо найідеальніший маршрут для вашої спонтанної відпустки..." : "Ищем идеальный маршрут для вашего спонтанного отпуска...")}
                  </p>

                  <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-75"
                      style={{ width: isZooming ? `${(displayedZoom / 8.0) * 100}%` : '50%' }}
                    />
                  </div>
                </motion.div>
              )}

              {/* СОСТОЯНИЕ 3: РЕЗУЛЬТАТ — КАРТОЧКА ВЫПАВШЕГО ТУРА С БОНУСОМ В СТИЛЕ AURA EXPEDITIONS */}
              {selectedTour && !isSpinning && !isZooming && (
                <motion.div
                  key="tour-result"
                  initial={{ opacity: 0, x: 20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="bg-[#0e1417] backdrop-blur-xl rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 shadow-2xl text-white relative"
                >
                  {/* Промо-полоска со скидкой */}
                  <div className="bg-gradient-to-r from-[#F59E0B] via-amber-500 to-[#EA580C] px-3.5 py-2 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-md">
                    <Gift className="w-4 h-4 fill-slate-950 flex-shrink-0" />
                    <span className="truncate">
                      {isUa 
                        ? "🎁 Бонус за спонтанність: знижка -50 € закріплена!" 
                        : "🎁 Бонус за спонтанность: скидка -50 € закреплена!"}
                    </span>
                  </div>

                  {/* Фото выпавшего тура */}
                  <div className="relative h-36 sm:h-44 overflow-hidden bg-slate-900">
                    <img
                      src={selectedTour.heroImage}
                      alt={selectedTour.title[language] || selectedTour.title.ua}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e1417] via-transparent to-black/30" />

                    {/* Страна */}
                    <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-md px-2.5 py-0.5 rounded-lg text-slate-200 text-xs font-black flex items-center space-x-1 shadow-sm border border-white/10">
                      <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                      <span>{selectedTour.country}</span>
                    </div>

                    {/* Формат в стиле AURA badge */}
                    <div className="absolute top-2.5 right-2.5 bg-[#1c2429]/90 backdrop-blur-md px-2.5 py-1 rounded-md text-amber-300 text-[10px] font-extrabold uppercase border border-amber-500/25">
                      {selectedTour.formatTag ? (selectedTour.formatTag[language] || selectedTour.formatTag.ua) : 'Експедиція'}
                    </div>

                    {/* Стоимость со скидкой */}
                    <div className="absolute bottom-2.5 right-2.5 bg-[#0e1417]/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-right border border-white/15">
                      <span className="text-[10px] text-slate-400 line-through block leading-tight">
                        {selectedTour.priceEUR ? `${selectedTour.priceEUR} €` : `$${selectedTour.priceUSD}`}
                      </span>
                      <span className="text-base sm:text-xl font-bold font-serif text-amber-400 leading-tight">
                        {selectedTour.priceEUR ? `${selectedTour.priceEUR - 50} €` : `$${selectedTour.priceUSD - 50}`}
                      </span>
                    </div>
                  </div>

                  {/* Контент карточки в стиле AURA */}
                  <div className="p-4 sm:p-5">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-white leading-snug mb-1 line-clamp-1">
                      {selectedTour.title[language] || selectedTour.title.ua}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-2">
                      {selectedTour.subtitle 
                        ? (selectedTour.subtitle[language] || selectedTour.subtitle.ua) 
                        : (selectedTour.description[language] || selectedTour.description.ua)}
                    </p>

                    {/* Параметры тура */}
                    <div className="grid grid-cols-3 gap-2 p-2.5 bg-white/[0.03] rounded-xl border border-white/10 mb-4 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">{isUa ? "Дати" : "Даты"}</span>
                        <span className="font-bold text-white truncate block">{selectedTour.dates?.split('—')[0]?.trim()}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">{isUa ? "Тривалість" : "Дней"}</span>
                        <span className="font-bold text-white">{selectedTour.durationDays} {isUa ? "дн." : "дн."}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold block">{isUa ? "Місця" : "Места"}</span>
                        <span className="font-bold text-emerald-400">{selectedTour.remainingSeats} {isUa ? "вільно" : "свободно"}</span>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="space-y-2">
                      <button
                        onClick={() => openBookingModal({
                          ...selectedTour,
                          bonusDiscount: 50,
                          promoCode: 'LUCKY-GLOBE-50'
                        })}
                        className="w-full py-3 bg-gradient-to-r from-[#F59E0B] to-[#EA580C] hover:from-[#d97706] hover:to-[#c2410c] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-98"
                      >
                        <Gift className="w-4 h-4 fill-white" />
                        <span>{isUa ? "Забронювати зі знижкою (-50 €)" : "Забронировать со скидкой (-50 €)"}</span>
                      </button>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <Link
                          to={`/tour/${selectedTour.slug}`}
                          className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 border border-white/10"
                        >
                          <span>{isUa ? "Програма туру" : "Программа тура"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          onClick={handleSpinGlobe}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 text-amber-400 font-bold text-xs rounded-xl transition-colors flex items-center justify-center space-x-1 border border-white/10 cursor-pointer"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span>{isUa ? "Ще раз" : "Еще раз"}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
