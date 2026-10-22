import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Calendar, DollarSign, Send, ShieldCheck, User, Phone, Mail, MessageSquare } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function BookingModal() {
  const { isBookingOpen, closeBookingModal, bookingTour, language } = useTours();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    participants: 1,
    comment: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isBookingOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = language === 'ua' ? "Вкажіть ваше ім'я" : "Укажите ваше имя";
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      errs.phone = language === 'ua' ? "Вкажіть дійсний номер телефону" : "Укажите корректный телефон";
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = language === 'ua' ? "Некоректний email" : "Некорректный email";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Имитация отправки в API / CRM
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      participants: 1,
      comment: '',
    });
    setErrors({});
    closeBookingModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
      {/* Затемненный фон с размытием */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleResetAndClose}
        className="fixed inset-0 bg-ocean-950/85 backdrop-blur-md transition-opacity"
      />

      {/* Окно модалки */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
        className="relative w-full max-w-xl bg-ocean-900 border border-sand-100/15 rounded-3xl shadow-2xl overflow-hidden z-10"
      >
        {/* Кнопка закрытия */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-ocean-800 text-sand-300 hover:text-sand-100 hover:bg-ocean-700 flex items-center justify-center transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <div className="p-6 sm:p-8">
              {/* Шапка формы */}
              <div className="mb-6">
                <span className="text-amber-500 text-xs font-semibold uppercase tracking-widest">
                  {language === 'ua' ? "Бронювання подорожі" : "Бронирование путешествия"}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-sand-100 mt-1">
                  {bookingTour
                    ? bookingTour.title[language]
                    : language === 'ua'
                    ? "Індивідуальна заявка на експедицію"
                    : "Индивидуальная заявка на экспедицию"}
                </h3>

                {bookingTour && (
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-sand-300">
                    <span className="inline-flex items-center space-x-1 bg-ocean-800/80 px-2.5 py-1 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-amber-500 mr-1" />
                      {bookingTour.dates}
                    </span>
                    <span className="inline-flex items-center space-x-1 bg-ocean-800/80 px-2.5 py-1 rounded-md">
                      <DollarSign className="w-3.5 h-3.5 text-amber-500 mr-0.5" />
                      ${bookingTour.priceUSD.toLocaleString()} / {language === 'ua' ? 'особа' : 'человек'}
                    </span>
                  </div>
                )}
              </div>

              {/* Форма */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Имя */}
                <div>
                  <label className="block text-xs font-medium text-sand-300 mb-1.5">
                    {language === 'ua' ? "Ваше ім'я та прізвище *" : "Ваше имя и фамилия *"}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={language === 'ua' ? "Олександр Коваленко" : "Александр Коваленко"}
                      className={`w-full pl-10 pr-4 py-3 bg-ocean-850 border rounded-xl text-sand-100 placeholder-sand-400/50 text-sm focus:outline-none focus:border-amber-600 transition-colors ${
                        errors.name ? 'border-red-500/80' : 'border-sand-100/10'
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Телефон и Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-sand-300 mb-1.5">
                      {language === 'ua' ? "Номер телефону (Telegram/WhatsApp) *" : "Номер телефона (Telegram/WhatsApp) *"}
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+380 50 123 45 67"
                        className={`w-full pl-10 pr-4 py-3 bg-ocean-850 border rounded-xl text-sand-100 placeholder-sand-400/50 text-sm focus:outline-none focus:border-amber-600 transition-colors ${
                          errors.phone ? 'border-red-500/80' : 'border-sand-100/10'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-sand-300 mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="explorer@aura.com"
                        className={`w-full pl-10 pr-4 py-3 bg-ocean-850 border rounded-xl text-sand-100 placeholder-sand-400/50 text-sm focus:outline-none focus:border-amber-600 transition-colors ${
                          errors.email ? 'border-red-500/80' : 'border-sand-100/10'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Количество участников */}
                <div>
                  <label className="block text-xs font-medium text-sand-300 mb-1.5">
                    {language === 'ua' ? "Кількість місць" : "Количество мест"}
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, participants: num })}
                        className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          formData.participants === num
                            ? 'bg-amber-600 text-sand-100 border-amber-600 shadow-glow-amber'
                            : 'bg-ocean-850 text-sand-300 border-sand-100/10 hover:border-sand-100/25'
                        }`}
                      >
                        {num} {num === 1 ? (language === 'ua' ? 'місце' : 'место') : (language === 'ua' ? 'місця' : 'места')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Комментарий */}
                <div>
                  <label className="block text-xs font-medium text-sand-300 mb-1.5">
                    {language === 'ua' ? "Побажання чи запитання" : "Пожелания или вопросы"}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-sand-400" />
                    <textarea
                      rows={2}
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      placeholder={language === 'ua' ? "Чи потрібна допомога з візою або квитками..." : "Нужна ли помощь с визой или билетами..."}
                      className="w-full pl-10 pr-4 py-3 bg-ocean-850 border border-sand-100/10 rounded-xl text-sand-100 placeholder-sand-400/50 text-sm focus:outline-none focus:border-amber-600 transition-colors resize-none"
                    />
                  </div>
                </div>

                {/* Кнопка отправки */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-sand-100 font-semibold text-sm uppercase tracking-wider shadow-lg shadow-amber-900/30 transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-sand-100 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{language === 'ua' ? "Надіслати заявку" : "Отправить заявку"}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-2 text-[11px] text-sand-400/70 pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    {language === 'ua'
                      ? "Ваші дані захищені. Ми зв'яжемося протягом 15 хвилин"
                      : "Данные защищены. Мы свяжемся в течение 15 минут"}
                  </span>
                </div>
              </form>
            </div>
          ) : (
            /* Экран успешной отправки */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 sm:p-12 text-center"
            >
              <div className="w-16 h-16 bg-amber-600/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10" />
              </div>

              <h4 className="font-serif text-3xl font-bold text-sand-100 mb-2">
                {language === 'ua' ? "Заявку прийнято!" : "Заявка принята!"}
              </h4>

              <p className="text-sand-300 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                {language === 'ua'
                  ? `Дякуємо, ${formData.name}! Наш турлідер та консьєрж зв'яжеться з вами у Telegram/WhatsApp за номером ${formData.phone} для уточнення деталей подорожі.`
                  : `Спасибо, ${formData.name}! Наш турлидер свяжется с вами в Telegram/WhatsApp по номеру ${formData.phone} для уточнения деталей экспедиции.`}
              </p>

              <button
                onClick={handleResetAndClose}
                className="px-8 py-3 bg-ocean-800 hover:bg-ocean-700 text-sand-100 text-sm font-semibold rounded-xl transition-colors"
              >
                {language === 'ua' ? "Зрозуміло" : "Понятно"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
