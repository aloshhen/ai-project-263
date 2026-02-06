import { useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { clsx, ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility for tailwind class merging (JS only, no types)
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// SafeIcon component for all icons
const SafeIcon = ({ name, size = 24, className = '', color }) => {
  const icons = {
    'blocks': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
    'zap': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    'shield-check': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>,
    'truck': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5"/><path d="M14 17h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>,
    'star': <svg width={size} height={size} viewBox="0 0 24 24" fill={color || "currentColor"} stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    'chevron-right': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m9 18 6-6-6-6"/></svg>,
    'menu': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>,
    'x': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
    'package': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    'heart': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5 4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>,
    'users': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    'sparkles': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
    'check': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20 6 9 17l-5-5"/></svg>,
    'send': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/></svg>,
    'message-square': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    'bot': <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
  }

  return icons[name] || icons['star'] || null
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Web3Forms handler hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Что-то пошло не так')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Ошибка сети. Попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }

  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

// FAQ Data for chat
const FAQ_DATA = [
  {
    question: 'Какая доставка?',
    answer: 'Бесплатная доставка по всей России от 3000₽. Срок — 3-7 рабочих дней.',
    keywords: ['доставка', 'сколько', 'стоимость', 'срок', 'бесплатно']
  },
  {
    question: 'Есть гарантия?',
    answer: 'Да, гарантия качества 2 года. Если детали повреждены — заменим бесплатно.',
    keywords: ['гарантия', 'возврат', 'обмен', 'качество', 'сломан']
  },
  {
    question: 'Для какого возраста?',
    answer: 'Конструкторы от 6 до 16+ лет. Есть серии для детей и сложные для взрослых.',
    keywords: ['возраст', 'ребенок', 'сколько лет', 'для кого']
  },
  {
    question: 'Как заказать?',
    answer: 'Нажмите кнопку "Купить", заполните форму. Мы перезвоним для подтверждения.',
    keywords: ['заказ', 'купить', 'оформить', 'как заказать']
  }
]

const SITE_CONTEXT = 'Магазин премиальных LEGO-совместимых конструкторов. Большой выбор наборов для детей и взрослых. Бесплатная доставка, гарантия 2 года.'

// Chat Widget Component
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Привет! Я помогу с выбором конструктора. Что вас интересует?' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const findFaqAnswer = (text) => {
    const lowerText = text.toLowerCase()
    for (const faq of FAQ_DATA) {
      if (faq.keywords.some(kw => lowerText.includes(kw))) {
        return faq.answer
      }
    }
    return null
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = inputValue.trim()
    setMessages(prev => [...prev, { type: 'user', text: userMessage }])
    setInputValue('')
    setIsLoading(true)

    // Check FAQ first
    const faqAnswer = findFaqAnswer(userMessage)

    if (faqAnswer) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: faqAnswer }])
        setIsLoading(false)
      }, 500)
      return
    }

    // Fallback to API
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, context: SITE_CONTEXT })
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, { type: 'bot', text: data.reply }])
      } else {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Извините, я не понял. Попробуйте спросить о доставке, гарантии или возрастных ограничениях.'
        }])
      }
    } catch {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: 'Извините, сервис временно недоступен. Позвоните нам: 8-800-123-45-67'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors',
          isOpen ? 'hidden' : 'flex bg-red-600 hover:bg-red-700'
        )}
      >
        <SafeIcon name="message-square" size={24} color="white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-red-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SafeIcon name="bot" size={20} color="white" />
                <span className="text-white font-bold">LEGO Помощник</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <SafeIcon name="x" size={20} color="white" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'max-w-[80%] p-3 rounded-2xl text-sm',
                    msg.type === 'user'
                      ? 'ml-auto bg-red-600 text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                  )}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-1 p-3 bg-white border border-gray-200 rounded-2xl rounded-bl-sm w-fit">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                    className="w-2 h-2 bg-gray-400 rounded-full"
                  />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите вопрос..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-red-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                >
                  <SafeIcon name="send" size={16} color="white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Product Card Component
const ProductCard = ({ product, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        />
        {product.badge && (
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {product.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <SafeIcon key={i} name="star" size={14} color={i < product.rating ? '#fbbf24' : '#e5e7eb'} />
          ))}
          <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-gray-900">{product.price}₽</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">{product.oldPrice}₽</span>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-900 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2"
          >
            Купить
            <SafeIcon name="chevron-right" size={16} color="white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

// Feature Card Component
const FeatureCard = ({ icon, title, description, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-8 rounded-3xl bg-white border border-gray-100 hover:border-red-200 hover:shadow-xl transition-all duration-300"
    >
      <motion.div
        className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300"
        whileHover={{ rotate: 5, scale: 1.1 }}
      >
        <SafeIcon name={icon} size={32} color="#dc2626" className="group-hover:text-white transition-colors" />
      </motion.div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </motion.div>
  )
}

// Testimonial Card
const TestimonialCard = ({ testimonial, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-8 rounded-3xl bg-gray-50 border border-gray-100"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <SafeIcon key={i} name="star" size={12} color="#fbbf24" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed">"{testimonial.text}"</p>
    </motion.div>
  )
}

// Contact Form Component
const ContactForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // Replace with your Web3Forms Access Key from https://web3forms.com

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ваше имя</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Иван Иванов"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Телефон</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (999) 123-45-67"
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                required
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Сообщение</label>
              <textarea
                name="message"
                placeholder="Какой конструктор вас интересует?"
                rows={4}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all resize-none"
              ></textarea>
            </div>

            {isError && (
              <div className="text-red-600 text-sm bg-red-50 p-4 rounded-xl">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <SafeIcon name="send" size={18} color="white" />
                  Отправить заявку
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-center py-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <SafeIcon name="check" size={40} color="#22c55e" />
            </motion.div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Заявка отправлена!
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Спасибо за обращение! Мы перезвоним вам в течение 15 минут для подтверждения заказа.
            </p>
            <button
              onClick={resetForm}
              className="text-red-600 hover:text-red-700 font-bold transition-colors"
            >
              Отправить ещё заявку
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Main App Component
function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  const productsRef = useRef(null)
  const productsInView = useInView(productsRef, { once: true, margin: '-100px' })

  const featuresRef = useRef(null)
  const featuresInView = useInView(featuresRef, { once: true, margin: '-100px' })

  const testimonialsRef = useRef(null)
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: '-100px' })

  const contactRef = useRef(null)
  const contactInView = useInView(contactRef, { once: true, margin: '-100px' })

  const products = [
    {
      name: 'Космический корабль Explorer',
      description: 'Большой космический корабль с 847 деталями. Открывающаяся кабина, шасси и минifigures пилотов.',
      price: 3490,
      oldPrice: 4290,
      rating: 5,
      reviews: 128,
      badge: 'Хит',
      image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=600&q=80'
    },
    {
      name: 'Городская пожарная станция',
      description: 'Детальная пожарная станция с 1024 деталями. Включает 5 фигурок пожарных и 2 пожарные машины.',
      price: 4990,
      oldPrice,
      rating: 5,
      reviews: 89,
      badge: 'Новинка',
      image: 'https://images.unsplash.com/photo-1560964645-6c9e759078f5?w=600&q=80'
    },
    {
      name: 'Замок Рыцарей',
      description: 'Величественный средневековый замок с 1567 деталями. Подвижные мосты, секретные ходы и 8 рыцарей.',
      price: 6990,
      oldPrice: 8490,
      rating: 5,
      reviews: 234,
      badge: '-18%',
      image: 'https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=600&q=80'
    },
    {
      name: 'Динозавр T-Rex',
      description: 'Подвижный T-Rex с 312 деталями. Челюсть открывается, лапы двигаются. Отличный подарок для юного палеонтолога.',
      price: 1990,
      oldPrice,
      rating: 4,
      reviews: 156,
      badge,
      image: 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?w=600&q=80'
    }
  ]

  const features = [
    {
      icon: 'truck',
      title: 'Бесплатная доставка',
      description: 'При заказе от 3000₽ доставим бесплатно в любую точку России за 3-7 дней.'
    },
    {
      icon: 'shield-check',
      title: 'Гарантия 2 года',
      description: 'Полная гарантия на все детали. Сломалась — заменим бесплатно.'
    },
    {
      icon: 'package',
      title: 'Оригинальные наборы',
      description: 'Только сертифицированные конструкторы с полным комплектом деталей.'
    },
    {
      icon: 'heart',
      title: 'Подарочная упаковка',
      description: 'Бесплатная красивая упаковка для подарка. Добавим открытку по запросу.'
    }
  ]

  const testimonials = [
    {
      name: 'Анна М.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      text: 'Заказала замок для сына на 8-летие. Доставка за 4 дня, всё в идеальном состоянии. Ребёнок в восторге!'
    },
    {
      name: 'Дмитрий К.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      text: 'Собираю конструкторы 20 лет. Качество этих наборов на уровне лучших мировых брендов. Рекомендую!'
    },
    {
      name: 'Елена С.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      text: 'Отличный сервис! Менеджер помог выбрать набор по возрасту. Ребёнок собирает уже третий месяц.'
    }
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100"
      >
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <SafeIcon name="blocks" size={24} color="white" />
            </div>
            <span className="text-2xl font-black text-gray-900">BRICK<span className="text-red-600">CRAFT</span></span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('products')} className="text-gray-600 hover:text-red-600 font-medium transition-colors">Каталог</button>
            <button onClick={() => scrollToSection('features')} className="text-gray-600 hover:text-red-600 font-medium transition-colors">Преимущества</button>
            <button onClick={() => scrollToSection('reviews')} className="text-gray-600 hover:text-red-600 font-medium transition-colors">Отзывы</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-600 hover:text-red-600 font-medium transition-colors">Контакты</button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-600 hover:text-red-600 transition-colors">
              <SafeIcon name="heart" size={24} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-gray-900 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold transition-colors"
            >
              Заказать
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <SafeIcon name="x" size={24} /> : <SafeIcon name="menu" size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                <button onClick={() => scrollToSection('products')} className="block w-full text-left py-2 text-gray-600 font-medium">Каталог</button>
                <button onClick={() => scrollToSection('features')} className="block w-full text-left py-2 text-gray-600 font-medium">Преимущества</button>
                <button onClick={() => scrollToSection('reviews')} className="block w-full text-left py-2 text-gray-600 font-medium">Отзывы</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left py-2 text-gray-600 font-medium">Контакты</button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-red-600 text-white px-6 py-3 rounded-full font-bold"
                >
                  Заказать
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={heroInView ? 'visible' : 'hidden'}
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
                <SafeIcon name="sparkles" size={16} />
                Новая коллекция 2024
              </motion.div>
              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 leading-[0.9] mb-6 tracking-tight"
              >
                СОЗДАЙ<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">СВОЙ МИР</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                Премиальные конструкторы для детей и взрослых. Более 500 наборов с бесплатной доставкой по всей России.
              </motion.p>
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('products')}
                  className="group bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  Смотреть каталог
                  <SafeIcon name="chevron-right" size={20} color="white" />
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all"
                >
                  Получить консультацию
                </button>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeInUp} className="flex items-center justify-center lg:justify-start gap-6 mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <SafeIcon name="shield-check" size={18} />
                  <span>Гарантия 2 года</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <SafeIcon name="truck" size={18} />
                  <span>Бесплатная доставка</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative aspect-square">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <img
                    src="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?w=800&q=80"
                    alt="LEGO Constructor"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </motion.div>

                {/* Decorative elements */}
                <div className="absolute top-10 right-10 w-20 h-20 bg-red-100 rounded-2xl -z-10 animate-pulse" />
                <div className="absolute bottom-20 left-10 w-32 h-32 bg-gray-100 rounded-full -z-10" />
                <div className="absolute top-1/2 right-0 w-16 h-16 bg-yellow-100 rounded-xl -z-10 rotate-12" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-4 bg-gray-900">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '50K+', label: 'Довольных клиентов' },
              { value: '500+', label: 'Наборов в каталоге' },
              { value: '4.9', label: 'Средняя оценка' },
              { value: '24/7', label: 'Поддержка клиентов' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" ref={productsRef} className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate={productsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-4"
            >
              Популярные наборы
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Выбирайте из нашей коллекции премиальных конструкторов для любого возраста
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <button className="inline-flex items-center gap-2 text-red-600 font-bold text-lg hover:gap-4 transition-all">
              Смотреть все наборы
              <SafeIcon name="chevron-right" size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-4"
            >
              Почему выбирают нас
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Мы заботимся о каждом клиенте и делаем покупку максимально комфортной
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                Первый заказ?<br/>
                <span className="text-yellow-300">Скидка 15%!</span>
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-lg">
                Подпишитесь на рассылку и получите промокод на скидку 15% на первый заказ + бесплатную доставку
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="px-6 py-4 rounded-full bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 flex-1"
                />
                <button className="bg-white text-red-600 px-8 py-4 rounded-full font-bold hover:bg-yellow-300 transition-colors">
                  Получить скидку
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <img
                src="https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=600&q=80"
                alt="Special offer"
                className="rounded-3xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" ref={testimonialsRef} className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-black text-gray-900 mb-4"
            >
              Что говорят клиенты
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Более 50 000 довольных покупателей по всей России
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 px-4 bg-gray-50 telegram-safe-bottom">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Оставьте заявку
              </h2>
              <p className="text-xl text-gray-500 mb-8">
                Заполните форму и наш менеджер свяжется с вами в течение 15 минут для консультации и оформления заказа
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <SafeIcon name="zap" size={24} color="#dc2626" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Быстрая обработка</div>
                    <div className="text-gray-500">Ответ в течение 15 минут</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <SafeIcon name="shield-check" size={24} color="#dc2626" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Гарантия качества</div>
                    <div className="text-gray-500">Проверка перед отправкой</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <SafeIcon name="truck" size={24} color="#dc2626" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Бесплатная доставка</div>
                    <div className="text-gray-500">При заказе от 3000₽</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <a href="#" className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                  <SafeIcon name="blocks" size={24} color="white" />
                </div>
                <span className="text-2xl font-black">BRICK<span className="text-red-500">CRAFT</span></span>
              </a>
              <p className="text-gray-400 max-w-sm mb-6">
                Премиальные конструкторы для детей и взрослых. Создавайте, играйте, мечтайте вместе с нами.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-sm font-bold">VK</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-sm font-bold">TG</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-sm font-bold">YT</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Для детей 6-10 лет</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Для подростков 10-14</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Для взрослых 14+</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Коллекционные</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Доставка и оплата</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантия и возврат</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Частые вопросы</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2024 BrickCraft. Все права защищены.
            </div>
            <div className="flex gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App