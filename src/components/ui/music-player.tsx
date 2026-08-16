"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Pause, Play } from 'lucide-react'

const trackUrl = '/dream-sweet-in-sea-major.m4a'

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.25
  }, [])

  const togglePlayback = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setIsPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <div className="music-player fixed bottom-4 left-4 z-50 flex origin-bottom-left scale-90 items-center gap-3 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-white shadow-2xl backdrop-blur-md md:bottom-6 md:left-6 md:scale-100">
      <audio ref={audioRef} src={trackUrl} loop preload="none" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
      <button type="button" onClick={togglePlayback} data-sound="custom" className="grid size-7 place-items-center rounded-full bg-white text-black transition-transform hover:scale-105" aria-label={isPlaying ? 'Pause Lo-Fi Beats' : 'Play Lo-Fi Beats'}>
        {isPlaying ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" className="translate-x-px" />}
      </button>
      <div className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
        {[0, 1, 2].map((bar) => <motion.i key={bar} className="block h-3.5 w-[2px] origin-bottom rounded-full bg-[#9cf7ad]" animate={isPlaying ? { scaleY: [0.35, 1, 0.5, 0.8, 0.35] } : { scaleY: 0.35 }} transition={{ duration: 0.8 + bar * 0.16, repeat: isPlaying ? Infinity : 0, ease: 'easeInOut', delay: bar * 0.08 }} />)}
      </div>
      <span className="pr-0.5 font-mono text-[10px] font-medium tracking-[-.03em]">Lo-Fi Beats</span>
    </div>
  )
}
