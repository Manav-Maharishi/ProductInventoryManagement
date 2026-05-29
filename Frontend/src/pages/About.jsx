function About() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .ab-root {
          min-height: 100vh;
          background: #0a0b0f;
          font-family: 'DM Sans', sans-serif;
          color: rgba(232,234,240,0.92);
          padding: 0 40px 96px;
          position: relative;
          overflow-x: hidden;
        }

        .ab-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,  rgba(90,100,160,0.11) 0%, transparent 70%),
            radial-gradient(ellipse 40% 40% at 10% 80%, rgba(60,70,120,0.07)  0%, transparent 60%),
            radial-gradient(ellipse 40% 35% at 90% 60%, rgba(80,60,140,0.06)  0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .ab-root > * { position: relative; z-index: 1; }

        /* ── Hero ── */
        .ab-hero {
          padding-top: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 64px;
          animation: ab-fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes ab-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Initials avatar */
        .ab-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(79,120,200,0.1);
          border: 1px solid rgba(79,120,200,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(140,180,255,0.85);
          margin-bottom: 28px;
          box-shadow: 0 0 0 6px rgba(79,120,200,0.05);
        }

        .ab-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.28);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 22px;
          background: rgba(255,255,255,0.02);
        }

        .ab-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(79,120,200,0.85);
        }

        .ab-name {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 700;
          letter-spacing: -0.035em;
          line-height: 1.06;
          color: rgba(232,234,240,0.94);
          margin: 0 0 16px;
        }

        .ab-subtitle {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.3);
          margin: 0 0 28px;
        }

        .ab-tagline {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.8;
          color: rgba(232,234,240,0.45);
          max-width: 520px;
          margin: 0 auto;
          letter-spacing: 0.01em;
        }

        /* ── Divider ── */
        .ab-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          max-width: 680px;
          margin: 0 auto 56px;
        }

        /* ── Section wrapper ── */
        .ab-section {
          max-width: 680px;
          margin: 0 auto 56px;
          animation: ab-fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.1s both;
        }

        .ab-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.25);
          margin-bottom: 20px;
          text-align: center;
        }

        /* ── Glass card ── */
        .ab-card {
          background: rgba(15,17,23,0.78);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 36px 40px;
          box-shadow: 0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.02) inset;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        .ab-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08);
        }

        /* ── About card body ── */
        .ab-about-text {
          font-size: 15px;
          font-weight: 400;
          line-height: 1.85;
          color: rgba(232,234,240,0.52);
          margin: 0;
          text-align: center;
          letter-spacing: 0.01em;
        }

        /* ── Contact card ── */
        .ab-contact-grid {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .ab-contact-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ab-contact-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: rgba(232,234,240,0.4);
        }

        .ab-contact-icon svg {
          width: 16px;
          height: 16px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ab-contact-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 0;
        }

        .ab-contact-type {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.24);
        }

        .ab-contact-value {
          font-size: 14px;
          font-weight: 500;
          color: rgba(232,234,240,0.7);
          letter-spacing: 0.01em;
          word-break: break-all;
        }

        /* Email CTA button */
        .ab-email-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(140,180,255,0.88);
          background: rgba(79,120,200,0.08);
          border: 1px solid rgba(79,120,200,0.2);
          border-radius: 12px;
          cursor: pointer;
          text-decoration: none;
          transition:
            background   0.25s ease,
            border-color 0.25s ease,
            color        0.25s ease,
            box-shadow   0.3s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0;
        }

        .ab-email-btn:hover {
          background: rgba(79,120,200,0.14);
          border-color: rgba(79,120,200,0.32);
          color: rgba(180,210,255,0.95);
          box-shadow: 0 6px 20px rgba(0,0,0,0.28);
        }

        .ab-email-btn svg {
          width: 13px;
          height: 13px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }

        .ab-contact-sep {
          height: 1px;
          background: rgba(255,255,255,0.05);
        }

        /* ── Responsive ── */
        @media (max-width: 720px) {
          .ab-root { padding: 0 20px 80px; }
          .ab-card { padding: 28px 24px; }
          .ab-contact-row { flex-wrap: wrap; }
          .ab-email-btn { width: 100%; justify-content: center; }
        }
      `}</style>

      <div className="ab-root">

        {/* ── Hero ── */}
        <div className="ab-hero">
          <div className="ab-avatar">MM</div>

          <div className="ab-eyebrow">
            <span className="ab-eyebrow-dot" />
            About
          </div>

          <h1 className="ab-name">Manav Maharishi</h1>
          {/* <p className="ab-subtitle">Developer&nbsp;•&nbsp;Designer&nbsp;•&nbsp;Inventory Management Creator</p> */}
          <p className="ab-subtitle">Inventory Management Creator</p>
          <p className="ab-tagline">
            Built with attention to detail, focused on creating elegant and scalable experiences through software and thoughtful UI.
          </p>
        </div>

        <div className="ab-divider" />

        {/* ── About ── */}
        <div className="ab-section">
          <p className="ab-section-label">About this project</p>
          <div className="ab-card">
            <p className="ab-about-text">
              Product Inventory Management System is a full-stack application designed to give teams real-time control over stock, categories, and product lifecycle. Every detail — from the dashboard analytics to the delete and restore flow — was crafted to feel intentional, fast, and reliable.
            </p>
          </div>
        </div>

        {/* ── Contact ── */}
        <div className="ab-section" style={{ marginBottom: 0 }}>
          <p className="ab-section-label">Contact</p>
          <div className="ab-card">
            <div className="ab-contact-grid">

              {/* Phone */}
              <div className="ab-contact-row">
                <div className="ab-contact-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 11.82 19a19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.93-8A2 2 0 0 1 4.06 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.92z"/>
                  </svg>
                </div>
                <div className="ab-contact-meta">
                  <span className="ab-contact-type">Phone</span>
                  <span className="ab-contact-value">9810881865</span>
                </div>
              </div>

              <div className="ab-contact-sep" />

              {/* Email */}
              <div className="ab-contact-row">
                <div className="ab-contact-icon">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="ab-contact-meta">
                  <span className="ab-contact-type">Email</span>
                  <span className="ab-contact-value">maharishi.manav@gmail.com</span>
                </div>
                <a
                  className="ab-email-btn"
                  href="mailto:maharishi.manav@gmail.com"
                >
                  <svg viewBox="0 0 24 24">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                  Contact via Email
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default About;
