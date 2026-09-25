export default function Contact({ onOpen }) {
  return (
    <section className="sec sec--alt" id="contact">
      <div className="wrap">
        <header className="sec__head reveal">
          <span className="sec__num">04</span>
          <h2 className="sec__title glitch" data-text="CONTACT">
            CONTACT
          </h2>
          <p className="sec__sub">Got an idea, a project, or just want to chat? Send a signal.</p>
        </header>

        <div className="contact__box reveal">
          <p className="contact__line glitch glitch--lg" data-text="LET'S TALK">
            LET&apos;S TALK
          </p>
          <p className="contact__note">
            No long forms needed. Hit the button below and pick whichever channel suits
            you best.
          </p>
          <button className="btn btn--primary" onClick={onOpen}>
            CONTACT ME
          </button>
        </div>
      </div>
    </section>
  )
}
