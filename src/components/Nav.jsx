import { useEffect, useState } from 'react'

const LINKS = [
  { id: 'projects', no: '01', label: 'PROJECT' },
  { id: 'experience', no: '02', label: 'EXPERIENCE' },
  { id: 'vision', no: '03', label: 'VISI & MISI' },
  { id: 'contact', no: '04', label: 'CONTACT' },
]

export default function Nav({ brand }) {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [clock, setClock] = useState('--:--:--')

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('id-ID', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav${stuck ? ' is-stuck' : ''}`}>
      <a className="nav__brand glitch" href="#hero" data-text={brand}>
        {brand}
      </a>

      <nav className={`nav__links${open ? ' is-open' : ''}`}>
        {LINKS.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={active === l.id ? 'is-active' : undefined}
            onClick={() => setOpen(false)}
          >
            <i>{l.no}</i>
            {l.label}
          </a>
        ))}
      </nav>

      <div className="nav__status">
        <span className="dot" />
        <span>{clock}</span>
      </div>

      <button
        className={`nav__toggle${open ? ' is-open' : ''}`}
        aria-label={open ? 'Tutup menu' : 'Buka menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </header>
  )
}
