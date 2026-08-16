import { motion } from 'framer-motion'
import { ArrowUpRight, GitFork } from 'lucide-react'
import type { Project } from '../../data/projects'
import { ProjectPreview } from './ProjectPreview'

const classes = { wide: 'md:col-span-2', tall: 'md:row-span-2', standard: '' }
const accents = { cyan: 'border-cyan/20 group-hover:border-cyan/60', violet: 'border-violet/20 group-hover:border-violet/60', acid: 'border-acid/20 group-hover:border-acid/60' }

export function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  return (
    <motion.article layout initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .35 }} className={`group relative min-h-[330px] overflow-hidden rounded-2xl border bg-[#111114] transition-colors ${classes[project.size]} ${accents[project.accent]}`}>
      <div className="absolute inset-x-0 top-0 h-[55%] overflow-hidden border-b border-white/[.08] transition duration-500 group-hover:h-[58%]"><ProjectPreview project={project} /><div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent opacity-70" /></div>
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between"><span className="mono text-[10px] tracking-wider text-zinc-600">{project.number} / 05</span><span className="rounded-full border border-white/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-zinc-400">{project.status}</span></div>
        <h3 className="text-2xl font-extrabold tracking-[-.05em] text-white">{project.title}</h3>
        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-zinc-500">{project.description}</p>
        <div className="mt-5 flex items-end justify-between gap-3"><div className="flex flex-wrap gap-1.5">{project.tags.map(tag => <span key={tag} className="mono rounded bg-white/[.06] px-1.5 py-1 text-[9px] text-zinc-400">{tag}</span>)}</div><div className="flex gap-1"><button className="grid size-8 place-items-center rounded-lg border border-white/10 text-zinc-400 hover:text-white" aria-label="GitHub"><GitFork size={14} /></button><button onClick={() => onOpen(project)} className="grid size-8 place-items-center rounded-lg bg-white text-ink transition group-hover:bg-cyan" aria-label={`Открыть ${project.title}`}><ArrowUpRight size={15} /></button></div></div>
      </div>
    </motion.article>
  )
}
