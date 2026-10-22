import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Shield, Award, Users, Compass, 
  Star, Quote, CheckCircle2, ChevronRight, Sparkles 
} from 'lucide-react';
import { useTours } from '../context/ToursContext';
import TourCard from '../components/TourCard';

export default function Home() {
  const { tours, language, t, openBookingModal } = useTours();

  // Берем первые 3 тура как хиты
  const featuredTours = tours.slice(0, 3);

  // Преимущества клуба
  const features = [
    {
      icon: Users,
      title: language === 'ua' ? "Камерні групи до 8-10 осіб" : "Камерные группы до 8-10 человек",
      desc: language === 'ua' 
        ? "Жодних великих автобусів та натовпу. Тільки однодумці, комфортний темп та індивідуальна увага до кожного."
        : "Никаких огромных автобусов и толп. Только близкие по духу люди, гибкий темп и внимание к деталям."
    },
    {
      icon: Compass,
      title: language === 'ua' ? "Авторські маршрути 100% off-beat" : "Авторские маршруты 100% off-beat",
      desc: language === 'ua'
        ? "Локації, недоступні звичайним туристам: приватні ранчо, закриті заповідники та секретні оглядові майданчики."
        : "Локации, закрытые для массового туризма: частные ранчо, дикие заповедники и скрытые панорамные точки."
    },
    {
      icon: Award,
      title: language === 'ua' ? "Турлідери світового рівня" : "Турлидеры мирового уровня",
      desc: language === 'ua'
        ? "Експедиції очолюють сертифіковані гірські гіди UIAGM, астрофотографи та зоологи з досвідом від 10 років."
        : "Экспедиции ведут признанные альпинисты UIAGM, фотографы NatGeo и зоологи со стажем от 10 лет."
    },
    {
      icon: Shield,
      title: language === 'ua' ? "Преміум комфорт & Безпека 24/7" : "Премиум комфорт & Безопасность 24/7",
      desc: language === 'ua'
        ? "Бутик-лоджі 5*, підготовлені позашляховики Superjeep, супутниковий зв'язок та повне спортивне страхування."
        : "Бутик-лоджи 5*, суперджипы, спутниковая связь в горах и расширенная премиальная страховка."
    }
  ];

  // Отзывы
  const reviews = [
    {
      name: language === 'ua' ? "Максим Кривонос" : "Максим Кривонос",
      role: language === 'ua' ? "Підприємець, Київ" : "Предприниматель, Киев",
      tour: language === 'ua' ? "Патагонія: Гранітні Вежі" : "Патагония: Гранитные Башни",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: language === 'ua'
        ? "Це була найкраща подорож у моєму житті. Організація на рівні швейцарського годинника, неймовірні лоджі з видом на Фіцрой і компанія людей, з якими ми тепер дружимо родинами."
        : "Это была лучшая экспедиция в моей жизни. Швейцарская точность тайминга, невероятные лоджи с панорамой на Фицрой и люди, с которыми мы стали настоящими друзьями."
    },
    {
      name: language === 'ua' ? "Анна Ковальчук" : "Анна Ковальчук",
      role: language === 'ua' ? "Архітекторка, Львів" : "Архитектор, Львов",
      tour: language === 'ua' ? "Ісландія: Північне Сяйво" : "Исландия: Северное Сияние",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: language === 'ua'
        ? "Коли ти стоїш біля льодовикової печери, а над тобою танцює зелена Аврора — відчуваєш мурахи по шкірі. Величезна подяка Олені за майстер-клас з фотографії!"
        : "Когда стоишь у сапфировой ледяной пещеры, а в небе танцует зеленая Аврора — перехватывает дыхание. Отдельное спасибо Елене за астрофотографию!"
    },
    {
      name: language === 'ua' ? "Дмитро Резніченко" : "Дмитрий Резниченко",
      role: language === 'ua' ? "IT директор, Варшава" : "IT директор, Варшава",
      tour: language === 'ua' ? "Намібія: Червоні Дюни" : "Намибия: Красные Дюны",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: language === 'ua'
        ? "Сафарі в Етоші та схід сонця на Дюні 45 — це абсолютна магія. Кемпи посеред пустелі з басейном і ресторанною подачею вечері перевищили всі мої очікування."
        : "Сафари в Этоше и рассвет на Дюне 45 — абсолютная магия. Кемпы посреди дикой пустыни с бассейнами и гастрономическими ужинами превзошли ожидания."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden"
    >
      {/* 1. HERO СЕКЦИЯ */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Фоновое полноэкранное фото с градиентом */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85"
            alt="Aura Expedition Hero"
            className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[12000ms]"
          />
          {/* Многослойное затемнение для кинематографического эффекта */}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/60 to-ocean-950/80" />
          <div className="absolute inset-0 bg-ocean-950/30 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Бейдж */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border-amber-600/30 text-amber-400 text-xs sm:text-sm font-medium uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>{t.hero.badge}</span>
          </motion.div>

          {/* Заголовок */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-sand-100 leading-[1.08] mb-6"
          >
            {t.hero.titleLine1}{' '}
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">
              {t.hero.titleLine2}
            </span>
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-sand-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-light"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTA Кнопки */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
          >
            <Link
              to="/catalog"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-sand-100 font-semibold text-sm uppercase tracking-wider shadow-luxury hover:shadow-glow-amber transition-all duration-300 group"
            >
              <span>{t.hero.exploreBtn}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full glass-panel hover:bg-ocean-800/80 text-sand-200 hover:text-sand-100 font-semibold text-sm uppercase tracking-wider transition-all duration-300"
            >
              {t.hero.aboutBtn}
            </Link>
          </motion.div>

          {/* Статистика внизу Hero */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-16 mt-16 border-t border-sand-100/10 text-left"
          >
            <div>
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-amber-500">12+</span>
              <span className="text-xs text-sand-400 uppercase tracking-wider">{t.hero.statsYears}</span>
            </div>
            <div>
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-sand-100">140+</span>
              <span className="text-xs text-sand-400 uppercase tracking-wider">{t.hero.statsExpeditions}</span>
            </div>
            <div>
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-sand-100">1200+</span>
              <span className="text-xs text-sand-400 uppercase tracking-wider">{t.hero.statsHappy}</span>
            </div>
            <div>
              <span className="block font-serif text-3xl sm:text-4xl font-bold text-amber-500">9.9 / 10</span>
              <span className="text-xs text-sand-400 uppercase tracking-wider">{t.hero.statsScore}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. СЕКЦИЯ: ХИТЫ ЭКСПЕДИЦИЙ */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
              {language === 'ua' ? "Обрані маршрути" : "Избранные маршруты"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100">
              {language === 'ua' ? "Хіти експедицій сезону" : "Хиты экспедиций сезона"}
            </h2>
          </div>
          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2 text-sand-300 hover:text-amber-500 text-sm font-semibold mt-4 md:mt-0 transition-colors group"
          >
            <span>{t.common.allTours}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-amber-600" />
          </Link>
        </div>

        {/* Сетка туров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      {/* 3. СЕКЦИЯ: ПРЕИМУЩЕСТВА КЛУБА */}
      <section className="py-24 bg-ocean-950/70 border-y border-sand-100/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
              {language === 'ua' ? "Стандарти AURA" : "Стандарты AURA"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
              {language === 'ua' ? "Чому наші мандрівники повертаються знову" : "Почему наши исследователи возвращаются снова"}
            </h2>
            <p className="text-sand-300 text-sm sm:text-base leading-relaxed">
              {language === 'ua'
                ? "Ми скасували шаблони масового туризму, створивши новий рівень авторських досліджень нашої планети."
                : "Мы отказались от шаблонов пакетного туризма, открыв новый стандарт приватных экспедиций."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-ocean-900 border border-sand-100/10 hover:border-amber-600/30 transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-600/10 text-amber-500 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-sand-100 mb-3 group-hover:text-amber-500 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sand-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. СЕКЦИЯ: ГАЛЕРЕЯ ЭМОЦИЙ & АТМОСФЕРА */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
            {language === 'ua' ? "Візуальні щоденники" : "Визуальные дневники"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
            {language === 'ua' ? "Моменти, які залишаються назавжди" : "Моменты, остающиеся навсегда"}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="relative group overflow-hidden rounded-2xl aspect-[3/4]">
            <img
              src="https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80"
              alt="Atmosphere 1"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
              <span className="text-sand-100 text-xs font-medium">Ісландія / Ватнайокутль</span>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl aspect-[3/4] md:translate-y-6">
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
              alt="Atmosphere 2"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
              <span className="text-sand-100 text-xs font-medium">Намібія / Соссусфлей</span>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl aspect-[3/4]">
            <img
              src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80"
              alt="Atmosphere 3"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
              <span className="text-sand-100 text-xs font-medium">Японія / Кіото Момідзі</span>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl aspect-[3/4] md:translate-y-6">
            <img
              src="https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80"
              alt="Atmosphere 4"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex items-end">
              <span className="text-sand-100 text-xs font-medium">Перу / Мачу-Пікчу</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. СЕКЦИЯ: ОТЗЫВЫ */}
      <section className="py-24 bg-ocean-950/40 border-t border-sand-100/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
              {language === 'ua' ? "Довіра мандрівників" : "Доверие путешественников"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
              {t.common.reviewsTitle}
            </h2>
            <p className="text-sand-300 text-sm sm:text-base">
              {t.common.reviewsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-ocean-900/90 border border-sand-100/10 flex flex-col justify-between"
              >
                <div>
                  <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
                  <p className="text-sand-300 text-sm leading-relaxed italic mb-6">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-sand-100/10">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border border-amber-600/30"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-sand-100">{rev.name}</h4>
                    <p className="text-xs text-sand-400">{rev.role}</p>
                    <span className="text-[11px] text-amber-500 block mt-0.5 font-medium">{rev.tour}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA БАННЕР */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 p-8 sm:p-14 text-center text-sand-100 shadow-2xl">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4">
              {language === 'ua' ? "Готові до своєї головної експедиції?" : "Готовы к своей главной экспедиции?"}
            </h2>
            <p className="text-sand-100/90 text-sm sm:text-base mb-8 leading-relaxed">
              {language === 'ua'
                ? "Залиште заявку, і наш консьєрж-сервіс зв'яжеться з вами для презентації маршруту та бронювання каюти чи лоджа."
                : "Оставьте заявку, и наш консьерж свяжется с вами для персональной презентации маршрута."}
            </p>
            <button
              onClick={() => openBookingModal(null)}
              className="inline-flex items-center px-8 py-4 rounded-full bg-ocean-950 hover:bg-ocean-900 text-sand-100 font-semibold text-sm uppercase tracking-wider transition-colors shadow-lg"
            >
              <span>{t.common.bookTour}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
