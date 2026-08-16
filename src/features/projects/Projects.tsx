import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { categories, projects, type Project, type ProjectCategory } from '../../data/projects'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const visibleProjects = activeCategory === 'All' ? projects : projects.filter(project => project.category === activeCategory)

  return (
    <section id="projects" className="section-wrap scroll-mt-20 pb-28 pt-12 md:pb-40 md:pt-20">
      <div className="mb-10 flex flex-col justify-between gap-7 border-b border-white/10 pb-7 md:mb-12 md:flex-row md:items-end">
        <div><p className="mono text-[10px] uppercase tracking-[.18em] text-cyan">Selected work — 2023 / 26</p><h2 className="mt-3 text-4xl font-extrabold tracking-[-.07em] text-white md:text-6xl">Проекты, <span className="text-zinc-600">которыми</span><br />я горжусь.</h2></div>
        <p className="max-w-[260px] text-xs leading-relaxed text-zinc-500">От первого прототипа до масштабируемого продукта — без компромиссов в деталях.</p>
      </div>
      <div className="mb-7 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none]">
        {categories.map(category => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-3 py-2 text-[11px] font-bold transition ${activeCategory === category ? 'border-cyan bg-cyan text-ink' : 'border-white/10 bg-white/[.025] text-zinc-500 hover:border-white/30 hover:text-white'}`}>{category}</button>)}
      </div>
      <div className="grid auto-rows-[330px] gap-3 md:grid-cols-3 md:gap-4">
        <AnimatePresence mode="popLayout">{visibleProjects.map(project => <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} />)}</AnimatePresence>
      </div>
      <a href="#contact" className="group mt-6 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.025] p-5 transition hover:border-cyan/40 hover:bg-cyan/[.04] md:p-7"><span className="text-lg font-bold tracking-[-.04em] text-zinc-300">У вас есть идея? Давайте превратим её в продукт.</span><span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/10 text-cyan transition group-hover:translate-y-1"><ArrowDown size={17} /></span></a>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
