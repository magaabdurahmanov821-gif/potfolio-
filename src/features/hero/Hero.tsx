import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, GitFork, Sparkles } from 'lucide-react'
import { OrbitVisual } from './OrbitVisual'

const rise = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[790px] overflow-hidden pt-36 md:min-h-[850px] md:pt-48">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute left-[7%] top-36 -z-10 size-[420px] rounded-full bg-violet/20 blur-[120px]" />
      <div className="absolute right-[3%] top-20 -z-10 size-[480px] rounded-full bg-cyan/15 blur-[130px]" />
      <div className="section-wrap relative">
        <motion.div initial="hidden" animate="show" transition={{ staggerChildren: .12 }} className="max-w-4xl">
          <motion.div variants={rise} className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan/25 bg-cyan/[.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.16em] text-cyan">
            <span className="relative flex size-1.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan opacity-75" /><span className="relative inline-flex size-1.5 rounded-full bg-cyan" /></span>
            Available for select projects
          </motion.div>
          <motion.p variants={rise} className="mono mb-4 text-[11px] uppercase tracking-[.17em] text-zinc-500">01 — Digital engineer / 2026</motion.p>
          <motion.h1 variants={rise} className="max-w-5xl text-[clamp(3.3rem,8.6vw,8.6rem)] font-extrabold leading-[.86] tracking-[-.085em] text-[#f3f3f0]">
            Создаю опыт,<br />
            который <span className="relative whitespace-nowrap text-cyan">работает<span className="absolute -bottom-2 left-0 h-px w-full bg-cyan/80" /></span>.
          </motion.h1>
          <motion.div variants={rise} className="mt-8 flex flex-col gap-7 sm:mt-10 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-md text-base leading-relaxed text-zinc-400 md:text-lg">Привет, я <span className="font-bold text-white">Магомед</span> — full-stack разработчик. Проектирую выразительные интерфейсы и надёжные цифровые продукты.</p>
            <div className="flex shrink-0 gap-2">
              <a href="#projects" className="group inline-flex items-center gap-3 rounded-xl bg-cyan px-4 py-3 text-sm font-extrabold text-ink transition-transform hover:-translate-y-1">Смотреть работы <ArrowDownRight size={17} className="transition-transform group-hover:translate-y-0.5" /></a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="grid size-[50px] place-items-center rounded-xl border border-white/15 bg-white/[.05] text-white transition hover:border-white/35 hover:bg-white/10" aria-label="GitHub"><GitFork size={19} /></a>
            </div>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .35, duration: .8 }} className="absolute right-0 top-[325px] hidden lg:block"><OrbitVisual /></motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .8 }} className="mt-24 flex items-end justify-between border-t border-white/10 py-5 md:mt-32">
          <p className="mono max-w-40 text-[10px] uppercase leading-relaxed tracking-wider text-zinc-600">Crafting digital signals from Russia to the world.</p>
          <a href="#projects" className="flex items-center gap-2 text-xs font-bold text-zinc-400 transition hover:text-cyan">scroll to explore <ArrowUpRight size={14} /></a>
        </motion.div>
      </div>
      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] text-zinc-600 md:flex"><Sparkles size={12} className="text-violet" /> built on curiosity &amp; caffeine</div>
    </section>
  )
}
