"use client"

let context: AudioContext | undefined
const mutedStorageKey = 'magomed-sound-muted'

function getContext() {
  if (typeof window === 'undefined') return undefined
  context ??= new AudioContext()
  if (context.state === 'suspended') void context.resume()
  return context
}

function isMuted() {
  return typeof window !== 'undefined' && localStorage.getItem(mutedStorageKey) === 'true'
}

function tone(frequency: number, duration: number, volume: number, type: OscillatorType = 'sine', endFrequency?: number) {
  if (isMuted()) return
  const audio = getContext()
  if (!audio) return

  const oscillator = audio.createOscillator()
  const gain = audio.createGain()
  const now = audio.currentTime

  oscillator.type = type
  oscillator.frequency.setValueAtTime(frequency, now)
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration)
  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  oscillator.connect(gain)
  gain.connect(audio.destination)
  oscillator.start(now)
  oscillator.stop(now + duration + 0.01)
}

export function playClick() {
  tone(480, 0.045, 0.018, 'sine', 300)
}

export function playToggle() {
  tone(330, 0.055, 0.02, 'sine', 520)
  window.setTimeout(() => tone(520, 0.05, 0.014, 'sine', 690), 38)
}

export function playKeypress() {
  tone(920, 0.018, 0.008, 'square', 720)
}

export function getSoundMuted() {
  return isMuted()
}

export function setSoundMuted(muted: boolean) {
  if (typeof window !== 'undefined') localStorage.setItem(mutedStorageKey, String(muted))
}
