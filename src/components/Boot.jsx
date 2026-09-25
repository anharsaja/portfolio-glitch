import { useEffect, useRef, useState } from 'react'

const LINES = [
  '> booting portfolio.sys ...',
  '> loading modules [ project | experience | visi ]',
  '> injecting glitch.dll ......... OK',
  '> kopi level ................... CUKUP',
  '> status ....................... SIAP TEPAR',
]

export default function Boot({ onDone }) {
  const [text, setText] = useState('')
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const finished = useRef(false)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timers = []

    const finish = () => {
      if (finished.current) return
      finished.current = true
      setProgress(100)
      setHidden(true)
      timers.push(setTimeout(onDone, 480))
    }

    if (reduce) {
      setText(LINES.join('\n'))
      finish()
      return () => timers.forEach(clearTimeout)
    }

    let line = 0
    let char = 0
    let shown = ''

    const type = () => {
      if (line >= LINES.length) {
        timers.push(setTimeout(finish, 420))
        return
      }
      const current = LINES[line]
      if (char <= current.length) {
        setText(shown + current.slice(0, char))
        setProgress(Math.round(((line + char / current.length) / LINES.length) * 100))
        char++
        timers.push(setTimeout(type, 14))
      } else {
        shown += current + '\n'
        line++
        char = 0
        timers.push(setTimeout(type, 120))
      }
    }

    timers.push(setTimeout(type, 260))

    const skip = () => finish()
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
    }
  }, [onDone])

  return (
    <div className={`boot${hidden ? ' is-done' : ''}`} aria-hidden={hidden}>
      <div>
        <pre className="boot__log">{text}</pre>
        <div className="boot__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="boot__hint">TEKAN APA SAJA UNTUK MELEWATI</div>
      </div>
    </div>
  )
}
