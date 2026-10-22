import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Send, CheckCircle, Mail, Phone, MapPin, Compass, Shield, Users, Heart } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function About() {
  const { language, t } = useTours();

  const [openFaq, setOpenFaq] = useState({ 0: true });
  const [formSent, setFormSent] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone) return;
    setFormSent(true);
  };

  const team = [
    {
      name: language === 'ua' ? "Андрій Мельник" : "Андрей Мельник",
      role: language === 'ua' ? "Співзасновник / Гірський лідер" : "Сооснователь / Горный лидер",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: language === 'ua'
        ? "14 років досвіду в горах Південної Америки та Гімалаїв. Забезпечує бездоганну логістику та безпеку кожного трекінгу."
        : "14 лет опыта в горах Южной Америки и Гималаев. Отвечает за безупречную логистику и безопасность каждого восхождения."
    },
    {
      name: language === 'ua' ? "Олена Воропаєва" : "Елена Воропаева",
      role: language === 'ua' ? "Астрофотограф / Експерт Арктики" : "Астрофотограф / Эксперт Арктики",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: language === 'ua'
        ? "Провідниця в таємничі куточки Ісландії та Лофотенських островів. Вчить мандрівників зупиняти мить у вишуканих кадрах."
        : "Проводник в потаенные уголки Исландии и Норвегии. Учит участников экспедиций ловить кадры мирового уровня."
    },
    {
      name: language === 'ua' ? "Максим Данилюк" : "Максим Данилюк",
      role: language === 'ua' ? "Зоолог / Wildlife-гід" : "Зоолог / Wildlife-гид",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: language === 'ua'
        ? "Дослідник фауни африканської савани. Знає, де знайти леопарда на світанку та як організувати розкішний сафарі-кемп."
        : "Исследователь фауны африканской саванны. Знает повадки редких хищников и правила идеального кемпинга."
    }
  ];

  const faqs = [
    {
      q: language === 'ua' ? "Як влаштований процес бронювання туру?" : "Как устроен процесс бронирования тура?",
      a: language === 'ua'
        ? "Ви залишаєте заявку на сайті, наш турлідер зв'язується з вами для знайомства, відповідей на всі запитання та узгодження деталей. Після цього підписується офіційний договір і вноситься передоплата 30% для фіксації місця у бутик-лоджах. Залишок сплачується за 30 днів до старту."
        : "Вы оставляете заявку, куратор связывается для знакомства и ответов на вопросы. Заключается договор и вносится депозит 30%. Остаток оплачивается за 30 дней до вылета."
    },
    {
      q: language === 'ua' ? "Який рівень фізичної підготовки необхідний?" : "Какой уровень физической подготовки требуется?",
      a: language === 'ua'
        ? "Більшість наших подорожей (Ісландія, Намібія, Японія) мають категорію «Легка» і доступні будь-якій людині без спеціальної підготовки. Для Патагонії чи Перу потрібна базова витривалість для піших прогулянок по 4-6 годин. Ми завжди надаємо рекомендації перед стартом."
        : "Большинство экспедиций имеют комфортный темп без экстремальных нагрузок. Для трекинговых маршрутов (Патагония, Перу) достаточно обычной бодрости и пеших прогулок."
    },
    {
      q: language === 'ua' ? "Чи допомагаєте ви з авіаквитками та візами?" : "Помогаете ли вы с авиабилетами и визами?",
      a: language === 'ua'
        ? "Так, наш тур-консьєрж підбирає найзручніші стиковки, допомагає з купівлею квитків на один рейс з турлідером та надає повний пакет документів (запрошення, ваучери, маршрутні листи) для візи."
        : "Да, наш консьерж-сервис подбирает оптимальные авиаперелеты в связке с турлидером и оформляет необходимые документы для виз."
    },
    {
      q: language === 'ua' ? "Чи можна поїхати одному / одній?" : "Можно ли поехать одному / одной?",
      a: language === 'ua'
        ? "Більше 60% наших учасників приєднуються до експедицій поодинці! Ми підбираємо комфортне двомісне підселення з мандрівником вашої статі або бронюємо одномісний номер (single supplement)."
        : "Более 60% участников приезжают соло! Мы подбираем комфортное двухместное размещение с участником вашего пола или бронируем отдельный номер."
    },
    {
      q: language === 'ua' ? "Які умови ануляції або повернення коштів?" : "Каковы условия аннуляции или возврата средств?",
      a: language === 'ua'
        ? "При скасуванні більш ніж за 45 днів до виїзду депозит повністю переноситься на будь-яку іншу експедицію клубу без штрафів протягом 12 місяців."
        : "При отмене более чем за 45 дней депозит сохраняется в полном объеме и может быть перенесен на любой другой маршрут в течение 12 месяцев."
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="pt-28 pb-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Заголовок страницы */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
            {language === 'ua' ? "Наша філософія" : "Наша философия"}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-sand-100 mb-6">
            {language === 'ua' ? "Мистецтво справжніх експедицій" : "Искусство подлинных экспедиций"}
          </h1>
          <p className="text-sand-300 text-base sm:text-lg leading-relaxed">
            {language === 'ua'
              ? "AURA Expeditions народилася зі щирого бажання відкривати світ без поспіху, без туристичних автобусів і без компромісів у якості життя."
              : "AURA Expeditions родилась из искренней страсти открывать планету без спешки, туристических клише и компромиссов в комфорте."}
          </p>
        </div>

        {/* Ценности клуба */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-3xl bg-ocean-850 border border-sand-100/10">
            <Compass className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="font-serif text-2xl font-bold text-sand-100 mb-3">
              {language === 'ua' ? "Автентичність" : "Аутентичность"}
            </h3>
            <p className="text-sand-400 text-sm leading-relaxed">
              {language === 'ua'
                ? "Ми занурюємося в справжнє життя регіону: їмо в тих ресторанах, куди ходять шефи, та ночуємо в знакових дизайнерських лоджах."
                : "Мы погружаемся в подлинный колорит: ужинаем там, где едят шеф-повара, и останавливаемся в уникальных лоджах."}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-ocean-850 border border-sand-100/10">
            <Users className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="font-serif text-2xl font-bold text-sand-100 mb-3">
              {language === 'ua' ? "Співтовариство" : "Сообщество"}
            </h3>
            <p className="text-sand-400 text-sm leading-relaxed">
              {language === 'ua'
                ? "Наші групи об'єднують топ-менеджерів, креаторів та підприємців. Подорож закінчується, а міцна дружба та спільні проекти залишаються."
                : "Наши группы объединяют близких по духу созидателей. Поездка заканчивается, а дружба и партнерство остаются навсегда."}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-ocean-850 border border-sand-100/10">
            <Shield className="w-10 h-10 text-amber-500 mb-6" />
            <h3 className="font-serif text-2xl font-bold text-sand-100 mb-3">
              {language === 'ua' ? "Абсолютна безпека" : "Абсолютная безопасность"}
            </h3>
            <p className="text-sand-400 text-sm leading-relaxed">
              {language === 'ua'
                ? "Кожен маршрут протестований особисто. Спортивна страховка з високим лімітом, сертифіковані гіди та супутниковий трекінг."
                : "Каждый шаг выверен лично. Расширенная горная страховка, лицензированные проводники и спутниковая связь."}
            </p>
          </div>
        </div>

        {/* Команда турлидеров */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
              {language === 'ua' ? "Обличчя клубу" : "Лица клуба"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
              {language === 'ua' ? "Турлідери та наставники" : "Турлидеры и наставники"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div key={i} className="rounded-3xl bg-ocean-850 border border-sand-100/10 overflow-hidden group">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-bold text-sand-100 mb-1">{member.name}</h3>
                  <p className="text-amber-500 text-xs font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-sand-400 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Секция (Аккордеон) */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
              {language === 'ua' ? "Запитання & Відповіді" : "Вопросы & Ответы"}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-sand-100 mb-4">
              {t.common.faqTitle}
            </h2>
            <p className="text-sand-300 text-sm">
              {t.common.faqSubtitle}
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = !!openFaq[idx];
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-sand-100/10 bg-ocean-850 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-ocean-800/40 transition-colors"
                  >
                    <span className="font-serif text-lg font-bold text-sand-100 pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-sand-400 transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-amber-500' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-sm text-sand-300/80 leading-relaxed border-t border-sand-100/5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Контакты & Форма связи */}
        <div className="rounded-3xl glass-panel p-8 sm:p-14 border border-sand-100/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Левая колонка контактов */}
            <div>
              <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest block mb-2">
                {language === 'ua' ? "Зв'яжіться з нами" : "Свяжитесь с нами"}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sand-100 mb-6">
                {language === 'ua' ? "Запрошуємо на каву до нашого офісу" : "Приглашаем на кофе в наш офис"}
              </h2>
              <p className="text-sand-300 text-sm leading-relaxed mb-8">
                {language === 'ua'
                  ? "Обговоримо маршрути, покажемо відео з минулих експедицій та допоможемо визначитися з вибором подорожі мрії."
                  : "Обсудим маршруты, покажем кадры из прошлых путешествий и поможем определиться с экспедицией мечты."}
              </p>

              <div className="space-y-4 text-sm text-sand-200">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>Київ, вул. Велика Васильківська, 42 (БЦ «Парус»)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>+380 (44) 234-56-78 / +380 (50) 876-54-32</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <span>concierge@aura-travel.pro</span>
                </div>
              </div>
            </div>

            {/* Правая колонка: Форма связи */}
            <div className="bg-ocean-900/80 p-6 sm:p-8 rounded-2xl border border-sand-100/10">
              {!formSent ? (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-sand-100 mb-2">
                    {language === 'ua' ? "Написати консьєржу" : "Написать консьержу"}
                  </h3>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder={language === 'ua' ? "Ваше ім'я" : "Ваше имя"}
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-4 py-3 bg-ocean-850 rounded-xl border border-sand-100/10 text-sand-100 text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder={language === 'ua' ? "Телефон / Месенджер" : "Телефон / Мессенджер"}
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-ocean-850 rounded-xl border border-sand-100/10 text-sand-100 text-sm focus:outline-none focus:border-amber-600"
                    />
                  </div>
                  <div>
                    <textarea
                      rows={3}
                      placeholder={language === 'ua' ? "Який напрямок вас цікавить?" : "Какое направление вас интересует?"}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-4 py-3 bg-ocean-850 rounded-xl border border-sand-100/10 text-sand-100 text-sm focus:outline-none focus:border-amber-600 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-sand-100 font-semibold text-xs uppercase tracking-wider hover:from-amber-500 hover:to-amber-600 transition-all flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <span>{language === 'ua' ? "Відправити повідомлення" : "Отправить сообщение"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                  <h4 className="font-serif text-2xl font-bold text-sand-100 mb-2">
                    {language === 'ua' ? "Повідомлення надіслано!" : "Сообщение отправлено!"}
                  </h4>
                  <p className="text-sand-300 text-xs leading-relaxed">
                    {language === 'ua'
                      ? "Дякуємо! Наш куратор зв'яжеться з вами найближчим часом."
                      : "Спасибо! Наш куратор свяжется с вами в ближайшее время."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
