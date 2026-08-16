export type ProjectCategory = 'All' | 'Web Sites' | 'Full-stack Apps' | 'Mini Apps / Telegram' | 'Open Source'

export type Project = {
  id: string
  title: string
  number: string
  category: Exclude<ProjectCategory, 'All'>
  status: 'Live' | 'In Dev' | 'Case Study'
  description: string
  tags: string[]
  accent: 'cyan' | 'violet' | 'acid'
  size: 'wide' | 'tall' | 'standard'
}

export const categories: ProjectCategory[] = ['All', 'Web Sites', 'Full-stack Apps', 'Mini Apps / Telegram', 'Open Source']

export const projects: Project[] = [
  { id: 'northstar', number: '01', title: 'Northstar', category: 'Full-stack Apps', status: 'Live', description: 'Платформа управления продуктовой командой с аналитикой в реальном времени.', tags: ['Next.js', 'PostgreSQL', 'tRPC'], accent: 'cyan', size: 'wide' },
  { id: 'tempo', number: '02', title: 'Tempo', category: 'Web Sites', status: 'Case Study', description: 'Цифровой дом для независимого архитектурного бюро.', tags: ['React', 'GSAP', 'Sanity'], accent: 'violet', size: 'tall' },
  { id: 'mochi', number: '03', title: 'Mochi', category: 'Mini Apps / Telegram', status: 'Live', description: 'Лояльность и быстрые заказы прямо внутри Telegram.', tags: ['TMA', 'Node.js', 'Prisma'], accent: 'acid', size: 'standard' },
  { id: 'terminal', number: '04', title: 'Terminal UI', category: 'Open Source', status: 'Live', description: 'Коллекция доступных компонентов для следующего интерфейса.', tags: ['TypeScript', 'Radix UI'], accent: 'cyan', size: 'standard' },
  { id: 'index', number: '05', title: 'Index / 24', category: 'Web Sites', status: 'In Dev', description: 'Редакционный e-commerce для вещей с историей.', tags: ['Next.js', 'Stripe', 'Framer'], accent: 'violet', size: 'wide' },
]
