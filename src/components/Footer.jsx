import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, Phone, MapPin, Instagram, Send, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function Footer() {
  const { language, t } = useTours();

  return (
    <footer className="relative bg-ocean-950 border-t border-sand-100/10 pt-20 pb-12 overflow-hidden text-sand-300">
      {/* Декоративное свечение */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-amber-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Колонка 1 & 2: Описание бренда */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="inline-flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500/80 p-[1px] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-ocean-900 flex items-center justify-center">
                  <Compass className="w-5 h-5 text-amber-500" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-wider text-sand-100">
                  AURA
                </span>
                <span className="text-[9px] tracking-[0.25em] text-sand-400 uppercase -mt-1 font-sans">
                  Expeditions
                </span>
              </div>
            </Link>

            <p className="text-sand-300/80 text-sm leading-relaxed max-w-sm">
              {language === 'ua'
                ? "Ми створюємо не просто туристичні поїздки, а глибокі трансформаційні експедиції в найбільш захопливі куточки нашої планети в колі однодумців."
                : "Мы создаем не просто туристические поездки, а глубокие трансформационные экспедиции в самые захватывающие уголки планеты в кругу близких по духу людей."}
            </p>

            <div className="flex items-center space-x-3 text-xs text-sand-400">
              <ShieldCheck className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                {language === 'ua'
                  ? "Офіційна туроператорська ліцензія та страхування 24/7"
                  : "Официальная лицензия туроператора и страхование 24/7"}
              </span>
            </div>
          </div>

          {/* Колонка 3: Навигация */}
          <div>
            <h4 className="text-sand-100 font-serif text-lg font-semibold mb-5 tracking-wide">
              {language === 'ua' ? "Навігація" : "Навигация"}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-amber-500 transition-colors">
                  {t.nav.catalog}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-500 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Регионы */}
          <div>
            <h4 className="text-sand-100 font-serif text-lg font-semibold mb-5 tracking-wide">
              {language === 'ua' ? "Напрямки" : "Направления"}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/catalog" className="hover:text-amber-500 transition-colors flex items-center justify-between group">
                  <span>{language === 'ua' ? "Південна Америка" : "Южная Америка"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-amber-500 transition-colors flex items-center justify-between group">
                  <span>{language === 'ua' ? "Скандинавія & Ісландія" : "Скандинавия & Исландия"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-amber-500 transition-colors flex items-center justify-between group">
                  <span>{language === 'ua' ? "Африка: Сафарі" : "Африка: Сафари"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                </Link>
              </li>
              <li>
                <Link to="/catalog" className="hover:text-amber-500 transition-colors flex items-center justify-between group">
                  <span>{language === 'ua' ? "Азія: Японія" : "Азия: Япония"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-amber-500" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 5: Контакты и соцсети */}
          <div>
            <h4 className="text-sand-100 font-serif text-lg font-semibold mb-5 tracking-wide">
              {language === 'ua' ? "Зв'язок з нами" : "Связь с нами"}
            </h4>
            <div className="space-y-3 text-sm">
              <a href="tel:+380442345678" className="flex items-center space-x-3 hover:text-amber-500 transition-colors">
                <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>+380 (44) 234-56-78</span>
              </a>
              <a href="mailto:concierge@aura-travel.pro" className="flex items-center space-x-3 hover:text-amber-500 transition-colors">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>concierge@aura-travel.pro</span>
              </a>
              <div className="flex items-center space-x-3 text-sand-400">
                <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Київ, вул. Велика Васильківська, 42</span>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="flex items-center space-x-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-ocean-850 hover:bg-amber-600 text-sand-100 flex items-center justify-center transition-colors border border-sand-100/10"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-ocean-850 hover:bg-amber-600 text-sand-100 flex items-center justify-center transition-colors border border-sand-100/10"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Нижний колонтитул */}
        <div className="border-t border-sand-100/10 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-sand-400/80">
          <p>© {new Date().getFullYear()} AURA Expeditions. Всі права захищено.</p>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>for passionate world explorers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
