/**
 * TN Advisory web mockup — Institutional White Space direction.
 * Use navy for institutional authority, champagne gold for decisive emphasis,
 * and asymmetric editorial layouts to keep the site executive rather than generic.
 */
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

const heroImage = "/manus-storage/tn_advisory_web_hero_b49c3a3a.jpg";
const detailImage = "/manus-storage/tn_advisory_web_detail_112e7e6c.jpg";
const mark = "/manus-storage/tn_advisory_web_mark_60921cbc.png";
const fullLogo = "/tn_advisory_highres_logo.png";

const capabilities = [
  { number: "01", title: "Technology & software", text: "Designing the digital, data and systems capability required to make strategic change executable." },
  { number: "02", title: "Trade & market access", text: "Connecting policy, compliance, export readiness and cross-border operating confidence." },
  { number: "03", title: "Transformation", text: "Turning institutional ambition into sequenced operating models, governance and delivery." },
  { number: "04", title: "Development finance", text: "Structuring priorities, partnerships and funding narratives around inclusive growth." },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#102b50] selection:bg-[#c8a15a]/30">
      <header className="site-header">
        <div className="container-wide header-inner">
          <a href="#top" className="brand-link" aria-label="TN Advisory home">
            <img src={fullLogo} alt="TN Advisory" className="full-logo" />
          </a>
          <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={open ? "main-nav open" : "main-nav"}>
            <a href="#approach" onClick={() => setOpen(false)}>Approach</a>
            <a href="#capabilities" onClick={() => setOpen(false)}>Capabilities</a>
            <a href="#profile" onClick={() => setOpen(false)}>Profile</a>
            <a href="#selected-work" onClick={() => setOpen(false)}>Projects</a>
            <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>Start a conversation <ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(251,250,246,1) 0%, rgba(251,250,246,.98) 42%, rgba(251,250,246,.78) 67%, rgba(251,250,246,.34) 100%), url(${heroImage})` }}>
          <div className="container-wide hero-content">
            <div className="hero-copy-column">
              <div className="hero-kicker"><span className="gold-line" /> Technology-led strategy</div>
              <h1>Make complex<br /><em>change executable.</em></h1>
              <p className="hero-copy">TN Advisory brings trade, technology and strategy into one frame—helping decision-makers move from strategic intent to practical, investable action.</p>
              <div className="hero-actions"><a className="button button-gold" href="#approach">Explore the approach <ArrowUpRight size={17} /></a><a className="text-link" href="#profile">Read the profile <ChevronDown size={16} /></a></div>
            </div>
            <figure className="hero-evidence hero-evidence-bridge"><figcaption><span>Selected lens</span><strong>Trade &amp; technology</strong><small>Making systems legible. Making decisions executable.</small></figcaption></figure>
          </div>
          <div className="hero-index">01 <span>/</span> 04</div>
        </section>

        <section id="approach" className="section approach-section">
          <div className="container-wide split-grid">
            <div className="section-label">01 / The proposition</div>
            <div>
              <h2>A strategic partner at the intersection of trade, technology and execution.</h2>
              <p className="large-copy">The opportunity is rarely a lack of ambition. More often, strategy, capital, technology and execution are being managed as separate conversations.</p>
              <div className="gold-rule" />
              <p className="body-copy">TN Advisory brings those decisions into one frame. The work is practical by design: clarify the choices, structure the opportunity, and establish the systems and accountability to move forward.</p>
              <a className="text-link" href="#capabilities">See how the practice connects the dots <ArrowUpRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="capabilities" className="section capability-section">
          <div className="container-wide">
            <div className="practice-intro"><div className="section-label">02 / The practice</div><div><h2>Trade &amp; technology.<br /><em>Made executable.</em></h2><p className="practice-deck">A connected practice for leaders navigating markets, systems and change.</p></div></div>
            <div className="capability-grid">{capabilities.map((item) => <article key={item.number} className="capability-card"><div className="cap-number">{item.number}</div><div><h3>{item.title}</h3><p>{item.text}</p></div><ArrowUpRight className="cap-arrow" size={18} /></article>)}</div>
          </div>
        </section>

        <section id="profile" className="section profile-section">
          <div className="container-wide profile-grid">
            <div className="profile-image-wrap profile-image-blend"><img src={detailImage} alt="Advisory desk with technology and trade materials" className="profile-image" /><div className="image-caption">Technology, policy and capital in conversation.</div></div>
            <div className="profile-copy"><div className="section-label">03 / The advisory practice</div><h2>Grounded in systems.<br /><em>Built for outcomes.</em></h2><p className="large-copy">The practice works across trade finance, digital transformation and development finance, combining computer-science discipline with practical experience in policy, customs systems and software-enabled operating models.</p><div className="profile-facts"><div><span>Based in</span><strong>Nairobi · Cape Town</strong></div><div><span>Focus</span><strong>Africa · Cross-border</strong></div><div><span>Practice</span><strong>Advisory · Software</strong></div></div><a className="text-link" href="#contact">Open an executive conversation <ArrowUpRight size={16} /></a></div>
          </div>
        </section>

        <section id="selected-work" className="section selected-section neuro-section">
          <div className="container-wide current-project-shell">
            <div className="section-label">04 / Projects</div>
            <article className="neuro-tile project-card project-ongoing"><div className="project-status">Ongoing</div><h3>NeuroAccess SA</h3><p>Social-impact platform for access, referral and family support.</p><a className="text-link" href="https://neuroaccesssa.org" target="_blank" rel="noreferrer">View platform <ArrowUpRight size={16} /></a></article>
          </div>
        </section>

        <section id="contact" className="contact-section"><div className="container-wide contact-inner"><div><div className="section-label gold-label">Next step</div><h2>Turn strategic intent<br /><em>into investable action.</em></h2><p className="contact-intro">Share a little context and we’ll respond directly to explore fit, timing and the right first conversation.</p><div className="contact-direct">Prefer email? <a href="mailto:nungotracy@gmail.com">nungotracy@gmail.com <ArrowUpRight size={15} /></a><span>+254 706 478 643 · Nairobi, Kenya</span></div></div><form className="enquiry-form" action="mailto:nungotracy@gmail.com" method="post" encType="text/plain" onSubmit={() => setSubmitted(true)}><div className="form-grid"><label><span>Name</span><input name="name" required autoComplete="name" placeholder="Your name" /></label><label><span>Organisation</span><input name="organisation" autoComplete="organization" placeholder="Organisation or institution" /></label></div><div className="form-grid"><label><span>Email</span><input type="email" name="email" required autoComplete="email" placeholder="you@organisation.com" /></label><label><span>Conversation type</span><select name="conversation" defaultValue=""><option value="" disabled>Select one</option><option>Strategic advisory</option><option>Technology &amp; software</option><option>Trade &amp; development finance</option><option>Social-impact platform</option></select></label></div><label><span>What would you like to explore?</span><textarea name="message" required rows={4} placeholder="Briefly describe the mandate, challenge or opportunity."></textarea></label><button className="button button-gold" type="submit">{submitted ? "Enquiry prepared" : "Prepare enquiry"} <ArrowUpRight size={17} /></button><p className="form-note">Your email client will open with the enquiry prepared for review before sending.</p></form></div></section>
      </main>

      <footer className="site-footer"><div className="container-wide footer-inner"><img src={fullLogo} alt="TN Advisory" className="full-logo footer-full-logo" /><div className="footer-motto">Technology-led strategy for trade, transformation &amp; development finance</div><div className="footer-meta">© 2026 TN Advisory · Executive advisory practice</div></div></footer>
    </div>
  );
}
