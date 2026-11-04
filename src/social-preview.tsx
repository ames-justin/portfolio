// Development-only artwork page, captured as public/social-preview.jpg.
// Vite's production entry remains index.html.
import { useRef } from 'react'
import { createRoot } from 'react-dom/client'
import TurbofanScene from './components/engine/TurbofanScene'
import type { EngineMotion } from './components/engine/engineDynamics'
import './social-preview.css'

function SharingArtwork() {
  const motion = useRef<EngineMotion>({ progress: 0, throttle: 0, speed: 0, lastInputAt: 0 })
  return <main className="sharing-artwork">
    <header>
      <img src="/favicon.svg" width="48" height="48" alt="Justin Ames monogram" />
      <span>ENGINEERING PORTFOLIO</span>
    </header>
    <h1>Justin Ames <span>| Mechanical Engineering</span></h1>
    <div className="sharing-engine"><TurbofanScene motion={motion} visible={true} cameraScale={0.72} onUnavailable={() => {}} /></div>
    <footer><span>DESIGN WITH INTENT.</span><span>CAD / ANALYSIS / MANUFACTURING</span></footer>
  </main>
}

createRoot(document.getElementById('root')!).render(<SharingArtwork />)
