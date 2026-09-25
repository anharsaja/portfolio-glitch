import { vision } from '../data.js'

export default function Vision() {
  return (
    <section className="sec" id="vision">
      <div className="wrap">
        <header className="sec__head reveal">
          <span className="sec__num">03</span>
          <h2 className="sec__title glitch" data-text="VISION">
            VISION
          </h2>
          <p className="sec__sub">The line that keeps me at the keyboard.</p>
        </header>

        <blockquote className="manifesto reveal">
          <p className="manifesto__label">MOTTO</p>
          <p className="manifesto__main glitch glitch--lg" data-text={vision.main}>
            {vision.main}
          </p>
          <p className="manifesto__sub glitch" data-text={`« ${vision.sub} »`}>
            « {vision.sub} »
          </p>
        </blockquote>
      </div>
    </section>
  )
}
