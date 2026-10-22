import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Shield, Award, Users, Compass, 
  Star, Quote, CheckCircle2, ChevronRight, Sparkles, 
  X, MessageSquare, Play, Globe, ExternalLink
} from 'lucide-react';
import { useTours } from '../context/ToursContext';
import TourCard from '../components/TourCard';
import HeroToursSlider, { heroSliderTours } from '../components/HeroToursSlider';

export default function Home() {
  const { tours, language, t, openBookingModal } = useTours();
  const isUa = language === 'ua';

  // Выбранный тур в слайдере (меняет фоновое фото Hero)
  const [activeHeroTour, setActiveHeroTour] = useState(heroSliderTours[0]);

  // Таб в Hero: "Групповые" / "Индивидуальные"
  const [heroTab, setHeroTab] = useState('group');

  // Модалка отзыва Сергея Ткачева (из скриншота)
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Хитовые туры из каталога
  const featuredTours = tours.slice(0, 3);

  // Преимущества клуба
  const features = [
    {
      icon: Users,
      title: isUa ? "Камерні групи до 8-10 осіб" : "Камерные группы до 8-10 человек",
      desc: isUa 
        ? "Жодних великих автобусів та натовпу. Тільки однодумці, комфортний темп та індивідуальна увага до кожного."
        : "Никаких огромных автобусов и толп. Только близкие по духу люди, гибкий темп и внимание к деталям."
    },
    {
      icon: Compass,
      title: isUa ? "Авторські маршрути 100% off-beat" : "Авторские маршруты 100% off-beat",
      desc: isUa
        ? "Локації, недоступні звичайним туристам: приватні ранчо, закриті заповідники та секретні оглядові майданчики."
        : "Локации, закрытые для массового туризма: частные ранчо, дикие заповедники и скрытые панорамные точки."
    },
    {
      icon: Award,
      title: isUa ? "Турлідери світового рівня" : "Турлидеры мирового уровня",
      desc: isUa
        ? "Експедиції очолюють сертифіковані гірські гіди UIAGM, астрофотографи та зоологи з досвідом від 10 років."
        : "Экспедиции ведут признанные альпинисты UIAGM, фотографы NatGeo и зоологи со стажем от 10 лет."
    },
    {
      icon: Shield,
      title: isUa ? "Преміум комфорт & Безпека 24/7" : "Премиум комфорт & Безопасность 24/7",
      desc: isUa
        ? "Бутик-лоджі 5*, підготовлені позашляховики Superjeep, супутниковий зв'язок та повне спортивне страхування."
        : "Бутик-лоджи 5*, суперджипы, спутниковая связь в горах и расширенная премиальная страховка."
    }
  ];

  // Отзывы путешественников
  const reviews = [
    {
      name: isUa ? "Максим Кривонос" : "Максим Кривонос",
      role: isUa ? "Підприємець, Київ" : "Предприниматель, Киев",
      tour: isUa ? "Патагонія: Гранітні Вежі" : "Патагония: Гранитные Башни",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Це була найкраща подорож у моєму житті. Організація на рівні швейцарського годинника, неймовірні лоджі з видом на Фіцрой і компанія людей, з якими ми тепер дружимо родинами."
        : "Это была лучшая экспедиция в моей жизни. Швейцарская точность тайминга, невероятные лоджи с панорамой на Фицрой и люди, с которыми мы стали настоящими друзьями."
    },
    {
      name: isUa ? "Анна Ковальчук" : "Анна Ковальчук",
      role: isUa ? "Архітекторка, Львів" : "Архитектор, Львов",
      tour: isUa ? "Ісландія: Північне Сяйво" : "Исландия: Северное Сияние",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: isUa
        ? "Коли ти стоїш біля льодовикової печери, а над тобою танцює зелена Аврора — відчуваєш мурахи по шкірі. Величезна подяка команді за дивовижні кадри!"
        : "Когда стоишь у сапфировой ледяной пещеры, а в небе танцует зеленая Аврора — перехватывает дыхание. Отдельное спасибо команде за организацию!"
    },
    {
      name: isUa ? "Дмитро Резніченко" : "Дмитрий Резниченко",
      role: isUa ? "IT директор, Варшава" : "IT директор, Варшава",
      tour: isUa ? "Намібія: Червоні Дюни" : "Намибия: Красные Дюны",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: isUa
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
      className="relative overflow-hidden bg-ocean-950 text-sand-100"
    >
      {/* ДЕКОРАТИВНЫЕ СВЕТОВЫЕ ОРЕОЛЫ (ВОЗДУШНОСТЬ И ГЛУБИНА) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[140px]" />
        <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 left-1/3 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[130px]" />
      </div>

      {/* 1. HERO СЕКЦИЯ В СТИЛЕ NEVEREND.RU (ПОЛНОСТЬЮ АДАПТИВНАЯ) */}
      <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
        
        {/* КИНЕМАТОГРАФИЧНЫЙ ФОН: ПЛАВНАЯ СМЕНА ФОТО ПРИ НАВЕДЕНИИ НА ТУРЫ */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeHeroTour.id}
              src={activeHeroTour.image}
              alt={activeHeroTour.title[language]}
              initial={{ opacity: 0, scale: 1.06 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
            />
          </AnimatePresence>

          {/* Премиальный многослойный градиент для читаемости текста */}
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/40 to-ocean-950/60" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60 pointer-events-none" />
        </div>

        {/* ВЕРХНЯЯ ЧАСТЬ HERO (ЗАГОЛОВОК, ТАБЫ И ПЛАВАЮЩИЙ ОТЗЫВ СЕРГЕЯ ТКАЧЕВА) */}
        <div className="relative z-10 max-w-7xl mx-auto w-full mb-8">
          
          {/* МОБИЛЬНАЯ ПЛАВАЮЩАЯ КАРТОЧКА ТУРА (ТОЧНО КАК НА МОБИЛЬНОМ СКРИНШОТЕ) */}
          <div className="flex md:hidden justify-end mb-4">
            <motion.div
              key={activeHeroTour.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-3.5 max-w-[240px] text-left shadow-2xl"
            >
              <h4 className="font-bold text-sm text-white leading-tight mb-1">
                {activeHeroTour.title[language]}
              </h4>
              <p className="text-[11px] text-sand-300 font-medium mb-1.5 leading-snug">
                {activeHeroTour.dates[language]} <br />• {activeHeroTour.duration[language]}
              </p>
              <div className="inline-flex items-center space-x-1 bg-white/10 px-2 py-0.5 rounded-full text-[10px] font-bold text-sand-100">
                <Users className="w-2.5 h-2.5 text-amber-400" />
                <span>{activeHeroTour.seats[language]}</span>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ЛЕВАЯ КОЛОНКА: ГЛАВНЫЙ ТИТУЛ И ТАБЫ */}
            <div className="lg:col-span-8">
              {/* Главный заголовок в стиле Neverend */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6 drop-shadow-lg"
              >
                {isUa ? (
                  <>
                    Преміальні подорожі <br />
                    <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sand-100 via-amber-200 to-amber-400">
                      в оточенні лідерів
                    </span>
                  </>
                ) : (
                  <>
                    Премиальные путешествия <br />
                    <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-sand-100 via-amber-200 to-amber-400">
                      в окружении лидеров
                    </span>
                  </>
                )}
              </motion.h1>

              {/* Интерактивные табы: Групповые / Индивидуальные */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="flex items-center space-x-3 mb-4"
              >
                <button
                  onClick={() => setHeroTab('group')}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-md ${
                    heroTab === 'group'
                      ? 'bg-white text-slate-950 hover:bg-sand-100'
                      : 'bg-black/40 backdrop-blur-md text-sand-200 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {isUa ? "Групові подорожі" : "Групповые путешествия"}
                </button>

                <button
                  onClick={() => setHeroTab('individual')}
                  className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all ${
                    heroTab === 'individual'
                      ? 'bg-white text-slate-950 hover:bg-sand-100 shadow-md'
                      : 'bg-black/40 backdrop-blur-md text-sand-200 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {isUa ? "Індивідуальні" : "Индивидуальные"}
                </button>
              </motion.div>

              {/* Мобильный подзаголовок из скриншота 2 */}
              <p className="block md:hidden text-sand-300 text-xs sm:text-sm leading-relaxed max-w-md">
                {isUa 
                  ? "Створюємо подорожі, які стають легендами. Якщо ви можете це уявити — ми можемо це організувати."
                  : "Создаем путешествия, которые становятся легендами. Если вы можете это представить — мы можем это организовать."}
              </p>
            </div>

            {/* ПРАВАЯ КОЛОНКА (ДЕСКТОП): ПЛАВАЮЩИЙ ОТЗЫВ СЕРГЕЯ ТКАЧЕВА */}
            <div className="hidden lg:block lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-black/60 backdrop-blur-2xl rounded-2xl p-5 border border-white/15 text-left shadow-2xl max-w-sm ml-auto relative group hover:border-amber-400/40 transition-colors"
              >
                <div className="flex items-center space-x-1 text-amber-400 mb-2.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-[10px] font-bold text-sand-400 ml-1.5">5.0</span>
                </div>

                <h4 className="font-bold text-sm text-white mb-0.5">
                  {isUa ? "Сергій Ткачов" : "Сергей Ткачев"}
                </h4>
                <p className="text-[11px] text-sand-400 mb-3 leading-snug font-medium line-clamp-1">
                  {isUa 
                    ? "Власник компаній автозапчастин, сумарний оборот..." 
                    : "Компании по производству и продаже автозапчастей..."}
                </p>

                <p className="text-xs text-sand-200 leading-relaxed italic line-clamp-3 mb-3.5">
                  "{isUa 
                    ? "Дуже сподобалася організація всіх процесів. Екіпаж корабля неймовірно уважний. Команда працює чітко, оперативно і з душею..." 
                    : "Очень понравилась организация всех процессов. Экипаж корабля очень услужливый. Команда очень дружелюбная, отработала прекрасно. Четко, оперативно, с душой..."}"
                </p>

                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="text-xs font-bold text-sand-100 hover:text-amber-400 uppercase tracking-wider flex items-center space-x-1 transition-colors"
                >
                  <span>{isUa ? "ЧИТАТИ ВІДГУК" : "ЧИТАТЬ ОТЗЫВ"}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* НИЖНЯЯ ЧАСТЬ HERO: ГОРИЗОНТАЛЬНЫЙ СЛАЙДЕР ТУРОВ (ТОЧНО КАК НА СКРИНШОТЕ) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 max-w-7xl mx-auto w-full"
        >
          <HeroToursSlider 
            activeTour={activeHeroTour} 
            onSelectTour={(tour) => setActiveHeroTour(tour)} 
          />
        </motion.div>
      </section>

      {/* 2. СЕКЦИЯ: ИЗБРАННЫЕ ЭКСПЕДИЦИИ (ХИТЫ СЕЗОНА) */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14"
        >
          <div>
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isUa ? "Обрані маршрути" : "Избранные маршруты"}</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100">
              {isUa ? "Хіти експедицій сезону" : "Хиты экспедиций сезона"}
            </h2>
          </div>

          <Link
            to="/catalog"
            className="inline-flex items-center space-x-2 text-sand-300 hover:text-amber-400 text-sm font-semibold mt-4 md:mt-0 transition-colors group"
          >
            <span>{t.common.allTours}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-amber-500" />
          </Link>
        </motion.div>

        {/* Сетка туров */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTours.map((tour, idx) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <TourCard tour={tour} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. СЕКЦИЯ: ПРЕИМУЩЕСТВА КЛУБА (СТАНДАРТЫ AURA) */}
      <section className="py-24 bg-ocean-900/60 border-y border-white/10 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
              {isUa ? "Стандарти AURA" : "Стандарты AURA"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
              {isUa ? "Чому наші мандрівники повертаються знову" : "Почему наши исследователи возвращаются снова"}
            </h2>
            <p className="text-sand-300 text-sm sm:text-base leading-relaxed">
              {isUa
                ? "Ми скасували шаблони масового туризму, створивши новий рівень авторських досліджень нашої планети."
                : "Мы отказались от шаблонов пакетного туризма, открыв новый стандарт приватных экспедиций."}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="p-8 rounded-3xl bg-ocean-950/80 backdrop-blur-xl border border-white/10 hover:border-amber-500/40 transition-all group shadow-xl"
                >
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors shadow-inner">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-sand-100 mb-3 group-hover:text-amber-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sand-400 text-sm leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. СЕКЦИЯ: ГАЛЕРЕЯ ЭМОЦИЙ & ДНЕВНИКИ */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
            {isUa ? "Візуальні щоденники" : "Визуальные дневники"}
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
            {isUa ? "Моменти, які залишаються назавжди" : "Моменты, остающиеся навсегда"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { img: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80", label: "Ісландія / Ватнайокутль", offset: false },
            { img: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80", label: "Намібія / Соссусфлей", offset: true },
            { img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80", label: "Японія / Кіото Момідзі", offset: false },
            { img: "https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80", label: "Перу / Мачу-Пікчу", offset: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-3xl aspect-[3/4] shadow-2xl ${
                item.offset ? 'md:translate-y-6' : ''
              }`}
            >
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-5 flex items-end">
                <span className="text-sand-100 text-xs font-bold tracking-wide">{item.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. СЕКЦИЯ: ОТЗЫВЫ ЛИДЕРОВ */}
      <section className="py-24 bg-ocean-900/50 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
              {isUa ? "Довіра мандрівників" : "Доверие путешественников"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
              {t.common.reviewsTitle}
            </h2>
            <p className="text-sand-300 text-sm sm:text-base">
              {t.common.reviewsSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-8 rounded-3xl bg-ocean-950/80 backdrop-blur-xl border border-white/10 flex flex-col justify-between shadow-xl hover:border-amber-500/30 transition-all"
              >
                <div>
                  <Quote className="w-8 h-8 text-amber-500/30 mb-4" />
                  <p className="text-sand-300 text-sm leading-relaxed italic mb-6">
                    "{rev.quote}"
                  </p>
                </div>

                <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/40"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-sand-100">{rev.name}</h4>
                    <p className="text-xs text-sand-400">{rev.role}</p>
                    <span className="text-[11px] text-amber-400 block mt-0.5 font-medium">{rev.tour}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA БАННЕР */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 p-8 sm:p-14 text-center text-sand-100 shadow-2xl"
        >
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold mb-4">
              {isUa ? "Готові до своєї головної експедиції?" : "Готовы к своей главной экспедиции?"}
            </h2>
            <p className="text-sand-100/90 text-sm sm:text-base mb-8 leading-relaxed">
              {isUa
                ? "Залиште заявку, і наш консьєрж-сервіс зв'яжеться з вами для презентації маршруту та бронювання каюти чи лоджа."
                : "Оставьте заявку, и наш консьерж свяжется с вами для персональной презентации маршрута."}
            </p>
            <button
              onClick={() => openBookingModal(null)}
              className="inline-flex items-center px-8 py-4 rounded-full bg-ocean-950 hover:bg-ocean-900 text-sand-100 font-semibold text-sm uppercase tracking-wider transition-all shadow-xl hover:scale-105"
            >
              <span>{t.common.bookTour}</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* МОДАЛЬНОЕ ОКНО ПОЛНОГО ОТЗЫВА СЕРГЕЯ ТКАЧЕВА */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReviewModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-ocean-900 border border-white/20 rounded-3xl p-6 sm:p-8 text-white z-10 shadow-2xl"
            >
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-1 text-amber-400 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-xs font-bold text-sand-300 ml-2">Оценка 5.0</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                {isUa ? "Сергій Ткачов" : "Сергей Ткачев"}
              </h3>
              <p className="text-xs text-amber-400 font-medium mb-6">
                {isUa 
                  ? "Власник міжнародної компанії автозапчастин, оборот $10M+" 
                  : "Владелец международной компании автозапчастей, оборот $10M+"}
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-sm leading-relaxed text-sand-200 italic mb-6">
                "{isUa
                  ? "Дуже сподобалася організація всіх процесів. Екіпаж корабля дуже послужливий. Команда дуже дружелюбна, відпрацювала чудово. Чітко, оперативно, з душею. Локації дикі, компанія лідерів надихає. Однозначно рекомендую кожному топ-менеджеру для повного перезавантаження!"
                  : "Очень понравилась организация всех процессов. Экипаж корабля очень услужливый. Команда очень дружелюбные, отработала прекрасно. Четко, оперативно, с душой. Локации дикие, компания лидеров заряжает. Однозначно рекомендую для перезагрузки!"}"
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsReviewModalOpen(false);
                    openBookingModal(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  {isUa ? "Обрати експедицію" : "Выбрать экспедицию"}
                </button>
                <button
                  onClick={() => setIsReviewModalOpen(false)}
                  className="py-3 px-5 rounded-xl border border-white/20 text-white font-bold text-xs transition-colors hover:bg-white/10"
                >
                  {isUa ? "Закрити" : "Закрыть"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
