import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScrollClimber - Minimalist Rappelling Climber for AURA EXPEDITIONS
 * 
 * Mathematical & Physics Tuning:
 * 1. Fixed calm hand grip on the rope at chest/waist level (no upward jerking/flailing).
 * 2. 3.5x slower bounce frequency (0.014): short spring kick (20% phase) + long buttery slide (80% phase)
 *    smoothed with spring stiffness: 90, damping: 22.
 * 3. 1.8px visible golden rope with subtle glow (rgba(245, 158, 11, 0.65)).
 * 4. iPhone adaptive positioning (< 500px): strictly right-1 (4px) with scale(0.85).
 */
export default function ScrollClimber() {
  const [screenMode, setScreenMode] = useState(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < 500) return 'iphone';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  });

  const [scrollY, setScrollY] = useState(0);
  const [climberY, setClimberY] = useState(110);
  const [mode, setMode] = useState('idle'); // 'idle' | 'rappel' | 'slide'
  const [bounceX, setBounceX] = useState(0);
  const [sparks, setSparks] = useState([]);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const sparkId = useRef(0);
  const lastImpactRef = useRef(0);

  const isIphone = screenMode === 'iphone';
  const isDesktop = screenMode === 'desktop';

  // 1. РЕАКТИВНОЕ ОТСЛЕЖИВАНИЕ ШИРИНЫ ЭКРАНА (resize + matchMedia)
  useEffect(() => {
    const updateMode = () => {
      const w = window.innerWidth;
      if (w < 500) setScreenMode('iphone');
      else if (w < 1024) setScreenMode('tablet');
      else setScreenMode('desktop');
    };

    updateMode();
    window.addEventListener('resize', updateMode);

    const mqIphone = window.matchMedia('(max-width: 499px)');
    const mqTablet = window.matchMedia('(min-width: 500px) and (max-width: 1023px)');
    const mqDesktop = window.matchMedia('(min-width: 1024px)');

    const mqHandler = () => updateMode();
    mqIphone.addEventListener('change', mqHandler);
    mqTablet.addEventListener('change', mqHandler);
    mqDesktop.addEventListener('change', mqHandler);

    return () => {
      window.removeEventListener('resize', updateMode);
      mqIphone.removeEventListener('change', mqHandler);
      mqTablet.removeEventListener('change', mqHandler);
      mqDesktop.removeEventListener('change', mqHandler);
    };
  }, []);

  // Высотные отметки маршрута
  const milestones = [
    { pct: 0.16, label: "3800m" },
    { pct: 0.42, label: "2600m" },
    { pct: 0.70, label: "1400m" },
    { pct: 0.94, label: "BASE" },
  ];

  // 2. ОТСЛЕЖИВАНИЕ СКРОЛЛА И ПЛАВНАЯ ФИЗИКА (ЧАСТОТА 0.014, ДЛИННЫЙ ПРОЛЕТ)
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const progress = Math.min(Math.max(currentScroll / maxScroll, 0), 1);

      const topOffset = isIphone ? 75 : 85;
      const bottomLimit = window.innerHeight - (isIphone ? 80 : 95);
      const targetClimberY = topOffset + progress * (bottomLimit - topOffset);

      const delta = currentScroll - lastScrollY.current;
      lastScrollY.current = currentScroll;
      const absDelta = Math.abs(delta);

      setScrollY(currentScroll);
      setClimberY(targetClimberY);

      if (absDelta > 0.3) {
        if (delta > 0) {
          // Движение вниз: частота 0.014 (1 прыжок на ~350-400px скролла)
          const rawWave = Math.sin(currentScroll * 0.014);
          
          // Динамичный толчок ногами: упругая компрессия (степень 1.6), чтобы амплитуда была отчетливо видна
          const wave = Math.max(0, rawWave);
          const kick = Math.pow(wave, 1.6);
          const isAirborne = kick > 0.05;
          const speedFactor = Math.min(Math.max(absDelta / 4.5, 0.55), 1);

          // Увеличенная, хорошо заметная амплитуда: на десктопе 38px вправо, на iPhone 24px влево
          const maxBounce = isIphone ? 24 : isDesktop ? 38 : 28;
          const offset = kick * (isDesktop ? maxBounce : -maxBounce) * speedFactor;

          setBounceX(offset);
          setMode(isAirborne ? 'rappel' : 'slide');

          // Микро-искры только в момент толчка
          const now = Date.now();
          if (kick > 0.5 && now - lastImpactRef.current > 300) {
            lastImpactRef.current = now;
            spawnSparks(targetClimberY);
          }
        } else {
          // Подъем вверх: спокойный скользящий ход без дерганий
          setMode('slide');
          setBounceX(0);
        }

        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          setMode('idle');
          setBounceX(0);
        }, 280);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, [isIphone, isDesktop]);

  // Микро-искры при толчке
  const spawnSparks = (contactY) => {
    const sparkBaseX = isDesktop ? -6 : (isIphone ? 26 : 28);
    const newSparks = Array.from({ length: 2 }).map(() => ({
      id: sparkId.current++,
      x: sparkBaseX + (Math.random() * 4 - 2),
      y: (isIphone ? 22 : 28) + (Math.random() * 4 - 2),
      vx: isDesktop ? -1.2 - Math.random() : 1.2 + Math.random(),
      vy: -0.3 + (Math.random() - 0.5) * 1.2,
    }));
    setSparks((prev) => [...prev.slice(-4), ...newSparks]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.some((ns) => ns.id === s.id)));
    }, 320);
  };

  // Геометрия позиционирования
  const containerWidthClass = isIphone ? 'w-8' : isDesktop ? 'w-14' : 'w-10';
  const ropeX = isIphone ? 22 : isDesktop ? 30 : 26;
  const climberScale = isIphone ? 0.85 : isDesktop ? 1.0 : 0.88;
  const carabinerY = climberY + (isIphone ? 10 : 10);
  const tailEndOffsetY = 110;

  // Единые упругие параметры пружины для идеальной синхронизации альпиниста и троса
  const springConfig = {
    type: 'spring',
    stiffness: 80,
    damping: 18,
    mass: 0.7,
  };

  return (
    <div
      className={`fixed top-0 bottom-0 pointer-events-none z-40 select-none overflow-visible ${containerWidthClass}`}
      style={{
        right: isDesktop
          ? 'max(24px, calc((100vw - 1280px) / 2 - 36px))'
          : '4px', // строго right-1 (4px от правого края на iPhone)
      }}
    >
      {/* 1. ДИНАМИЧЕСКИЙ ТРОС: ВЕРХНИЙ НАТЯНУТЫЙ СЕГМЕНТ + НИЖНИЙ ХВОСТ + ПУНКТИРНАЯ НАПРАВЛЯЮЩАЯ */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        {/* Верхняя натянутая золотая линия троса от верха экрана прямо к карабину */}
        <motion.line
          x1={ropeX}
          y1={0}
          animate={{ x2: ropeX + bounceX }}
          transition={springConfig}
          y2={carabinerY}
          stroke="rgba(245, 158, 11, 0.65)"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 2px rgba(245, 158, 11, 0.4))',
          }}
        />

        {/* Свободный нижний хвост веревки, плавно возвращающийся от пояса к вертикальной оси */}
        <g transform={`translate(0, ${carabinerY})`}>
          <motion.path
            d={`M ${ropeX + bounceX} 0 C ${ropeX + bounceX * 1.08} 35 ${ropeX + bounceX * 0.25} 75 ${ropeX} ${tailEndOffsetY}`}
            animate={{
              d: `M ${ropeX + bounceX} 0 C ${ropeX + bounceX * 1.08} 35 ${ropeX + bounceX * 0.25} 75 ${ropeX} ${tailEndOffsetY}`,
            }}
            transition={springConfig}
            stroke="rgba(245, 158, 11, 0.65)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            style={{
              filter: 'drop-shadow(0 0 2px rgba(245, 158, 11, 0.4))',
            }}
          />
        </g>

        {/* Нижний запланированный маршрут спуска (тонкий пунктир ниже хвоста веревки) */}
        <line
          x1={ropeX}
          y1={carabinerY + tailEndOffsetY}
          x2={ropeX}
          y2="97%"
          stroke="rgba(245, 158, 11, 0.28)"
          strokeWidth="1.2"
          strokeDasharray="3 4"
        />

        {/* Отметки высоты */}
        {milestones.map((m, idx) => {
          const yPos = `${m.pct * 100}%`;
          return (
            <g key={idx} className="opacity-75">
              <line
                x1={ropeX - 3.5}
                y1={yPos}
                x2={ropeX + 3.5}
                y2={yPos}
                stroke="rgba(245, 158, 11, 0.45)"
                strokeWidth="1"
              />
              <text
                x={isDesktop ? ropeX + 8 : ropeX - 6}
                y={yPos}
                textAnchor={isDesktop ? "start" : "end"}
                dy="2.5"
                fill="#F59E0B"
                fontSize={isIphone ? "6.8" : "7.5"}
                fontFamily="ui-monospace, monospace"
                fontWeight="700"
                opacity="0.7"
              >
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* 2. ИСХОДНЫЙ АЛЬПИНИСТ С ФОНАРИКОМ И СПОКОЙНЫМИ РУКАМИ НА ТРОСЕ */}
      <motion.div
        className="absolute pointer-events-none origin-[32px_15px]"
        style={{
          top: climberY - (isIphone ? 10 : 12),
          left: isIphone ? -4 : 0,
          width: 64,
          height: 64,
        }}
        animate={{
          x: bounceX,
          rotate:
            mode === 'rappel'
              ? (isDesktop ? -18 : 18)
              : mode === 'slide'
              ? (isDesktop ? -3 : 3)
              : [-2, 2, -2],
          scale: mode === 'rappel' ? 1.05 : 1,
        }}
        transition={springConfig}
      >
        <div
          className="w-full h-full relative"
          style={{
            // На iPhone scale(0.85), на десктопе scale(1.0). Разворот: на десктопе scaleX(1) лицом влево, на iPhone scaleX(-1) лицом вправо
            transform: `scale(${climberScale}) ${isDesktop ? 'scaleX(1)' : 'scaleX(-1)'}`,
            transformOrigin: '32px 24px',
          }}
        >
          {/* Мягкий конус света от налобного фонарика */}
          <div
            className="absolute -top-3 -left-16 w-28 h-20 pointer-events-none"
            style={{
              transform: 'rotate(-25deg)',
              transformOrigin: '95% 45%',
              opacity: mode === 'slide' ? 0.75 : 0.55,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  'radial-gradient(ellipse at 95% 45%, rgba(254, 240, 138, 0.4) 0%, rgba(245, 158, 11, 0.12) 45%, transparent 75%)',
                clipPath: 'polygon(100% 45%, 0% 0%, 0% 100%)',
              }}
            />
          </div>

          {/* Искры при толчке */}
          <AnimatePresence>
            {sparks.map((spark) => (
              <motion.div
                key={spark.id}
                initial={{ opacity: 1, scale: 1, x: spark.x, y: spark.y }}
                animate={{
                  opacity: 0,
                  scale: 0.2,
                  x: spark.x + spark.vx * 10,
                  y: spark.y + spark.vy * 10,
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute w-1 h-1 rounded-full bg-amber-400 shadow-[0_0_4px_#F59E0B]"
              />
            ))}
          </AnimatePresence>

          {/* ТОЧНАЯ ИСХОДНАЯ SVG-ГРАФИКА АЛЬПИНИСТА */}
          <svg
            viewBox="0 0 64 64"
            className="w-16 h-16 filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.65)] overflow-visible"
          >
            {/* Карабин крепления страховочной системы к тросу */}
            <circle cx="32" cy="22" r="2.8" fill="none" stroke="#F59E0B" strokeWidth="1.4" />
            <path d="M 32 20 L 32 24" stroke="#FBBF24" strokeWidth="1.4" strokeLinecap="round" />

            {/* РЮКЗАК НА СПИНЕ */}
            <path
              d="M 33 16 C 39 16, 42 21, 40 29 C 39 33, 35 34, 32 33 Z"
              fill="#0F172A"
              stroke="#334155"
              strokeWidth="1"
            />
            <path d="M 34 19 L 41 22" stroke="#F59E0B" strokeWidth="0.9" opacity="0.9" />
            <path d="M 33 26 L 39 28" stroke="#F59E0B" strokeWidth="0.9" opacity="0.9" />

            {/* ТОРС / КУРТКА СКАЛОЛАЗА */}
            <path
              d="M 27 15 L 34 16 L 33 30 L 26 29 Z"
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="1"
            />
            {/* Оранжевая вставка на плече */}
            <path d="M 27 15 L 31 16 L 29 20 L 26 19 Z" fill="#F59E0B" />

            {/* СТРАХОВОЧНАЯ СИСТЕМА (ОБВЯЗКА) */}
            <rect x="25" y="28" width="9" height="3" rx="1" fill="#D97706" />

            {/* ГОЛОВА И КАСКА */}
            <circle cx="26" cy="11" r="5" fill="#0F172A" />
            <path
              d="M 21 11 C 21 7, 30 7, 30 11 C 30 13, 21 13, 21 11 Z"
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="0.8"
            />
            {/* Налобный фонарь (диод) */}
            <circle cx="21" cy="11" r="1.5" fill="#FEF08A" />

            {/* РУКИ: СПОКОЙНЫЙ ЕСТЕСТВЕННЫЙ ХВАТ НА ТРОСЕ БЕЗ МАХОВ ВВЕРХ */}
            <g>
              {/* Верхняя рука на уровне груди направляет трос */}
              <path
                d="M 28 17 L 33 16 L 32 18"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="18" r="1.8" fill="#F59E0B" />

              {/* Нижняя рука у бедра контролирует тормозной конец веревки */}
              <path
                d="M 29 20 L 34 24 L 32 27"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <circle cx="32" cy="27" r="1.6" fill="#F59E0B" />
            </g>

            {/* НОГИ СКАЛОЛАЗА С ГОРНЫМИ БОТИНКАМИ */}
            <motion.path
              d={
                mode === 'rappel'
                  ? "M 27 30 L 16 32 L 6 36"
                  : "M 27 30 L 25 38 L 23 45"
              }
              fill="none"
              stroke="#1E293B"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ботинок 1 */}
            <path
              d={
                mode === 'rappel'
                  ? "M 6 36 L 4 34 L 2 37 L 7 38 Z"
                  : "M 23 45 L 19 46 L 19 48 L 24 48 Z"
              }
              fill="#F59E0B"
              stroke="#B45309"
              strokeWidth="0.8"
            />

            {/* Нога 2 */}
            <motion.path
              d={
                mode === 'rappel'
                  ? "M 30 30 L 24 37 L 14 42"
                  : "M 30 30 L 29 40 L 28 47"
              }
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ботинок 2 */}
            <path
              d={
                mode === 'rappel'
                  ? "M 14 42 L 10 43 L 11 45 L 15 44 Z"
                  : "M 28 47 L 24 48 L 24 50 L 29 50 Z"
              }
              fill="#D97706"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
