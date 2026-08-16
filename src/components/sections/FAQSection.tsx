import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { question: 'Как строится процесс оплаты?', answer: 'Работаю поэтапно — обычно 50% предоплата перед стартом и 50% после финальной демонстрации и тестов. Возможна оплата криптовалютой, на карту или через безопасные сделки.' },
  { question: 'Поможешь ли с хостингом, доменом и публикацией?', answer: 'Да, беру всю техническую рутину на себя: помогу с регистрацией домена, настройкой базы данных, SSL-сертификатов и деплоем на Vercel/VPS.' },
  { question: 'Сколько времени занимает разработка?', answer: 'Небольшой промо-сайт или Telegram Mini App — от 4 до 7 дней. Полноценный сервис с базой и админкой — от 10 до 20 дней.' },
  { question: 'Что происходит после сдачи проекта?', answer: 'Предоставляю 14 дней бесплатной гарантийной поддержки и исправления любых скрытых нюансов, а также видеоинструкцию по работе с админкой.' },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="faq-section pb-24 sm:pb-32" aria-labelledby="faq-title">
      <div className="page-line grid gap-8 border-t pt-4 md:grid-cols-[.75fr_1.25fr] md:gap-16">
        <div><p className="page-muted font-mono text-[10px] uppercase">FAQ</p><h2 id="faq-title" className="mt-5 max-w-sm text-3xl font-semibold leading-[.94] tracking-[-.07em] sm:text-5xl">Things you may want to know.</h2></div>
        <div className="divide-y divide-current/20 border-y border-current/20">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return <article key={faq.question}>
              <button type="button" onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-5 py-5 text-left text-base font-semibold tracking-[-.035em] sm:py-6 sm:text-lg" aria-expanded={isOpen}>
                <span>{faq.question}</span><ChevronDown size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .28, ease: 'easeInOut' }} className="overflow-hidden"><p className="page-muted max-w-xl pb-6 text-sm leading-relaxed sm:text-base">{faq.answer}</p></motion.div>}
              </AnimatePresence>
            </article>
          })}
        </div>
      </div>
    </section>
  )
}
