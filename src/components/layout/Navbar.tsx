import { ArrowUpRight, Menu } from 'lucide-react'

const links = [
  { label: 'Проекты', href: '#projects' },
  { label: 'Обо мне', href: '#about' },
  { label: 'Контакты', href: '#contact' },
]

export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4 md:top-6 md:px-8">
      <nav className="glass mx-auto flex h-14 max-w-[1360px] items-center justify-between rounded-2xl px-3.5 shadow-[0_12px_44px_rgba(0,0,0,.28)] md:px-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="На главную">
          <span className="grid size-7 place-items-center rounded-lg bg-cyan text-sm font-extrabold text-ink">M</span>
          <span className="mono text-xs font-medium tracking-[-.04em] text-white">MAGOMED<span className="text-cyan">.DEV</span></span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => <a className="text-xs font-semibold text-zinc-400 transition-colors hover:text-white" href={link.href} key={link.label}>{link.label}</a>)}
        </div>
        <a href="#contact" className="hidden items-center gap-1.5 rounded-lg border border-white/15 bg-white/[.06] px-3 py-2 text-xs font-bold text-white transition hover:border-cyan/60 hover:bg-cyan hover:text-ink sm:flex">
          Начать проект <ArrowUpRight size={14} />
        </a>
        <button className="grid size-9 place-items-center rounded-lg text-white md:hidden" aria-label="Открыть меню"><Menu size={20} /></button>
      </nav>
    </header>
  )
}
