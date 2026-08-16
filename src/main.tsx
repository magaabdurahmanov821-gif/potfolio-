import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import { App } from './App'
import { SmoothScrollProvider } from './components/providers/smooth-scroll'
import { MusicPlayer } from './components/ui/music-player'

createRoot(document.getElementById('root')!).render(
  <StrictMode><SmoothScrollProvider><App /><MusicPlayer /></SmoothScrollProvider></StrictMode>,
)
