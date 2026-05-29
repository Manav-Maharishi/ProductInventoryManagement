import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  async function confirmLogout() {
    try {
  await fetch(
    "http://localhost:5037/api/auth/logout",
    {
      method: "POST",

      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`
      }
    }
  );
}
catch (error) {
  console.log(error);
}

localStorage.removeItem(
  "token"
);

window.dispatchEvent(
new Event(
"storage"
)
);

navigate(
"/auth"
);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .lo-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0a0b0f;
          position: relative;
          overflow: hidden;
          padding: 24px;
          font-family: 'DM Sans', sans-serif;
        }

        .lo-root::before {
          content: "";
          position: fixed;
          inset: 0;

          background:
            radial-gradient(
              ellipse 70% 50%
              at 50% 0%,
              rgba(120,60,80,0.10),
              transparent 70%
            ),

            radial-gradient(
              ellipse 40% 35%
              at 80% 80%,
              rgba(60,70,120,0.07),
              transparent 70%
            );

          pointer-events: none;
        }

        .lo-card {
          width: 100%;
          max-width: 470px;

          background:
            rgba(15,17,23,0.86);

          backdrop-filter:
            blur(26px);

          border:
            1px solid rgba(255,255,255,0.08);

          border-radius:
            28px;

          padding:
            52px;

          display: flex;

          flex-direction: column;

          gap: 24px;

          text-align: center;

          position: relative;

          z-index: 2;

          box-shadow:
            0 32px 80px rgba(0,0,0,0.55),
            inset 0 0 0 1px rgba(255,255,255,0.02);

          animation:
            loFade 0.45s cubic-bezier(0.22,1,0.36,1);
        }

        @keyframes loFade {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .lo-eyebrow {
          font-size: 11px;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          color:
            rgba(232,234,240,0.3);

          display: flex;

          justify-content: center;

          align-items: center;

          gap: 8px;
        }

        .lo-dot {
          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            rgba(239,68,68,0.9);
        }

        .lo-title {
          margin: 0;

          font-size:
            clamp(30px,4vw,42px);

          color:
            rgba(232,234,240,0.95);

          letter-spacing: -0.03em;
        }

        .lo-sub {
          margin: 0;

          color:
            rgba(232,234,240,0.45);

          line-height: 1.7;

          font-size: 14px;
        }

        .lo-actions {
          display: flex;
          gap: 12px;
          margin-top: 10px;
        }

        .lo-btn {
          flex: 1;

          padding: 15px;

          border-radius: 14px;

          border: none;

          cursor: pointer;

          font-family: inherit;

          font-size: 14px;

          font-weight: 600;

          transition:
            transform .3s cubic-bezier(.22,1,.36,1),
            background .25s ease,
            box-shadow .25s ease;
        }

        .lo-btn:hover {
          transform:
            translateY(-2px);
        }

        .lo-btn-danger {
          background:
            rgba(239,68,68,0.9);

          color: white;
        }

        .lo-btn-danger:hover {
          box-shadow:
            0 10px 28px rgba(239,68,68,0.24);
        }

        .lo-btn-safe {
          background:
            rgba(255,255,255,0.06);

          color:
            rgba(232,234,240,0.86);

          border:
            1px solid rgba(255,255,255,0.08);
        }

        .lo-btn-safe:hover {
          background:
            rgba(255,255,255,0.09);
        }

        @media (max-width: 560px) {
          .lo-card {
            padding: 36px 26px;
          }

          .lo-actions {
            flex-direction: column;
          }
        }
      `}</style>

      <div className="lo-root">

        <div className="lo-card">

          <div className="lo-eyebrow">
            <span className="lo-dot" />
            Session
          </div>

          <h1 className="lo-title">
            Logout
          </h1>

          <p className="lo-sub">
            Are you sure you want to logout from your inventory account?
          </p>

          <div className="lo-actions">

            <button
              className="lo-btn lo-btn-danger"
              onClick={confirmLogout}
            >
              Yes, Logout
            </button>

            <button
              className="lo-btn lo-btn-safe"
              onClick={() => navigate(-1)}
            >
              Stay Logged In
            </button>

          </div>

        </div>

      </div>
    </>
  );
}

export default Logout;