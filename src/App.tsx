import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, type Variants, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, AtSign, Moon, Send, Sun, Volume2, VolumeX } from 'lucide-react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TextHoverEffect } from './components/ui/TextHoverEffect'
import { InstagramIcon } from './components/ui/instagram-icon'
import { TerminalWidget } from './components/ui/terminal-widget'
import { QuickContactModal } from './components/ui/QuickContactModal'
import { TiltProjectCard } from './components/ui/TiltProjectCard'
import { TechMetrics } from './components/sections/TechMetrics'
import { FAQSection } from './components/sections/FAQSection'
import { getSoundMuted, playClick, playToggle, setSoundMuted } from './lib/sound'

const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })))
const AdminRoute = lazy(() => import('./pages/AdminRoute').then(module => ({ default: module.AdminRoute })))

const projectFrames = [
  {
    name: 'MOTION / 01',
    label: 'Fashion film',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85',
    position: 'object-[center_35%]',
  },
  {
    name: 'ARCHIVE / 02',
    label: 'Art direction',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7452?auto=format&fit=crop&w=1000&q=85',
    position: 'object-center',
  },
  {
    name: 'KIN / 03',
    label: 'Digital campaign',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
    position: 'object-[center_28%]',
  },
  {
    name: 'SIGNAL / 04',
    label: 'Live experience',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1000&q=85',
    position: 'object-center',
  },
  {
    name: 'STRIDE / 05',
    label: 'Sport platform',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1000&q=85',
    position: 'object-center',
  },
  {
    name: 'PACE / 06',
    label: 'Running culture',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=1000&q=85',
    position: 'object-center',
  },
]

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const heroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: .16, delayChildren: .12 } },
}

const heroReveal: Variants = {
  hidden: { opacity: 0, y: 64, clipPath: 'inset(0 0 100% 0)' },
  visible: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', transition: { duration: .95, ease: [0.22, 1, 0.36, 1] } },
}

const letterStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: .075 } },
}

const letterReveal: Variants = {
  hidden: (index: number) => ({ opacity: 0, y: index < 5 ? -92 : 92, rotate: index < 5 ? -4 : 4 }),
  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: .86, ease: [0.22, 1, 0.36, 1] } },
}

const mobileHeroStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: .08 } },
}

const mobileHeroReveal: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: .38, ease: 'easeOut' } },
}

const sectionReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export function App() {
  const loader = <main className="page-root grid min-h-screen place-items-center font-mono text-xs">Loading…</main>
  return <BrowserRouter><Routes><Route path="/" element={<Portfolio />} /><Route path="/login" element={<Suspense fallback={loader}><Login /></Suspense>} /><Route path="/admin" element={<Suspense fallback={loader}><AdminRoute /></Suspense>} /></Routes></BrowserRouter>
}

function Portfolio() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => localStorage.getItem('magomed-theme') === 'dark' ? 'dark' : 'light')
  const { scrollYProgress } = useScroll()
  const scrollProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: .25 })

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark')
    localStorage.setItem('magomed-theme', theme)
  }, [theme])

  return (
    <main className="page-root min-h-screen overflow-hidden pb-28 md:pb-16">
      <motion.div layoutId="scroll-frame" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-[#49b56d]" style={{ scaleX: scrollProgress }} />
      <div className="page-shell">
        <Header theme={theme} onToggleTheme={() => setTheme(current => current === 'light' ? 'dark' : 'light')} />
        <Hero />
        <SectionReveal><ProjectsPanel /></SectionReveal>
        <SectionReveal><Highlights /></SectionReveal>
        <SectionReveal><TechMetrics /></SectionReveal>
        <SectionReveal><FAQSection /></SectionReveal>
        <SectionReveal><Footer /></SectionReveal>
      </div>
    </main>
  )
}

function Header({ theme, onToggleTheme }: { theme: 'light' | 'dark'; onToggleTheme: () => void }) {
  const [muted, setMuted] = useState(getSoundMuted)

  const toggleSound = () => {
    if (!muted) playClick()
    const nextMuted = !muted
    setMuted(nextMuted)
    setSoundMuted(nextMuted)
  }

  return (
    <header className="flex items-center justify-between py-5 sm:py-7">
      <span aria-hidden="true" />
      <div className="flex items-center gap-2">
        <motion.button type="button" data-sound="custom" onClick={toggleSound} whileHover={{ scale: 1.05 }} whileTap={{ scale: .96 }} className="theme-toggle group grid size-8 place-items-center rounded-full border" aria-label={muted ? 'Turn sounds on' : 'Mute sounds'} title={muted ? 'Sound on' : 'Mute sound'}>
          {muted ? <VolumeX size={14} strokeWidth={2} /> : <Volume2 size={14} strokeWidth={2} />}
        </motion.button>
        <motion.button type="button" data-sound="custom" onClick={() => { playToggle(); onToggleTheme() }} whileHover={{ scale: 1.05 }} whileTap={{ scale: .96 }} className="theme-toggle group grid size-8 place-items-center rounded-full border" aria-label={theme === 'light' ? 'Switch to night mode' : 'Switch to day mode'} title={theme === 'light' ? 'Night mode' : 'Day mode'}>
          {theme === 'light' ? <Moon size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:rotate-[-18deg]" /> : <Sun size={14} strokeWidth={2} className="transition-transform duration-300 group-hover:rotate-45" />}
        </motion.button>
        <motion.a href="#contact" whileHover={{ scale: 1.05 }} className="group inline-flex items-center gap-1 text-xs font-semibold tracking-[-.02em] transition-opacity hover:opacity-55">
          Contact <ArrowUpRight size={14} strokeWidth={1.8} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </motion.a>
      </div>
    </header>
  )
}

function Hero() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const parallaxX = useSpring(pointerX, { stiffness: 45, damping: 18 })
  const parallaxY = useSpring(pointerY, { stiffness: 45, damping: 18 })

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <section id="top" className="relative flex min-h-[400px] flex-col justify-between overflow-hidden pb-10 pt-5 sm:min-h-[440px] sm:pt-6 lg:min-h-[465px] lg:pt-7" onPointerMove={isMobile ? undefined : event => { const bounds = event.currentTarget.getBoundingClientRect(); pointerX.set((event.clientX - bounds.left - bounds.width / 2) * .025); pointerY.set((event.clientY - bounds.top - bounds.height / 2) * .025) }} onPointerLeave={isMobile ? undefined : () => { pointerX.set(0); pointerY.set(0) }}>
      <motion.div aria-hidden="true" className="pointer-events-none absolute -right-12 top-4 hidden size-64 rounded-full border border-current/10 opacity-35 md:block" style={{ x: parallaxX, y: parallaxY }} animate={{ rotate: 360 }} transition={{ rotate: { duration: 85, repeat: Infinity, ease: 'linear' } }} />
      <motion.div initial={isMobile ? false : 'hidden'} animate={isMobile ? false : 'visible'} variants={isMobile ? undefined : heroStagger} className="mt-auto">
        <motion.h1 initial={isMobile ? { opacity: 0, y: 46, scale: .985 } : undefined} animate={isMobile ? { opacity: 1, y: 0, scale: 1 } : undefined} transition={isMobile ? { duration: .78, ease: [0.22, 1, 0.36, 1] } : undefined} variants={isMobile ? undefined : letterStagger} className="portfolio-heading display-type max-w-[1000px] text-[clamp(3.9rem,12vw,10.6rem)] leading-[.74] tracking-[-.092em]">
          <span className="block">{isMobile ? 'PORTFOLIO' : 'PORTFOLIO'.split('').map((letter, index) => <motion.span key={`${letter}-${index}`} custom={index} variants={letterReveal} className="inline-block">{letter}</motion.span>)}</span>
        </motion.h1>
        <motion.div initial={isMobile ? { opacity: 0, y: 22 } : undefined} animate={isMobile ? { opacity: 1, y: 0 } : undefined} transition={isMobile ? { duration: .62, delay: .17, ease: [0.22, 1, 0.36, 1] } : undefined} variants={isMobile ? undefined : heroReveal} className="page-line mt-10 flex items-end justify-between border-t pt-3 sm:mt-14">
          <div className="flex items-center gap-2.5">
            <span className="page-fg-bg grid size-9 place-items-center rounded-full font-mono text-[9px] font-medium">M.D.</span>
            <span className="text-xs font-semibold tracking-[-.035em]">Magomed<br className="sm:hidden" /> Abdurahmanov</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[-.035em]">
            <span className="relative flex size-2"><span className="absolute inset-0 animate-ping rounded-full bg-[#49b56d] opacity-70" /><span className="relative size-2 rounded-full bg-[#49b56d]" /></span>
            <span className="page-fg-border border-b pb-0.5">Available for Work</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProjectsPanel() {
  return (
    <section id="work" className="py-5 sm:py-8">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.7 }} className="project-panel group relative isolate overflow-hidden rounded-xl bg-[#101010] px-3 pb-3 pt-14 text-[#f5f5f2] sm:px-5 sm:pb-5 sm:pt-20 lg:px-12 lg:pb-6">
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-4 py-3 font-mono text-[9px] uppercase tracking-[.02em] text-white/45 sm:px-5 lg:px-6">
          <span>Selected work</span><span>Scroll to explore</span>
        </div>
        <div className="relative mx-auto max-w-5xl">
          <div className="grid grid-cols-2 overflow-hidden border border-white/15 bg-[#090909] sm:grid-cols-3">
            {projectFrames.map((project, index) => (
              index === projectFrames.length - 1 ? <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 62, rotate: -2.5, scale: .96 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                whileHover={{ y: -6, boxShadow: '0 22px 45px rgba(0,0,0,.38)' }}
                viewport={{ once: true, amount: .55 }}
                transition={{ duration: .72, delay: index * .055, ease: [0.22, 1, 0.36, 1] }}
                className="project-frame relative aspect-[1.55/1] overflow-hidden border-b border-r border-white/15"
              ><TerminalWidget /></motion.div> : <TiltProjectCard
                href="#contact"
                key={project.name}
                className="project-frame group/frame relative aspect-[1.55/1] overflow-hidden border-b border-r border-white/15"
                delay={index * .055}
                entranceRotate={index % 2 === 0 ? 2.5 : -2.5}
              />
            ))}
          </div>
        </div>
        <div className="relative mt-12 min-h-[128px] border-t border-white/20 pt-3 sm:mt-16 sm:min-h-[148px]">
          <span className="absolute left-0 top-3 font-mono text-[9px] uppercase text-white/45">Magomed © 2026</span>
          <span className="absolute right-0 top-3 font-mono text-[9px] uppercase text-white/45">Surgut / Remote</span>
          <div className="pointer-events-none absolute inset-x-[12%] bottom-[-1px] h-[122px] opacity-60 sm:h-[148px]">
            <TextHoverEffect text="MAGOMED" />
          </div>
          <nav className="relative z-10 flex flex-col items-center pt-10 text-center text-[clamp(1.65rem,4vw,3.65rem)] font-semibold leading-[.76] tracking-[-.085em] sm:pt-12">
            <a href="#work" className="transition hover:text-white/40">WORK</a>
            <a href="#stack" className="text-white/35 transition hover:text-white">STACK</a>
            <a href="#contact" className="text-white/20 transition hover:text-white">CONTACT</a>
          </nav>
        </div>
      </motion.div>
    </section>
  )
}

function Highlights() {
  return (
    <section id="stack" className="py-24 sm:py-36">
      <div className="page-line grid gap-8 border-t pt-4 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <div>
          <p className="page-muted font-mono text-[10px] uppercase">Elements</p>
          <h2 className="mt-5 max-w-sm text-3xl font-semibold leading-[.94] tracking-[-.07em] sm:text-5xl">See the highlights of my skill.</h2>
        </div>
        <motion.article initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.65 }} className="skill-card relative min-h-[350px] overflow-hidden rounded-xl p-5 sm:min-h-[460px] sm:p-7">
          <div className="skill-muted flex items-start justify-between font-mono text-[10px] uppercase"><span>01 / Engineering</span><ArrowDownRight size={16} /></div>
          <div className="absolute inset-x-5 bottom-5 sm:inset-x-7 sm:bottom-7">
            <p className="display-type text-[clamp(3.6rem,8.2vw,7.8rem)] leading-[.75] tracking-[-.085em]">FAST &amp;<br /><span className="skill-accent">SCALABLE</span></p>
            <div className="skill-line mt-8 flex items-center justify-between border-t pt-3 text-[10px] font-semibold uppercase tracking-[.02em]"><motion.span whileHover={{ y: -3, backgroundColor: 'rgba(73,181,109,.18)' }} transition={{ duration: .16 }} className="inline-block rounded px-1.5 py-1">Next</motion.span><span>→</span></div>
          </div>
        </motion.article>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer id="contact" className="page-line border-t py-5 sm:py-7">
      <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
        <div><p className="page-muted font-mono text-[10px] uppercase">Have a sharp idea?</p><div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6"><motion.a href="mailto:hello@magomed.dev" whileHover={{ scale: 1.05 }} className="inline-block text-2xl font-semibold tracking-[-.07em] underline decoration-1 underline-offset-4 transition hover:opacity-55 sm:text-3xl">Let’s make it real.</motion.a><QuickContactModal /></div></div>
        <div className="flex gap-4">{[
          { icon: InstagramIcon, label: 'Instagram', href: 'https://instagram.com/m.bronson74' },
          { icon: Send, label: 'Telegram', href: 'https://t.me/mbronsonx' },
          { icon: AtSign, label: 'Email', href: 'mailto:hello@magomed.dev' },
        ].map(({ icon: Icon, label, href }) => <motion.a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} aria-label={label} whileHover={{ scale: 1.05 }} whileTap={{ scale: .96 }} className="social-link grid size-9 place-items-center rounded-full border transition"><Icon size={15} /></motion.a>)}</div>
      </div>
    </footer>
  )
}

function SectionReveal({ children }: { children: React.ReactNode }) {
  return <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .15 }} variants={sectionReveal} transition={{ duration: .65, ease: 'easeOut' }}>{children}</motion.div>
}
