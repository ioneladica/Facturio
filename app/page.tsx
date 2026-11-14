import Link from "next/link";

export default function HomePage() {
  return (
    <div className="landing-page">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />
      <div className="noise-overlay" />
      <header className="landing-nav">
        <Link className="brand" href="/">Facturio<span>.</span></Link>
        <nav className="landing-links" aria-label="Navigare principală">
          <a href="#beneficii">Beneficii</a>
          <a href="#cum-functioneaza">Cum funcționează</a>
          <a href="#preturi">Prețuri</a>
        </nav>
        <Link className="button button-small" href="/login">Intră în cont</Link>
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="hero-copy">
            <p className="eyebrow">FACTURARE SIMPLĂ. MAI MULT TIMP PENTRU TINE.</p>
            <h1>Tu faci lucrurile importante. <em>Noi avem grijă de facturi.</em></h1>
            <p className="hero-description">
              Facturio te ajută să creezi, organizezi și urmărești facturile
              rapid, fără birocrație și fără foi de calcul complicate.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/admin/plans">Descoperă Facturio <span aria-hidden="true">→</span></Link>
              <a className="text-link" href="#cum-functioneaza">Vezi cum funcționează ↓</a>
            </div>
            <p className="trust-note"><span>✓</span> Creat pentru freelanceri și antreprenori</p>
          </div>
          <div className="hero-visual" aria-label="Previzualizare panou de facturare">
            <div className="visual-ring ring-one" />
            <div className="visual-ring ring-two" />
            <div className="floating-dot dot-one" />
            <div className="floating-dot dot-two" />
            <div className="dashboard-preview tilt-card">
              <div className="preview-top"><span className="preview-brand">Facturio.</span><span className="preview-avatar">AM</span></div>
              <p className="preview-label">Venituri luna aceasta</p>
              <strong className="preview-total">12.480 <small>RON</small></strong>
              <div className="chart" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
              <div className="preview-footer"><span>Facturi plătite</span><strong>+24,8%</strong></div>
            </div>
            <div className="invoice-card tilt-card"><span className="invoice-check">✓</span><span><b>Factura #0248</b><small>Plătită cu succes</small></span><strong>1.250 RON</strong></div>
          </div>
        </section>

        <section className="social-proof">
          <span>Tot ce ai nevoie pentru o afacere mai organizată</span>
          <div><b>facturare</b><b>freelance</b><b>antreprenori</b><b>simplitate</b></div>
        </section>

        <section className="benefits-section" id="beneficii">
          <p className="eyebrow">MAI PUȚIN TIMP ADMINISTRATIV</p>
          <h2>O experiență simplă, de la prima factură.</h2>
          <div className="benefit-grid">
            <article className="benefit-card"><span className="benefit-icon icon-purple">✦</span><h3>Fără complicații</h3><p>Interfață intuitivă, creată pentru oameni, nu pentru contabili.</p><span className="card-arrow">↗</span></article>
            <article className="benefit-card"><span className="benefit-icon icon-yellow">↗</span><h3>Vezi imaginea de ansamblu</h3><p>Urmărește veniturile, facturile și progresul afacerii tale.</p><span className="card-arrow">↗</span></article>
            <article className="benefit-card"><span className="benefit-icon icon-green">✓</span><h3>Mai mult control</h3><p>Păstrează totul organizat și fii mereu la curent cu plățile.</p><span className="card-arrow">↗</span></article>
          </div>
        </section>

        <section className="steps-section" id="cum-functioneaza">
          <div><p className="eyebrow">CUM FUNCȚIONEAZĂ</p><h2>Începi în câteva minute.</h2><p className="muted">Mai puțină administrare. Mai mult timp pentru clienți și proiectele care contează.</p></div>
          <ol className="steps-list"><li><span>01</span><div><h3>Creează-ți contul</h3><p>Configurează-ți spațiul de lucru în câteva secunde.</p></div></li><li><span>02</span><div><h3>Adaugă clienții</h3><p>Toate informațiile importante într-un singur loc.</p></div></li><li><span>03</span><div><h3>Emite prima factură</h3><p>Gata. Acum poți reveni la ceea ce faci cel mai bine.</p></div></li></ol>
        </section>

        <section className="cta-section" id="preturi">
          <p className="eyebrow">PREGĂTIT SĂ LUCREZI MAI INTELIGENT?</p>
          <h2>Mai multă claritate.<br /><em>Mai puțin stres.</em></h2>
          <p>Facturio este partenerul tău pentru o afacere simplă și bine organizată.</p>
          <Link className="button button-light" href="/admin/plans">Începe acum <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <footer className="landing-footer">
        <Link className="brand" href="/">Facturio<span>.</span></Link>
        <span>Facturarea simplă pentru afaceri moderne.</span>
        <Link className="admin-access" href="/login">Acces administrare</Link>
      </footer>
    </div>
  );
}
