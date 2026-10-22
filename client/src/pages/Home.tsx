import { Menu, X } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";

const helpRoutes = [
  { number: "01", title: "Enter or operate across markets", text: "Market-entry structure, operating models and local intelligence for cross-border decisions." },
  { number: "02", title: "Make governance work", text: "Corporate administration, entity strategy and governance that supports legitimate growth." },
  { number: "03", title: "Structure trade and impact", text: "Trade facilitation, logistics alignment and operating frameworks for impact enterprise." },
];

const capabilities = [
  { number: "01", title: "Strategic management", text: "Market-entry blueprints, organizational architecture and executive advisory." },
  { number: "02", title: "Corporate administration", text: "Entity management, registration strategy and governance frameworks." },
  { number: "03", title: "Commodity facilitation", text: "Trade corridors, logistics alignment and asset positioning." },
  { number: "04", title: "Impact enterprise", text: "Operating frameworks for scalable healthcare and social-impact infrastructure." },
];

const locations = [
  { label: "NAIROBI / EAST AFRICA", title: "Regional market perspective", image: "/assets/nairobi.jpg", alt: "Nairobi skyline viewed across a green urban foreground at golden hour" },
  { label: "CAPE TOWN / SOUTHERN AFRICA", title: "Southern African context", image: "/assets/capetown.jpg", alt: "Cape Town and Table Mountain in warm evening light" },
  { label: "WORLDWIDE / CROSS-BORDER", title: "Trade corridors and global hubs", image: "/assets/trade-port.jpg", alt: "Container cranes and cargo ships at a global port at night" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [caseStudy, setCaseStudy] = useState<"commodities" | "neuro">("commodities");
  const [formStatus, setFormStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.toggle("menu-open", open);
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.classList.remove("menu-open"); };
  }, [open]);

  const closeMenu = () => setOpen(false);

  async function submitBriefing(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    if (String(values.get("website") || "").trim()) { setFormStatus("Thank you."); return; }
    setSubmitting(true);
    setFormStatus("Sending your enquiry…");
    try {
      const response = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(values.get("name") || "").trim(),
          email: String(values.get("email") || "").trim(),
          helpType: String(values.get("help_type") || "").trim(),
          region: String(values.get("region") || "").trim(),
          context: String(values.get("context") || "").trim(),
          website: String(values.get("website") || "").trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "The enquiry could not be saved.");
      form.reset();
      setFormStatus("Enquiry received. The team will respond by email.");
    } catch (error) {
      setFormStatus(`${error instanceof Error ? error.message : "The enquiry could not be saved."} Email tracy@tcnconsultants.com instead.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="TCN Consultants home"><span className="brand-mark"><img src="/assets/tcn-mark.png" alt="" /></span><span className="brand-wordmark">TCN <span>CONSULTANTS</span></span></a>
          <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="site-nav" aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
          <nav className={open ? "site-nav is-open" : "site-nav"} id="site-nav" aria-label="Primary navigation">
            <a href="#how-we-help" onClick={closeMenu}>How we help</a><a href="#selected-work" onClick={closeMenu}>Selected work</a><a href="#point-of-view" onClick={closeMenu}>Point of view</a><a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a className="header-cta" href="#contact" onClick={closeMenu}>Start a conversation <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-grid shell">
            <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-rule" /> Nairobi · Cape Town · Worldwide</p><h1 id="hero-title">Turn cross-border complexity into <em>clear action.</em></h1><p className="hero-lede">TCN Consultants helps leaders connect management decisions, governance and trade execution across markets.</p><div className="hero-actions"><a className="button button-gold" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a><a className="button button-ghost" href="#selected-work">See selected work <span aria-hidden="true">↗</span></a></div><p className="hero-note">Independent management consultancy for consequential operating decisions.</p></div>
            <figure className="hero-visual"><div className="hero-photo-wrap"><img src="/assets/nairobi.jpg" alt="Nairobi skyline viewed across a green urban foreground at golden hour" /><figcaption><span>Operating perspective</span><strong>Nairobi / East Africa</strong><small>Local context for cross-border decisions.</small></figcaption></div></figure>
          </div>
          <div className="shell hero-bottomline"><span>TCN CONSULTANTS</span><span>Management execution for markets that matter.</span><span>Scroll to explore ↓</span></div>
        </section>

        <section className="routes-section" id="how-we-help" aria-labelledby="routes-title"><div className="shell"><div className="section-heading-row routes-heading"><div><div className="section-kicker section-kicker-dark"><span className="kicker-rule" /><span>How we help</span></div><h2 id="routes-title">A few decisive routes into <em>the work.</em></h2></div><p className="heading-aside heading-aside-light">Choose the operating question closest to your mandate.</p></div><div className="routes-grid">{helpRoutes.map((route) => <article className="route-card" key={route.number}><span className="route-number">{route.number}</span><h3>{route.title}</h3><p>{route.text}</p><a className="arrow-link arrow-link-light" href="#capabilities">Explore this route <span aria-hidden="true">↗</span></a></article>)}</div></div></section>

        <section className="intro-section section-paper" id="point-of-view" aria-labelledby="point-of-view-title"><div className="shell intro-grid"><div className="section-kicker"><span className="kicker-rule" /><span>Point of view</span></div><div className="intro-copy"><h2 id="point-of-view-title">Strategy only matters when it survives contact with <em>reality.</em></h2><p className="large-copy">International expansion is rarely limited by ambition. It is constrained by fragmented administration, misaligned operating models and a lack of local intelligence.</p><p>TCN brings those moving parts into one accountable frame, helping boards, investors and enterprise builders move decisively across borders.</p><a className="arrow-link" href="#capabilities">See the capability set <span aria-hidden="true">↗</span></a></div><aside className="method-card" aria-label="TCN working method"><span className="card-index">TCN / WORKING METHOD</span><ol><li><strong>Diagnose</strong><span>Clarify the decision.</span></li><li><strong>Structure</strong><span>Make the route workable.</span></li><li><strong>Execute</strong><span>Put accountability in place.</span></li></ol></aside></div></section>

        <section className="selected-section section-light" id="selected-work" aria-labelledby="selected-title"><div className="shell"><div className="section-kicker"><span className="kicker-rule" /><span>Selected work</span></div><div className="selected-heading"><h2 id="selected-title">Context before <em>claim.</em></h2><p>Two selected engagement contexts show the kind of complexity TCN is built to hold. They are not presented as outcome case studies.</p></div><div className="case-study-layout"><div className="case-selector" role="tablist" aria-label="Selected engagement contexts"><button className={`case-tab ${caseStudy === "commodities" ? "is-active" : ""}`} type="button" role="tab" aria-selected={caseStudy === "commodities"} aria-controls="case-panel" onClick={() => setCaseStudy("commodities")}><span>01</span><span><strong>Commodities &amp; trade facilitation</strong><small>Benjamin Commodities Pty Ltd</small></span><span aria-hidden="true">↗</span></button><button className={`case-tab ${caseStudy === "neuro" ? "is-active" : ""}`} type="button" role="tab" aria-selected={caseStudy === "neuro"} aria-controls="case-panel" onClick={() => setCaseStudy("neuro")}><span>02</span><span><strong>Neurodiversity &amp; impact infrastructure</strong><small>NeuroAccess South Africa</small></span><span aria-hidden="true">↗</span></button><p className="case-selector-note">Selected engagement context / evidence-limited by design.</p></div><div className="case-details" id="case-panel">{caseStudy === "commodities" ? <article className="case-panel" role="tabpanel"><div className="case-panel-top"><span className="case-label">Selected engagement context</span><span>Cape Town ↔ Lima</span></div><h3>Making cross-border trade structures easier to see and act on.</h3><p>TCN’s advisory lens spans market alignment, asset positioning and supply-chain coordination for high-value commodity operations.</p><dl className="case-facts"><div><dt>Situation</dt><dd>International trade corridor and operating alignment.</dd></div><div><dt>TCN role</dt><dd>Structure, administration and executive coordination.</dd></div><div><dt>Evidence</dt><dd>Published context only; no outcome is claimed here.</dd></div></dl><a className="arrow-link arrow-link-light" href="#contact">Discuss a similar situation <span aria-hidden="true">↗</span></a></article> : <article className="case-panel" role="tabpanel"><div className="case-panel-top"><span className="case-label">Selected engagement context</span><span>South Africa</span></div><h3>Turning mission-led ambition into workable operating infrastructure.</h3><p>TCN’s advisory lens spans governance, organizational architecture and operating frameworks for neurodiversity-focused enterprise.</p><dl className="case-facts"><div><dt>Situation</dt><dd>Impact enterprise with a need for scalable structure.</dd></div><div><dt>TCN role</dt><dd>Governance, operating model and growth architecture.</dd></div><div><dt>Evidence</dt><dd>Selected platform context; no outcome is claimed here.</dd></div></dl><div className="case-actions"><a className="arrow-link arrow-link-light" href="https://www.neuroaccesssa.org/" target="_blank" rel="noreferrer">Visit NeuroAccess SA <span aria-hidden="true">↗</span></a><a className="arrow-link arrow-link-light" href="#contact">Discuss a similar situation <span aria-hidden="true">↗</span></a></div></article>}</div></div></div></section>

        <section className="capabilities-section section-paper" id="capabilities" aria-labelledby="capabilities-title"><div className="shell"><div className="section-heading-row"><div><div className="section-kicker"><span className="kicker-rule" /><span>Capabilities</span></div><h2 id="capabilities-title">The work behind<br /><em>the decision.</em></h2></div><p className="heading-aside">Four connected capabilities. One standard of clarity.</p></div><div className="capability-grid">{capabilities.map((item) => <article className="capability-card" key={item.number}><div className="card-topline"><span>{item.number} / 04</span><span className="card-arrow" aria-hidden="true">↗</span></div><div><h3>{item.title}</h3><p>{item.text}</p></div><span className="card-tag">Capability</span></article>)}</div></div></section>

        <section className="locations-section section-light" id="locations" aria-labelledby="locations-title"><div className="shell"><div className="locations-heading"><div className="section-kicker"><span className="kicker-rule" /><span>Geographic perspective</span></div><div className="locations-heading-copy"><h2 id="locations-title">Nairobi and Cape Town, with a <em>worldwide</em> view.</h2><p>Regional context is part of the execution. These places are operating perspectives, not a substitute for the work itself.</p></div></div><div className="location-grid">{locations.map((location) => <figure className="location-card" key={location.label}><img src={location.image} alt={location.alt} loading="lazy" /><figcaption><span>{location.label}</span><strong>{location.title}</strong></figcaption></figure>)}</div></div></section>

        <section className="portal-section" id="investor-portal" aria-labelledby="portal-title"><div className="shell portal-grid"><div className="portal-copy"><div className="section-kicker section-kicker-dark"><span className="kicker-rule" /><span>For investors &amp; enterprise builders</span></div><h2 id="portal-title">Local context for <em>global decisions.</em></h2><p>TCN helps connect market intelligence, administrative legitimacy and operating choices for leaders assessing cross-border opportunity.</p><a className="button button-gold" href="#contact">Start an investor conversation <span aria-hidden="true">↗</span></a></div><figure className="portal-map portal-photo-map"><img src="/assets/trade-port.jpg" alt="Container port with cranes and cargo ships at night" loading="lazy" /><figcaption className="portal-map-caption">Trade corridor / contextual view</figcaption></figure></div></section>

        <section className="contact-section section-paper" id="contact" aria-labelledby="contact-title"><div className="shell contact-grid"><div><div className="section-kicker"><span className="kicker-rule" /><span>Start a conversation</span></div><h2 id="contact-title">Bring the difficult<br /><em>question.</em></h2><p className="contact-lede">Tell us what you are trying to make workable. A short context is enough to begin.</p><div className="direct-contact"><span>Corporate communications</span><a href="mailto:tracy@tcnconsultants.com">tracy@tcnconsultants.com</a></div></div><form className="briefing-form" onSubmit={submitBriefing}><div className="form-intro"><span>ENQUIRY / 01</span><span>Direct intake</span></div><label htmlFor="name">Name <span>*</span></label><input id="name" name="name" type="text" autoComplete="name" required placeholder="Your name" /><label htmlFor="email">Work email <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required placeholder="name@company.com" /><label htmlFor="help_type">What can we help with? <span>*</span></label><select id="help_type" name="help_type" required defaultValue=""><option value="" disabled>Select a route</option><option value="market-entry">Market entry &amp; operations</option><option value="governance">Governance &amp; administration</option><option value="trade">Trade &amp; logistics</option><option value="impact">Impact enterprise &amp; ESG</option><option value="other">Other / not sure yet</option></select><label htmlFor="region">Primary market or region</label><select id="region" name="region" defaultValue=""><option value="">Select a region</option><option>East Africa</option><option>Southern Africa</option><option>Latin America</option><option>Europe</option><option>Middle East</option><option>Asia-Pacific</option><option>North America</option><option>Other / global</option></select><label htmlFor="context">Brief context</label><textarea id="context" name="context" rows={4} maxLength={1000} placeholder="What are you trying to make workable?"></textarea><input className="honeypot" name="website" type="text" autoComplete="off" tabIndex={-1} aria-hidden="true" /><button className="button button-dark form-submit" type="submit" disabled={submitting}>{submitting ? "Sending…" : "Send enquiry"} <span aria-hidden="true">↗</span></button><p className="form-note">Your details are used to respond to this enquiry. Prefer email? <a href="mailto:tracy@tcnconsultants.com">Write to the team.</a></p><p className="form-status" aria-live="polite">{formStatus}</p></form></div></section>
      </main>

      <footer className="site-footer"><div className="shell footer-main"><a className="brand brand-footer" href="#top" aria-label="TCN Consultants home"><span className="brand-mark"><img src="/assets/tcn-mark.png" alt="" /></span><span className="brand-wordmark">TCN <span>CONSULTANTS</span></span></a><p>Management execution for markets that matter.</p><a className="footer-line" href="#contact">Start a conversation <span aria-hidden="true">↗</span></a></div><div className="shell footer-bottom"><span>© 2026 TCN Consultants Ltd.</span><span className="footer-policies"><a href="mailto:tracy@tcnconsultants.com?subject=Global%20Code%20of%20Ethics">Global code of ethics</a><a href="mailto:tracy@tcnconsultants.com?subject=Anti-Bribery%20%26%20Corruption%20Policy">Anti-bribery &amp; corruption</a><a href="mailto:tracy@tcnconsultants.com?subject=Data%20Privacy%20Protocol">Data privacy protocol</a></span><span>Nairobi · Cape Town · Worldwide</span></div></footer>
    </div>
  );
}
