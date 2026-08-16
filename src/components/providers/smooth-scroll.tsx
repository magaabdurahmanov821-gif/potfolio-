"use client"

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import { playClick } from '../../lib/sound'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({ duration: 1.2, smoothWheel: true })
    let frameId = 0

    const raf = (time: number) => {
      lenis.raf(time)
      frameId = requestAnimationFrame(raf)
    }

    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      const interactive = target.closest('a, button')
      if (interactive && interactive.getAttribute('data-sound') !== 'custom') playClick()
    }

    frameId = requestAnimationFrame(raf)
    document.addEventListener('click', handleDocumentClick)

    return () => {
      cancelAnimationFrame(frameId)
      document.removeEventListener('click', handleDocumentClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
