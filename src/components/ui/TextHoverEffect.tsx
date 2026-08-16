import { useState } from 'react'
import { cn } from '../../lib/utils'

type TextHoverEffectProps = {
  text: string
  className?: string
}

export function TextHoverEffect({ text, className }: TextHoverEffectProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <svg viewBox="0 0 1000 180" className={cn('size-full overflow-visible', className)} role="img" aria-label={text} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <text x="500" y="145" textAnchor="middle" className="text-hover-stroke" style={{ fill: hovered ? '#f5f5f2' : 'transparent', stroke: hovered ? '#f5f5f2' : 'rgba(245,245,242,.55)' }}>{text}</text>
    </svg>
  )
}
