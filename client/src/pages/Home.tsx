import { ArrowUpRight, Menu, X } from "lucide-react";
import { FormEvent, useState } from "react";

const capabilities = [
  { number: "01", title: "Strategic management & executive advisory", text: "Market-entry blueprints, organizational architecture and board-level advisory for cross-border expansion." },
  { number: "02", title: "Corporate administration & governance", text: "Entity management, registration strategy and governance frameworks for complete market legitimacy." },
  { number: "03", title: "Commodity logistics & facilitation", text: "Trade corridors, logistics alignment and asset positioning for high-value international markets." },
  { number: "04", title: "Impact enterprise & ESG scaling", text: "Operating frameworks for scalable healthcare and social-impact infrastructure." },
];

const locations = [
  { label: "NAIROBI / 01", title: "East African market perspective", image: "/assets/nairobi.jpg", alt: "Nairobi skyline and green urban foreground", className: "location-card-nairobi" },
  { label: "CAPE TOWN / 02", title: "Southern African operating context", image: "/assets/capetown.jpg", alt: "Cape Town and Table Mountain in warm evening light", className: "location-card-cape" },
  { label: "WORLDWIDE / 03", title: "Trade corridors and global hubs", image: "/assets/trade-port.jpg", alt: "Container cranes and cargo ships at a global port at night", className: "location-card-trade" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState<"commodities" | "neuro">("commodities");
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const closeMenu = () => setOpen(false);
  const secureLine = () => { window.location.href = "mailto:tracy@tcnconsultants.com?subject=Secure%20executive%20briefing"; };

  async function submitBriefing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    if (String(values.get("website") || "").trim()) { setFormStatus("Briefing received."); return; }
    setSubmitting(true);
    setFormStatus("Sending your briefing…");
    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(values.get("name") || "").trim(),
          email: String(values.get("email") || "").trim(),
          region: String(values.get("region") || "").trim(),
          website: String(values.get("website") || "").trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The briefing could not be saved.");
      form.reset();
      setFormStatus("Briefing received. The corporate team will respond by email.");
    } catch (error) {
      setFormStatus(`${error instanceof Error ? error.message : "The briefing could not be saved."} Please email tracy@tcnconsultants.com.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header" data-header>
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="TCN Consultants home"><span className="brand-mark"><img src="/assets/tcn-mark.png" alt="" /></span><span className="brand-wordmark">TCN <span>CONSULTANTS</span></span></a>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-nav" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
          <nav className={open ? "site-nav is-open" : "site-nav"} id="site-nav" aria-label="Primary navigation">
            <a href="#about" onClick={closeMenu}>About</a><a href="#capabilities" onClick={closeMenu}>Capabilities</a><a href="#track-record" onClick={closeMenu}>Track record</a><a href="#investor-portal" onClick={closeMenu}>Investor portal</a>
          </nav>
          <div className="header-actions"><a className="text-link hide-mobile" href="#contact">Request consultation <span aria-hidden="true">↗</span></a><button className="button button-gold button-compact hide-mobile" type="button" onClick={secureLine}>Secure executive line</button></div>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid shell">
            <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-rule" /> Independent management consultancy</p><h1 id="hero-title">Nairobi. Cape Town.<br /><em>Worldwide.</em></h1><p className="hero-lede">TCN Consultants turns cross-border complexity into clear corporate action — from management execution and administration to commodity trade structures and impact infrastructure.</p><div className="hero-actions"><a className="button button-gold" href="#capabilities">Review capabilities <span aria-hidden="true">↗</span></a><button className="button button-ghost" type="button" onClick={secureLine}>Connect securely <span aria-hidden="true">↗</span></button></div><div className="hero-note"><span className="status-dot" /> Local intelligence / global execution</div></div>
            <div className="hero-visual" aria-label="Nairobi city skyline representing TCN's East African operating perspective" role="img"><div className="visual-topline"><span>OPERATING FRAME / 01</span><span>NAIROBI → WORLDWIDE</span></div><div className="hero-photo-wrap"><img src="/assets/nairobi.jpg" alt="Nairobi skyline viewed across a green urban foreground at golden hour" /><div className="hero-photo-wash" /><div className="hero-photo-mark"><span>TCN</span><strong>Nairobi</strong><small>East African perspective</small></div><div className="hero-photo-corner"><span>01</span><span>Market intelligence</span></div></div><div className="visual-footer"><span>TRADE · GOVERNANCE · IMPACT</span><span>LOCAL PRECISION / GLOBAL REACH</span></div></div>
          </div>
          <div className="shell hero-bottomline"><span>TCN CONSULTANTS</span><span>Management execution for markets that matter.</span><span>Scroll to explore ↓</span></div>
        </section>

        <section className="proof-strip" aria-label="TCN operating lenses"><div className="shell proof-grid"><div className="proof-intro"><span className="proof-kicker">TCN / PROOF SURFACE</span><h2>Three lenses.<br /><em>One accountable frame.</em></h2><p>Built around the work that has to hold: trade, governance and impact infrastructure.</p></div><div className="proof-item"><span>OPERATING LENS / 01</span><strong>Cross-border structures</strong><p>Market-entry, asset positioning and supply-network clarity.</p></div><div className="proof-item"><span>OPERATING LENS / 02</span><strong>Corporate legitimacy</strong><p>Entity administration and governance that survives scrutiny.</p></div><div className="proof-item"><span>OPERATING LENS / 03</span><strong>Impact infrastructure</strong><p>Operating frameworks for social-impact scale.</p></div></div></section>

        <section className="locations-section section-light" id="locations" aria-labelledby="locations-title"><div className="shell"><div className="locations-heading"><div className="section-kicker"><span>01</span><span className="kicker-rule" /><span>Geographic perspective</span></div><div className="locations-heading-copy"><h2 id="locations-title">From Nairobi and Cape Town to <em>worldwide.</em></h2><p>We work where markets, institutions and operating realities meet. Regional context is not a footnote; it is part of the execution.</p></div></div><div className="location-grid">{locations.map((location) => <figure className={`location-card ${location.className}`} key={location.label}><img src={location.image} alt={location.alt} loading="lazy" /><figcaption><span>{location.label}</span><strong>{location.title}</strong></figcaption></figure>)}</div></div></section>

        <section className="intro-section section-paper" id="about" aria-labelledby="about-title"><div className="shell intro-grid"><div className="section-kicker"><span>02</span><span className="kicker-rule" /><span>Our point of view</span></div><div className="intro-copy"><h2 id="about-title">A strategy only matters when it survives contact with <em>reality.</em></h2><p className="large-copy">International expansion is rarely limited by ambition. It is constrained by fragmented administration, misaligned operating models and a lack of local intelligence. TCN Consultants brings those moving parts into one accountable frame.</p><p>We work at the intersection of strategy, governance and operational reality — giving boards, investors and enterprise builders the clarity to move decisively across borders.</p><a className="arrow-link" href="#track-record">View our operating lenses <span aria-hidden="true">↗</span></a></div><div className="point-of-view-card"><div className="card-index">TCN / METHOD</div><div className="method-stack"><span>Diagnose</span><span>Structure</span><span>Execute</span></div><p>One integrated lens from strategic intent to operational proof.</p></div></div></section>

        <section className="capabilities-section section-light" id="capabilities" aria-labelledby="capabilities-title"><div className="shell"><div className="section-heading-row"><div><div className="section-kicker"><span>03</span><span className="kicker-rule" /><span>What we do</span></div><h2 id="capabilities-title">Capability with<br /><em>consequence.</em></h2></div><p className="heading-aside">Four integrated pillars. One standard of institutional clarity.</p></div><div className="capability-grid">{capabilities.map((item) => <article className={`capability-card ${item.number === "04" ? "capability-card-dark" : ""}`} key={item.number}><div className="card-topline"><span>{item.number} / 04</span><span className="card-arrow" aria-hidden="true">↗</span></div><div><h3>{item.title}</h3><p>{item.text}</p></div><div className="card-tag">{item.number === "01" ? "BOARD / OPERATING MODEL" : item.number === "02" ? "ENTITY / LEGITIMACY" : item.number === "03" ? "TRADE / SUPPLY NETWORKS" : "IMPACT / SCALE"}</div></article>)}</div></div></section>

        <section className="track-record-section section-paper" id="track-record" aria-labelledby="track-record-title"><div className="shell"><div className="section-kicker"><span>04</span><span className="kicker-rule" /><span>Track record</span></div><div className="track-heading"><h2 id="track-record-title">Operating lenses.<br /><em>Real-world stakes.</em></h2><p>Our credibility is built through the complexity we are trusted to hold: cross-border trade structures and impact infrastructure that must work beyond the boardroom.</p></div><div className="case-study-layout"><div className="case-selector" role="tablist" aria-label="Track record case studies"><button className={`case-tab ${caseStudy === "commodities" ? "is-active" : ""}`} type="button" role="tab" aria-selected={caseStudy === "commodities"} onClick={() => setCaseStudy("commodities")}><span>01</span><span><strong>Commodities &amp; finance facilitation</strong><small>Benjamin Commodities Pty Ltd</small></span><span aria-hidden="true">↗</span></button><button className={`case-tab ${caseStudy === "neuro" ? "is-active" : ""}`} type="button" role="tab" aria-selected={caseStudy === "neuro"} onClick={() => setCaseStudy("neuro")}><span>02</span><span><strong>Neurodiversity &amp; impact infrastructure</strong><small>NeuroAccess South Africa</small></span><span aria-hidden="true">↗</span></button><div className="case-selector-note"><span className="status-dot" /> Selected engagement contexts / evidence-led</div></div><div className="case-details">{caseStudy === "commodities" ? <article className="case-panel" role="tabpanel"><div className="case-panel-top"><span className="case-label">Cape Town ↔ Lima</span><span>Cross-border trade structures</span></div><h3>Making complex trade corridors legible, governable and executable.</h3><p>TCN’s executive focus spans global trade structures, asset monetization systems and international supply-chain logistics coordination for high-value commodity operations.</p><dl className="case-facts"><div><dt>Focus</dt><dd>Trade structure / asset positioning</dd></div><div><dt>Lens</dt><dd>Governance through execution</dd></div><div><dt>Context</dt><dd>International market alignment</dd></div></dl><div className="case-graphic trade-graphic"><div className="trade-graphic-grid" /><span className="trade-route route-a" /><span className="trade-route route-b" /><span className="trade-node node-a">CPT</span><span className="trade-node node-b">LIM</span><span className="trade-node node-c">HUB</span><span className="trade-caption">CORRIDOR / 01</span></div></article> : <article className="case-panel" role="tabpanel"><div className="case-panel-top"><span className="case-label">South Africa</span><span>Impact infrastructure</span></div><h3>Turning mission-led ambition into scalable institutional infrastructure.</h3><p>TCN’s executive focus spans corporate governance, scalable organizational architecture and operational frameworks for strategic growth in neurodiversity-focused enterprise.</p><dl className="case-facts"><div><dt>Focus</dt><dd>Governance / organizational scale</dd></div><div><dt>Lens</dt><dd>Impact with operating discipline</dd></div><div><dt>Context</dt><dd>Regional execution / global standards</dd></div></dl><div className="case-graphic impact-graphic"><div className="impact-orbit orbit-one" /><div className="impact-orbit orbit-two" /><span className="impact-node impact-core">NA</span><span className="impact-node impact-top">GOV</span><span className="impact-node impact-right">OPS</span><span className="impact-node impact-left">IMPACT</span><span className="trade-caption">FRAMEWORK / 02</span></div></article>}</div></div></div></section>

        <section className="portal-section" id="investor-portal" aria-labelledby="portal-title"><div className="shell portal-grid"><div className="portal-copy"><div className="section-kicker section-kicker-dark"><span>05</span><span className="kicker-rule" /><span>Investor portal</span></div><h2 id="portal-title">Global infrastructure.<br /><em>Local precision.</em></h2><p>International expansion requires absolute administrative legitimacy and rigorous operational security. TCN Consultants bridges global capital with emerging-market opportunity by combining local intelligence with institutional execution.</p><a className="button button-gold" href="#contact">Initiate an investor briefing <span aria-hidden="true">↗</span></a></div><div className="portal-map portal-photo-map" aria-label="Container port representing global trade corridors" role="img"><img src="/assets/trade-port.jpg" alt="Container port with cranes and cargo ships at night" loading="lazy" /><div className="portal-photo-overlay" /><div className="portal-node portal-node-core"><span>TCN</span></div><div className="portal-node portal-node-cape"><span>CPT</span><small>Cape Town</small></div><div className="portal-node portal-node-lima"><span>LIM</span><small>Lima</small></div><div className="portal-node portal-node-global"><span>GLB</span><small>Global hubs</small></div><div className="portal-map-caption">LOCAL INTELLIGENCE / GLOBAL SHIELD</div></div></div></section>

        <section className="contact-section section-light" id="contact" aria-labelledby="contact-title"><div className="shell contact-grid"><div><div className="section-kicker"><span>06</span><span className="kicker-rule" /><span>Direct briefing</span></div><h2 id="contact-title">Secure your<br /><em>advisory partner.</em></h2><p className="contact-lede">Tell us where the complexity sits. We will bring the right operating lens.</p><div className="direct-contact"><span>Corporate communications</span><a href="mailto:tracy@tcnconsultants.com">tracy@tcnconsultants.com</a></div></div><form className="briefing-form" onSubmit={submitBriefing}><div className="form-intro"><span>REQUEST / 01</span><span>Secure intake</span></div><label htmlFor="name">Name <span>*</span></label><input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" /><label htmlFor="email">Corporate email <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required placeholder="name@company.com" /><label htmlFor="region">Region <span>*</span></label><select id="region" name="region" required defaultValue=""><option value="" disabled>Select your region</option><option>East Africa</option><option>Southern Africa</option><option>Latin America</option><option>Europe</option><option>Middle East</option><option>Asia-Pacific</option><option>North America</option><option>Other / global</option></select><input className="honeypot" name="website" type="text" autoComplete="off" tabIndex={-1} aria-hidden="true" /><button className="button button-dark form-submit" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Initiate briefing"} <span aria-hidden="true">↗</span></button><p className="form-status" aria-live="polite">{formStatus}</p></form></div></section>
      </main>
      <footer className="site-footer"><div className="shell footer-main"><a className="brand brand-footer" href="#top" aria-label="TCN Consultants home"><span className="brand-mark"><img src="/assets/tcn-mark.png" alt="" /></span><span className="brand-wordmark">TCN <span>CONSULTANTS</span></span></a><p>Management execution for markets that matter.</p><a className="footer-line" href="mailto:tracy@tcnconsultants.com">Initiate secure briefing <span aria-hidden="true">↗</span></a></div><div className="shell footer-bottom"><span>© 2026 TCN Consultants Ltd.</span><span className="footer-policies"><a href="mailto:tracy@tcnconsultants.com?subject=Global%20Code%20of%20Ethics">Global code of ethics</a><a href="mailto:tracy@tcnconsultants.com?subject=Anti-Bribery%20%26%20Corruption%20Policy">Anti-bribery &amp; corruption</a><a href="mailto:tracy@tcnconsultants.com?subject=Data%20Privacy%20Protocol">Data privacy protocol</a></span><span>Nairobi · Cape Town · Worldwide</span></div></footer>
    </div>
  );
}
