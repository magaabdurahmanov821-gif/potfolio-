import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import type { Project } from '../../data/projects'
import { ProjectPreview } from './ProjectPreview'

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return <AnimatePresence>{project && (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose} className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, y: 25, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 15, scale: .97 }} onMouseDown={event => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`Кейс ${project.title}`} className="glass relative w-full max-w-4xl overflow-hidden rounded-3xl border-white/15">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 grid size-9 place-items-center rounded-full border border-white/10 bg-black/30 text-white transition hover:bg-white hover:text-black" aria-label="Закрыть"><X size={17} /></button>
        <div className="grid md:grid-cols-[1.2fr_.8fr]"><div className="min-h-72 md:min-h-[430px]"><ProjectPreview project={project} /></div><div className="flex flex-col p-7 md:p-9"><span className="mono text-[10px] tracking-[.2em] text-cyan">CASE STUDY / {project.number}</span><h2 className="mt-4 text-4xl font-extrabold tracking-[-.07em] text-white">{project.title}</h2><p className="mt-4 text-sm leading-relaxed text-zinc-400">{project.description} Демо-кейс показывает структуру продукта, ключевое техническое решение и ориентированность на безупречный пользовательский путь.</p><div className="mt-7 border-y border-white/10 py-5"><p className="mono text-[9px] tracking-widest text-zinc-600">STACK</p><div className="mt-3 flex flex-wrap gap-2">{project.tags.map(tag => <span key={tag} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-zinc-300">{tag}</span>)}</div></div><a href="#contact" onClick={onClose} className="mt-auto inline-flex items-center justify-between border-b border-white/20 py-4 text-sm font-bold text-white transition hover:border-cyan hover:text-cyan">Нужен похожий проект <ArrowUpRight size={16} /></a></div></div>
      </motion.div>
    </motion.div>
  )}</AnimatePresence>
}
