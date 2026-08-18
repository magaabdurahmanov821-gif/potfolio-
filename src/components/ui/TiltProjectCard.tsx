import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type TiltProjectCardProps = {
  href: string
  className: string
  delay: number
  entranceRotate: number
}

export function TiltProjectCard({ href, className, delay, entranceRotate }: TiltProjectCardProps) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const rotateX = useSpring(useTransform(pointerY, [-.5, .5], [6, -6]), { stiffness: 190, damping: 19 })
  const rotateY = useSpring(useTransform(pointerX, [-.5, .5], [-6, 6]), { stiffness: 190, damping: 19 })

  return (
    <motion.a
      href={href}
      initial={{ opacity: 0, y: 62, rotate: entranceRotate, scale: .96 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
      whileHover={{ y: -8, scale: 1.02, boxShadow: '0 22px 45px rgba(0,0,0,.38)' }}
      viewport={{ once: true, amount: .55 }}
      transition={{ duration: .72, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={event => {
        const rect = event.currentTarget.getBoundingClientRect()
        pointerX.set((event.clientX - rect.left) / rect.width - .5)
        pointerY.set((event.clientY - rect.top) / rect.height - .5)
      }}
      onPointerLeave={() => { pointerX.set(0); pointerY.set(0) }}
      className={className}
    />
  )
}
