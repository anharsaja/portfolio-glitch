import { useCallback, useEffect, useState } from 'react'
import Boot from './components/Boot.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Ticker from './components/Ticker.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Vision from './components/Vision.jsx'
import Contact from './components/Contact.jsx'
import SocialModal from './components/SocialModal.jsx'
import Footer from './components/Footer.jsx'
import useReveal from './hooks/useReveal.js'
import { profile } from './data.js'

export default function App() {
  const [booted, setBooted] = useState(false)
  const [modal, setModal] = useState(false)

  const handleBooted = useCallback(() => setBooted(true), [])
  const openModal = useCallback(() => setModal(true), [])
  const closeModal = useCallback(() => setModal(false), [])

  useReveal([booted])

  // sentakan glitch acak di seluruh halaman
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let burst
    let next

    const loop = () => {
      next = setTimeout(() => {
        document.body.classList.add('glitch-burst')
        burst = setTimeout(() => document.body.classList.remove('glitch-burst'), 340)
        loop()
      }, 5000 + Math.random() * 9000)
    }

    loop()
    return () => {
      clearTimeout(next)
      clearTimeout(burst)
      document.body.classList.remove('glitch-burst')
    }
  }, [])

  const brand = `//${profile.name.split(' ')[0].toUpperCase()}`

  return (
    <>
      {!booted && <Boot onDone={handleBooted} />}

      <div className="fx fx--scanlines" aria-hidden="true" />
      <div className="fx fx--noise" aria-hidden="true" />
      <div className="fx fx--vignette" aria-hidden="true" />
      <div className="fx fx--bar" aria-hidden="true" />

      <Nav brand={brand} />

      <main>
        <Hero onContact={openModal} />
        <Ticker />
        <Projects />
        <Experience />
        <Vision />
        <Contact onOpen={openModal} />
      </main>

      <Footer />

      <SocialModal open={modal} onClose={closeModal} />
    </>
  )
}
