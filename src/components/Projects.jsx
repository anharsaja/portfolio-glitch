import { useMemo, useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import { projects } from '../data.js'

export default function Projects() {
  const [filter, setFilter] = useState('ALL')

  const categories = useMemo(
    () => ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))],
    []
  )

  const list = useMemo(
    () => (filter === 'ALL' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  )

  useReveal([filter])

  return (
    <section className="sec" id="projects">
      <div className="wrap">
        <header className="sec__head reveal">
          <span className="sec__num">01</span>
          <h2 className="sec__title glitch" data-text="PROJECT SHOWCASE">
            PROJECT SHOWCASE
          </h2>
          <p className="sec__sub">
            Things I have built, broken, and fixed again.
          </p>
        </header>

        <div className="filters reveal">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip${filter === c ? ' is-on' : ''}`}
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="cards">
          {list.map((p, i) => (
            <article
              className="card reveal"
              key={p.title}
              style={{ transitionDelay: `${Math.min(i, 5) * 70}ms` }}
            >
              <div className="card__top">
                <span className="card__idx">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  {p.category} · {p.year}
                </span>
              </div>

              <h3 className="card__title glitch" data-text={p.title}>
                {p.title}
              </h3>

              <p className="card__blurb">{p.blurb}</p>

              <div className="card__tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              {(p.live || p.repo) && (
                <div className="card__links">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer noopener">
                      LIVE
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer noopener">
                      CODE
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
