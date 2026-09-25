import { experience } from '../data.js'

function Points({ items }) {
  if (!items?.length) return null
  return (
    <ul className="tl__points">
      {items.map((p) => (
        <li key={p}>{p}</li>
      ))}
    </ul>
  )
}

export default function Experience() {
  return (
    <section className="sec sec--alt" id="experience">
      <div className="wrap">
        <header className="sec__head reveal">
          <span className="sec__num">02</span>
          <h2 className="sec__title glitch" data-text="EXPERIENCE">
            EXPERIENCE
          </h2>
          <p className="sec__sub">Where I have worked, kept short.</p>
        </header>

        <ol className="timeline">
          {experience.map((e, i) => (
            <li
              className="tl reveal"
              key={`${e.company}-${e.period}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="tl__period">
                {e.period}
                {e.type && <span className="tl__type">{e.type}</span>}
              </div>

              {e.roles?.length ? (
                // beberapa posisi di satu perusahaan (gaya LinkedIn)
                <>
                  <h3 className="tl__role">{e.company}</h3>
                  <div className="tl__co">{e.roles.length} positions</div>
                  <ol className="tl__roles">
                    {e.roles.map((r) => (
                      <li className="tl__sub" key={`${r.role}-${r.period}`}>
                        <h4 className="tl__subrole">{r.role}</h4>
                        {r.period && <div className="tl__subperiod">{r.period}</div>}
                        {r.desc && <p className="tl__desc">{r.desc}</p>}
                        <Points items={r.points} />
                      </li>
                    ))}
                  </ol>
                </>
              ) : (
                <>
                  <h3 className="tl__role">{e.role}</h3>
                  <div className="tl__co">@ {e.company}</div>
                  {e.desc && <p className="tl__desc">{e.desc}</p>}
                  <Points items={e.points} />
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
