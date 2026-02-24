import "../styles/landing.css";

export default function Landing() {
  return (
    <div className="landing">
        <div className="landing__inner">
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__eyebrow">Available for frontend + UI polish projects</div>
          <h1 className="hero__title">Lori Jones</h1>          
          <p className="hero__subtitle">
            Structured, reliable frontend work with a QA mindset — responsive sites,
            dashboards, and UI fixes that hold up in production.
          </p>

          <div className="hero__actions">
            <a className="btn" href="/dashboard/portfolio">View Dashboard Suite</a>
            <a className="btn btn--ghost" href="https://github.com/justjones" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="btn btn--ghost" href="https://www.linkedin.com/in/lori-jonessqa/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>

          <div className="hero__meta">
            <span className="pill">HTML/CSS</span>
            <span className="pill">React</span>
            <span className="pill">Responsive UI</span>
            <span className="pill">UI Fixes</span>
            <span className="pill">Dashboards</span>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">What I can help with</h2>
        <div className="cards3">
          <div className="card">
            <h3 className="card__title">UI Fixes & Responsiveness</h3>
            <p className="card__text">Layout issues, header/footer fixes, mobile polish, cross-browser checks.</p>
          </div>
          <div className="card">
            <h3 className="card__title">Portfolio & Business Sites</h3>
            <p className="card__text">Fast, clean sites with modern styling and easy-to-update structure.</p>
          </div>
          <div className="card">
            <h3 className="card__title">Dashboards & Internal Tools</h3>
            <p className="card__text">Sortable tables, filters/search, theming, skeleton loading, lightweight charts.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">Proof of work</h2>
        <p className="muted">
          Browse the live dashboard suite to see component architecture, tables, theming, and charts.
        </p>
        <div className="proof__actions">
          <a className="btn" href="/dashboard/qa">QA Dashboard</a>
          <a className="btn btn--ghost" href="/dashboard/admin">Admin Dashboard</a>
          <a className="btn btn--ghost" href="/dashboard/portfolio">Portfolio Dashboard</a>
        </div>
      </section>
      </div>
    </div>
  );
}