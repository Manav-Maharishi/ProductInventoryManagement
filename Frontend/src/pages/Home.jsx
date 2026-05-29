import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function Home() {
  const navigate = useNavigate();
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal--visible");
          } else {
            entry.target.classList.remove("reveal--visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const sections = document.querySelectorAll(".reveal");
    sections.forEach((section) => observerRef.current.observe(section));

    return () => observerRef.current.disconnect();
  }, []);

  const features = [
    {
      title: "Manage",
      desc: "Organise products and inventory efficiently.",
      image: "http://localhost:5037/images/homePagePictures/manage.png",
    },
    {
      title: "Track",
      desc: "Monitor stock levels in real time.",
      image: "http://localhost:5037/images/homePagePictures/track.png",
    },
    {
      title: "Stay Updated",
      desc: "Always know what changes across inventory.",
      image: "http://localhost:5037/images/homePagePictures/stayupdated.png",
    },
    {
      title: "Get Reports",
      desc: "Generate inventory reports instantly.",
      image: "http://localhost:5037/images/homePagePictures/getreports.png",
    },
  ];

  return (
    <div style={{ color: "#e8eaf0", overflowX: "hidden", background: "#0a0b0f" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        *, *::before, *::after {
          box-sizing: border-box;
        }

        html,
body {

margin:0;

padding:0;

width:100%;

overflow-x:hidden;

scroll-behavior:smooth;

}

        body {
          background: #0a0b0f;
        }

        /* ── Tokens ── */
        :root {
          --space-xs:  8px;
          --space-sm:  16px;
          --space-md:  32px;
          --space-lg:  64px;
          --space-xl:  96px;
          --space-2xl: 140px;

          --radius-sm: 12px;
          --radius-md: 20px;
          --radius-lg: 28px;

          --color-bg:        #0a0b0f;
          --color-surface:   #0f1117;
          --color-border:    rgba(255,255,255,0.07);
          --color-text:      #e8eaf0;
          --color-muted:     #7a7f94;
          --color-accent:    #c8cfe8;

          --font-display: 'Instrument Serif', Georgia, serif;
          --font-body:    'DM Sans', sans-serif;

          --transition-smooth: cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* ── Background layers ── */
        .page-root {

position:relative;

font-family:
var(--font-body);

}

        .page-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 50% -10%,  rgba(90,100,160,0.14) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 90%  60%,  rgba(60,70,120,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 10%  80%,  rgba(80,90,150,0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .page-root > * {
          position: relative;
          z-index: 1;
        }

        /* ── Reveal animation ── */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          filter: blur(4px);
          transition:
            opacity  0.75s var(--transition-smooth),
            transform 0.75s var(--transition-smooth),
            filter   0.75s var(--transition-smooth);
          will-change: opacity, transform, filter;
        }

        .reveal--visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }

        /* ── Divider ── */
        .section-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          margin: 0 auto;
          max-width: 900px;
        }

        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: var(--space-2xl) var(--space-lg) var(--space-xl);
        }

        .hero__eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-muted);
          border: 1px solid var(--color-border);
          border-radius: 100px;
          padding: 6px 16px;
          margin-bottom: var(--space-md);
          background: rgba(255,255,255,0.03);
        }

        .hero__eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #5a78d4;
          opacity: 0.8;
        }

        .hero__title {

font-family:
var(--font-body);

font-size:
clamp(54px,8vw,88px);

font-weight:
600;

line-height:
1.05;

letter-spacing:
-0.04em;

color:
var(--color-text);

margin:
0 0 var(--space-md);

max-width:
900px;

}

.hero__title-accent{

display:block;

margin-top:18px;

font-size:
clamp(28px,4vw,42px);

font-weight:
500;

color:
#9aa8d4;

letter-spacing:
-0.03em;

}

        .hero__title em {
          font-style: italic;
          color: #9aa8d4;
        }

        .hero__desc {
          font-size: clamp(16px, 2vw, 19px);
          line-height: 1.75;
          color: var(--color-muted);
          max-width: 560px;
          margin: 0;
          font-weight: 300;
        }

        /* ── Images section ── */
        .images-section {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: var(--space-xl) var(--space-lg);
        }

        .images-row {
          display: flex;
          gap: var(--space-md);
          justify-content: center;
          align-items: center;
          width: 100%;
          max-width: 1100px;
        }

        .image-frame {
          flex: 1;
          min-width: 0;
          max-width: 520px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          transition: transform 0.4s var(--transition-smooth), box-shadow 0.4s var(--transition-smooth);
        }

        .image-frame:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.09);
        }

        .image-frame img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          display: block;
        }

        /* ── Efficiency section ── */
        .efficiency-section {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: var(--space-xl) var(--space-lg);
        }

        .efficiency-inner {
          text-align: center;
          max-width: 680px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--color-muted);
          margin-bottom: var(--space-sm);
        }

        .section-heading {

font-family:
var(--font-body);

font-size:
clamp(36px,5vw,58px);

font-weight:
600;

line-height:
1.08;

letter-spacing:
-0.04em;

color:
var(--color-text);

margin:
0 0 var(--space-md);

}

        .section-heading em {
          font-style: italic;
          color: #9aa8d4;
        }

        .section-body {
          font-size: 17px;
          line-height: 1.8;
          color: var(--color-muted);
          font-weight: 300;
          margin: 0;
        }

        /* ── Features section ── */
        .features-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--space-xl) var(--space-lg);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 360px));
          gap: var(--space-md);
          justify-content: center;
          width: 100%;
        }

        .feature-card {
          border-radius: var(--radius-lg);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--color-border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s var(--transition-smooth), box-shadow 0.35s var(--transition-smooth), border-color 0.35s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.11);
        }

        .feature-card__image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          border-bottom: 1px solid var(--color-border);
        }

        .feature-card__body {
          padding: var(--space-md);
          flex: 1;
        }

        .feature-card__title {

font-family:
var(--font-body);

font-size:
24px;

font-weight:
600;

line-height:
1.15;

letter-spacing:
-0.03em;

color:
var(--color-text);

margin:
0 0 var(--space-sm);

}

        .feature-card__desc {
          font-size: 14px;
          line-height: 1.7;
          color: var(--color-muted);
          margin: 0;
          font-weight: 300;
        }

        /* ── CTA section ── */
        .cta-section {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: var(--space-xl) var(--space-lg) var(--space-2xl);
          text-align: center;
          gap: var(--space-md);
        }

        .cta-label {
          font-size: 13px;
          color: var(--color-muted);
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 44px;
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.01em;
          color: #0a0b0f;
          background: #e8eaf0;
          border: none;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: transform 0.3s var(--transition-smooth), background 0.3s ease, box-shadow 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          background: #ffffff;
          box-shadow: 0 12px 32px rgba(0,0,0,0.35);
        }

        .cta-button__arrow {
          transition: transform 0.3s var(--transition-smooth);
        }

        .cta-button:hover .cta-button__arrow {
          transform: translateX(3px);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .images-row {
            flex-direction: column;
            gap: var(--space-sm);
          }

          .image-frame {
            max-width: 100%;
          }

          .features-grid {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
        }

        @media (max-width: 600px) {
          .hero {
            padding: 120px var(--space-md) var(--space-lg);
          }

          .images-section,
          .efficiency-section,
          .features-section,
          .cta-section {
            padding-left: var(--space-md);
            padding-right: var(--space-md);
          }
        }
      `}</style>

      <div className="page-root">

        {/* ── Hero ── */}
        <section className="hero reveal">
          <span className="hero__eyebrow">
            {/* <span className="hero__eyebrow-dot" /> */}
            Introducing
          </span>
          <h1 className="hero__title">
            Product Inventory<br />
            <em>built for your warehouse.</em>
          </h1>
          <p className="hero__desc">
            A modern platform to manage stock, track availability,
            organise categories, and simplify every inventory operation.
          </p>
        </section>

        <div className="section-divider" />

        {/* ── Intro images ── */}
        <section className="images-section reveal">
          <div className="images-row">
            <div className="image-frame">
              <img
                src="http://localhost:5037/images/homePagePictures/intro1.png"
                alt="Inventory overview"
              />
            </div>
            <div className="image-frame">
              <img
                src="http://localhost:5037/images/homePagePictures/intro2.png"
                alt="Stock tracking"
              />
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Efficiency ── */}
        <section className="efficiency-section reveal">
          <div className="efficiency-inner">
            <p className="section-label">Traditional Inventory? Too difficult.</p>
            <h2 className="section-heading">
              Inventory Built<br />
              <em>For Efficiency</em>
            </h2>
            <p className="section-body">
              Manage products, monitor stock, reduce confusion, and stay in
              control with an inventory experience designed around how
              real teams actually work.
            </p>
          </div>
        </section>

        <div className="section-divider" />

        {/* ── Features ── */}
        <section className="features-section reveal">
          <p className="section-label" style={{ marginBottom: "var(--space-sm)" }}>Capabilities</p>
          <h2 className="section-heading" style={{ marginBottom: "var(--space-lg)", textAlign: "center" }}>
            Features
          </h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div key={feature.title} className="feature-card">
                <img
                  className="feature-card__image"
                  src={feature.image}
                  alt={feature.title}
                />
                <div className="feature-card__body">
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* ── CTA ── */}
        <section className="cta-section reveal">
          <h2 className="section-heading">Ready to get started?</h2>
          <p className="cta-label">No setup required. Start managing inventory today.</p>
          <button
  className="cta-button"
  onClick={() => {

const token =
localStorage.getItem(
"token"
);

navigate(
token
? "/products"
: "/auth"
);

}}
>
            Get Started
            <svg
              className="cta-button__arrow"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </section>

      </div>
    </div>
  );
}
export default Home;