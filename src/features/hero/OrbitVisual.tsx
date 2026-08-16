import { motion } from 'framer-motion'
import { Braces, Cuboid, Zap } from 'lucide-react'

export function OrbitVisual() {
  return (
    <div className="relative grid size-[330px] place-items-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, ease: 'linear', repeat: Infinity }} className="absolute inset-3 rounded-full border border-dashed border-cyan/25" />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 13, ease: 'linear', repeat: Infinity }} className="absolute inset-11 rounded-full border border-violet/30" />
      <motion.div animate={{ y: [-7, 7, -7], rotate: [-4, 4, -4] }} transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }} className="glass relative grid size-36 place-items-center rounded-[2rem] shadow-[0_0_70px_rgba(94,234,212,.15)]">
        <Cuboid size={45} strokeWidth={1.2} className="text-cyan" />
        <span className="mono absolute -bottom-7 whitespace-nowrap text-[9px] tracking-[.17em] text-zinc-500">BUILD / SHIP / ITERATE</span>
      </motion.div>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, ease: 'linear', repeat: Infinity }} className="absolute inset-3"><span className="absolute left-6 top-6 grid size-9 place-items-center rounded-lg border border-violet/30 bg-violet/15 text-violet"><Braces size={17} /></span></motion.div>
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 13, ease: 'linear', repeat: Infinity }} className="absolute inset-11"><span className="absolute -right-4 bottom-12 grid size-9 place-items-center rounded-lg border border-cyan/30 bg-cyan/15 text-cyan"><Zap size={17} /></span></motion.div>
    </div>
  )
}
