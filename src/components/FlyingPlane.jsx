import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * FlyingPlane — самолёт, который летает по экрану с разных сторон
 * (прямые пролёты, диагонали, мёртвые петли), а при isOrbiting = true
 * делает 3D-облёт вокруг глобуса (уходит "за" шар и возвращается "перед" ним).
 *
 * Props:
 *  - containerRef: ref на родительский контейнер (relative, overflow-hidden)
 *  - globeRef: ref на блок глобуса (для расчёта центра орбиты)
 *  - isOrbiting: boolean — запустить облёт вокруг глобуса
 *  - orbitDuration: длительность облёта в секундах (по умолчанию 4.2)
 *  - frontZ / backZ: z-index самолёта перед контентом и за ним
 */

const PLANE_W = 112;
const PLANE_H = 66;
const IDLE_SPEED = 140; // px/сек (плавный размеренный полёт)

const lerp = (a, b, t) => a + (b - a) * t;
const quad = (p0, p1, p2, t) => ({
  x: (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x,
  y: (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y,
});

// Траектории свободного полёта (W, H — размеры контейнера)
const buildIdlePaths = (W, H) => {
  const r = Math.max(70, Math.min(W, H) * 0.12);
  return [
    // 1. Слева направо, плавная волна вверху
    (t) => ({ x: -160 + t * (W + 320), y: H * 0.20 + Math.sin(t * Math.PI * 2) * 30 }),

    // 2. Снизу-слева в правый верхний угол
    (t) => ({ x: -160 + t * (W + 320), y: H + 120 - t * (H + 260) - Math.sin(t * Math.PI) * 55 }),

    // 3. Справа налево с мёртвой петлёй
    (t) => {
      const y0 = H * 0.60;
      const lx = W * 0.60;
      const ly = y0 - r;
      if (t < 0.35) {
        const u = t / 0.35;
        return { x: lerp(W + 160, lx, u), y: y0 };
      }
      if (t < 0.65) {
        const th = Math.PI / 2 + ((t - 0.35) / 0.3) * Math.PI * 2;
        return { x: lx + r * Math.cos(th), y: ly + r * Math.sin(th) };
      }
      const u = (t - 0.65) / 0.35;
      return { x: lerp(lx, -160, u), y: lerp(y0, H * 0.35, u) };
    },

    // 4. Из правого верхнего угла в левый нижний
    (t) => ({ x: W + 160 - t * (W + 320), y: -120 + t * (H + 240) }),

    // 5. Слева направо с петлёй в верхней части
    (t) => {
      const y0 = H * 0.35;
      const lx = W * 0.40;
      const ly = y0 - r;
      if (t < 0.35) {
        const u = t / 0.35;
        return { x: lerp(-160, lx, u), y: y0 };
      }
      if (t < 0.65) {
        const th = Math.PI / 2 - ((t - 0.35) / 0.3) * Math.PI * 2;
        return { x: lx + r * Math.cos(th), y: ly + r * Math.sin(th) };
      }
      const u = (t - 0.65) / 0.35;
      return { x: lerp(lx, W + 160, u), y: lerp(y0, H * 0.15, u) };
    },

    // 6. Снизу-справа в левый верхний угол
    (t) => ({ x: W + 160 - t * (W + 320), y: H + 120 - t * (H + 260) + Math.sin(t * Math.PI) * 45 }),
  ];
};

// Семплирование + равномерная перевыборка по длине (постоянная скорость)
const buildFlight = (fn, step = 10) => {
  const raw = [];
  const N = 900;
  for (let i = 0; i <= N; i++) raw.push(fn(i / N));

  const cum = [0];
  for (let i = 1; i < raw.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(raw[i].x - raw[i - 1].x, raw[i].y - raw[i - 1].y));
  }
  const L = cum[cum.length - 1];
  const count = Math.max(50, Math.min(280, Math.round(L / step)));

  const pts = [];
  let j = 0;
  for (let k = 0; k < count; k++) {
    const d = (L * k) / (count - 1);
    while (j < cum.length - 2 && cum[j + 1] < d) j++;
    const seg = cum[j + 1] - cum[j] || 1;
    const a = (d - cum[j]) / seg;
    const rA = raw[j];
    const rB = raw[j + 1] || rA;
    pts.push({
      x: lerp(rA.x, rB.x, a),
      y: lerp(rA.y, rB.y, a),
      depth: rA.depth !== undefined ? lerp(rA.depth, rB.depth ?? rA.depth, a) : 1,
      isBehind: a < 0.5 ? Boolean(rA.isBehind) : Boolean(rB.isBehind),
    });
  }

  // Угол поворота по направлению движения (с развёрткой от скачков на 360°)
  const rawRot = [];
  let prev = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    let deg = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    if (i > 0) {
      while (deg - prev > 180) deg -= 360;
      while (deg - prev < -180) deg += 360;
    }
    rawRot.push(deg);
    prev = deg;
  }

  // Скользящее среднее для ультра-плавного поворота самолёта без рывков
  const rot = [];
  const half = 3;
  for (let i = 0; i < rawRot.length; i++) {
    let sum = 0;
    let cnt = 0;
    for (let w = -half; w <= half; w++) {
      const idx = i + w;
      if (idx >= 0 && idx < rawRot.length) {
        sum += rawRot[idx];
        cnt++;
      }
    }
    rot.push(sum / cnt);
  }

  return { pts, rot, length: L };
};

export default function FlyingPlane({
  containerRef,
  globeRef,
  isOrbiting = false,
  orbitDuration = 5.8,
  frontZ = 35,
  backZ = 5,
}) {
  const [flight, setFlight] = useState(null);
  const planeRef = useRef(null);
  const idleIndex = useRef(0);
  const lastPos = useRef({ x: -200, y: 200 });
  const pauseTimer = useRef(null);

  const getSize = () => {
    const el = containerRef?.current;
    if (!el) return { W: window.innerWidth, H: window.innerHeight };
    const r = el.getBoundingClientRect();
    return { W: r.width, H: r.height };
  };

  const startIdle = useCallback(() => {
    const { W, H } = getSize();
    const paths = buildIdlePaths(W, H);
    const fn = paths[idleIndex.current % paths.length];
    idleIndex.current += 1;

    const { pts, rot, length } = buildFlight(fn, 12);
    setFlight({
      id: `idle-${Date.now()}`,
      x: pts.map((p) => p.x),
      y: pts.map((p) => p.y),
      rotate: rot,
      scale: pts.map(() => 0.9),
      zIndex: pts.map(() => backZ),
      opacity: pts.map(() => 0.9),
      duration: Math.max(7, length / IDLE_SPEED),
      kind: 'idle',
    });
  }, [backZ]);

  const startOrbit = useCallback(() => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    const { W, H } = getSize();
    const c = containerRef?.current?.getBoundingClientRect();
    const g = globeRef?.current?.getBoundingClientRect();

    // Центр и радиусы 3D-орбиты глобуса
    const cx = c && g ? g.left - c.left + g.width / 2 : W * 0.35;
    const cy = c && g ? g.top - c.top + g.height / 2 : H * 0.48;
    const gw = g ? g.width : 320;
    const R_globe = gw / 2; // радиус сферы глобуса (~160px)
    const rx = Math.max(gw * 0.88, 250);
    const ry = Math.max(gw * 0.38, 105);

    const turnR = Math.max(gw * 0.22, 65);
    const rightEdge = cx + R_globe + 25;

    const fn = (t) => {
      // 1. УХОД В ГЛОБУС: летит слева прямо за глобус и проходит насквозь к правому краю (0% .. 45% времени)
      if (t < 0.45) {
        const u = t / 0.45;
        const px = lerp(-180, rightEdge, u);
        const py = cy - turnR;
        return { x: px, y: py, isBehind: true, depth: -1 };
      }

      // 2. ВЫЛЕТ С ДРУГОЙ СТОРОНЫ ГЛОБУСА И РАЗВОРОТ (45% .. 62% времени)
      // Вылетает справа из-за глобуса и плавно разворачивается на 180° налево
      if (t < 0.62) {
        const u = (t - 0.45) / 0.17;
        const th = -Math.PI / 2 + u * Math.PI; // от -PI/2 до +PI/2
        const px = rightEdge + turnR * Math.cos(th);
        const py = cy + turnR * Math.sin(th);
        return { x: px, y: py, isBehind: false, depth: 1 };
      }

      // 3. ПОЛЁТ СТРОГО ПРЯМО НАЛЕВО (62% .. 100% времени)
      // Развернулся и летит строго прямо по ровной горизонтали назад за экран
      const u = (t - 0.62) / 0.38;
      const px = lerp(rightEdge, -240, u);
      const py = cy + turnR;
      return { x: px, y: py, isBehind: false, depth: 1 };
    };

    const { pts, rot } = buildFlight(fn, 8);

    // Расчёт прозрачности, масштаба и глубины z-index
    const computedProps = pts.map((p) => {
      const dist = Math.hypot(p.x - cx, p.y - cy);
      const isBehind = p.isBehind ?? (p.depth < 0);
      let opacity = 1.0;
      let scale = 1.38;
      let z = frontZ;

      if (isBehind) {
        // УХОДИТ В ГЛОБУС (СЗАДИ):
        z = backZ; // 5 (за глобусом)
        scale = 0.70; // мелкий, в глубине
        
        // При входе за диск глобуса — ПОЛНОСТЬЮ ИСЧЕЗАЕТ (opacity = 0)!
        if (dist < R_globe) {
          opacity = 0.0;
        } else {
          opacity = 1.0;
        }
      } else {
        // ВЫЛЕТАЕТ ИЗ-ЗА ГЛОБУСА ПЕРЕД ГЛАЗАМИ ЗРИТЕЛЯ:
        z = frontZ; // 35 (перед глобусом)
        scale = 1.38; // КРУПНЫЙ, прямо перед глазами зрителя!
        opacity = 1.0;
      }

      return { opacity, scale, z };
    });

    setFlight({
      id: `orbit-${Date.now()}`,
      x: pts.map((p) => p.x),
      y: pts.map((p) => p.y),
      rotate: rot,
      opacity: computedProps.map((cp) => cp.opacity),
      scale: computedProps.map((cp) => cp.scale),
      zIndex: computedProps.map((cp) => cp.z),
      duration: orbitDuration,
      kind: 'orbit',
    });
  }, [orbitDuration, frontZ, backZ]);

  // Первый вылет после монтирования
  useEffect(() => {
    const t = setTimeout(startIdle, 500);
    return () => {
      clearTimeout(t);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, [startIdle]);

  // Облёт глобуса при нажатии на кнопку
  useEffect(() => {
    if (isOrbiting) startOrbit();
  }, [isOrbiting, startOrbit]);

  const handleComplete = () => {
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(startIdle, flight?.kind === 'orbit' ? 1200 : 2500);
  };

  if (!flight) return null;

  return (
    <motion.div
      ref={planeRef}
      key={flight.id}
      className="absolute left-0 top-0 pointer-events-none select-none"
      style={{ width: PLANE_W, height: PLANE_H, marginLeft: -PLANE_W / 2, marginTop: -PLANE_H / 2 }}
      initial={{
        x: flight.x[0],
        y: flight.y[0],
        rotate: flight.rotate[0],
        scale: flight.scale[0],
        zIndex: flight.zIndex[0],
        opacity: flight.opacity[0],
      }}
      animate={{
        x: flight.x,
        y: flight.y,
        rotate: flight.rotate,
        scale: flight.scale,
        zIndex: flight.zIndex,
        opacity: flight.opacity,
      }}
      transition={{ duration: flight.duration, ease: 'linear' }}
      onUpdate={(latest) => {
        if (typeof latest.x === 'number' && typeof latest.y === 'number') {
          lastPos.current = { x: latest.x, y: latest.y };
        }
        if (planeRef.current && typeof latest.zIndex === 'number') {
          planeRef.current.style.zIndex = Math.round(latest.zIndex);
        }
      }}
      onAnimationComplete={handleComplete}
    >
      {/* Инверсионные следы за двигателями */}
      <div className="absolute right-[64%] top-[24%] h-[2px] w-40 sm:w-64 bg-gradient-to-l from-white/80 via-cyan-100/40 to-transparent rounded-full blur-[0.6px]" />
      <div className="absolute right-[64%] top-[74%] h-[2px] w-40 sm:w-64 bg-gradient-to-l from-white/80 via-cyan-100/40 to-transparent rounded-full blur-[0.6px]" />

      {/* Силуэт авиалайнера (нос смотрит вправо) */}
      <svg viewBox="0 0 120 70" className="relative w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.55)]">
        <rect x="36" y="16" width="16" height="5" rx="2.5" fill="#e2e8f0" />
        <rect x="36" y="49" width="16" height="5" rx="2.5" fill="#e2e8f0" />
        <path d="M115,35 Q105,31 70,31 L20,32 L5,35 L20,38 L70,39 Q105,39 115,35 Z" fill="#ffffff" />
        <path d="M68,31 L35,6 L26,7 L46,31 Z" fill="#f8fafc" />
        <path d="M68,39 L35,64 L26,63 L46,39 Z" fill="#f8fafc" />
        <path d="M18,33 L5,20 L0,21 L10,33 Z" fill="#cbd5e1" />
        <path d="M18,37 L5,50 L0,49 L10,37 Z" fill="#cbd5e1" />
        <path d="M12,35 L4,35 L2,24 L6,24 Z" fill="#FA9A1B" />
        <path d="M102,33.5 Q106,35 102,36.5 L97,36 L97,34 Z" fill="#0284c7" />
        <circle cx="26" cy="7" r="2.5" fill="#ef4444" className="animate-ping" />
        <circle cx="26" cy="63" r="2.5" fill="#10b981" className="animate-ping" />
        <circle cx="2" cy="35" r="2" fill="#ffffff" className="animate-pulse" />
      </svg>
    </motion.div>
  );
}
