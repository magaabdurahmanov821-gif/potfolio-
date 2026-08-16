"use client"

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import QRCode from 'react-qr-code'
import { Check, Copy, QrCode, Send, X } from 'lucide-react'

const telegramUrl = 'https://t.me/mbronsonx'
const email = 'hello@magomed.dev'

export function QuickContactModal() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState('')

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(label)
      window.setTimeout(() => setCopied(''), 1800)
    } catch {
      setCopied('Не удалось скопировать')
    }
  }

  return <>
    <button type="button" onClick={() => setOpen(true)} className="quick-connect-button inline-flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition" aria-haspopup="dialog">
      <QrCode size={14} /> Quick Connect / QR
    </button>

    <AnimatePresence>
      {open && <>
        <motion.div className="fixed inset-0 z-50 hidden items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.section role="dialog" aria-modal="true" aria-labelledby="quick-contact-title" className="quick-contact-card relative mx-auto my-auto flex w-full max-w-sm flex-col items-center overflow-hidden rounded-3xl border p-6 text-center md:p-8" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .97 }} transition={{ duration: .24 }} onClick={event => event.stopPropagation()}>
            <button type="button" onClick={() => setOpen(false)} className="quick-close absolute right-4 top-4 grid size-8 place-items-center rounded-full border" aria-label="Закрыть"><X size={15} /></button>
            <p className="page-muted font-mono text-[10px] uppercase">Quick Connect</p>
            <h2 id="quick-contact-title" className="mt-3 max-w-[300px] text-2xl font-semibold tracking-[-.06em]">Быстрый контакт со смартфона</h2>
            <div className="mt-7 w-fit rounded-xl bg-white p-3 shadow-sm"><QRCode value={telegramUrl} size={180} bgColor="#ffffff" fgColor="#111111" /></div>
            <p className="page-muted mt-5 max-w-xs text-center text-sm leading-relaxed">Наведите камеру смартфона, чтобы сразу перейти в диалог со мной.</p>
            <button type="button" onClick={() => copy('@mbronsonx', 'Скопировано!')} className="quick-copy mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold"><>{copied === 'Скопировано!' ? <Check size={16} /> : <Copy size={16} />}</>{copied || 'Скопировать Telegram'}</button>
          </motion.section>
        </motion.div>

        <motion.div className="fixed inset-0 z-[90] flex items-end bg-black/45 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
          <motion.section role="dialog" aria-modal="true" aria-labelledby="quick-contact-mobile-title" className="quick-contact-card w-full rounded-t-[1.25rem] border-x border-t p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]" initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 280 }} onClick={event => event.stopPropagation()}>
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-current/20" />
            <p className="page-muted font-mono text-[10px] uppercase">Quick Connect</p>
            <h2 id="quick-contact-mobile-title" className="mt-2 text-2xl font-semibold tracking-[-.06em]">Связаться быстро</h2>
            <a href={telegramUrl} target="_blank" rel="noreferrer" className="quick-copy mt-6 flex w-full items-center justify-center gap-2 rounded-lg py-3.5 text-sm font-semibold"><Send size={16} />Открыть Telegram</a>
            <button type="button" onClick={() => copy(email, 'Email скопирован!')} className="quick-secondary mt-2 flex w-full items-center justify-center gap-2 rounded-lg border py-3.5 text-sm font-semibold">{copied === 'Email скопирован!' ? <Check size={16} /> : <Copy size={16} />}{copied === 'Email скопирован!' ? copied : 'Скопировать Email'}</button>
            <button type="button" onClick={() => setOpen(false)} className="page-muted mt-4 w-full py-2 text-sm font-semibold">Закрыть</button>
          </motion.section>
        </motion.div>
      </>}
    </AnimatePresence>
  </>
}
