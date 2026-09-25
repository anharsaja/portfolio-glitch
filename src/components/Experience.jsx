import { experience } from '../data.js'

export default function Experience() {
  return (
    <section className="sec sec--alt" id="experience">
      <div className="wrap">
        <header className="sec__head reveal">
          <span className="sec__num">02</span>
          <h2 className="sec__title glitch" data-text="EXPERIENCE">
            EXPERIENCE
          </h2>
          <p className="sec__sub">Jejak kerja — singkat, padat, tanpa bumbu.</p>
        </header>

        <ol className="timeline">
          {experience.map((e, i) => (
            <li
              className="tl reveal"
              key={`${e.company}-${e.period}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="tl__period">{e.period}</div>
              <h3 className="tl__role">{e.role}</h3>
              <div className="tl__co">@ {e.company}</div>
              <ul className="tl__points">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
