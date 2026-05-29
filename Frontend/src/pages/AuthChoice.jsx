import { useNavigate } from "react-router-dom";

function AuthChoice() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .auth-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 24px;
          font-family: 'DM Sans', sans-serif;
          background: #0a0b0f;
          position: relative;
          overflow: hidden;
        }

        .auth-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,   rgba(90,100,160,0.13) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 80%,  rgba(60,70,120,0.07) 0%, transparent 60%);
          pointer-events: none;
        }

        .auth-card {
          position: relative;
          width: 100%;
          max-width: 460px;
          background: rgba(15,17,23,0.78);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px;
          padding: 52px 48px;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow:
            0 32px 72px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.03) inset;
        }

        .auth-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.32);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 28px;
          background: rgba(255,255,255,0.02);
        }

        .auth-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(90,120,210,0.7);
          flex-shrink: 0;
        }

        .auth-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: rgba(232,234,240,0.93);
          text-align: center;
          margin: 0 0 14px;
        }

        .auth-desc {
          font-size: 14px;
          line-height: 1.8;
          font-weight: 400;
          color: rgba(232,234,240,0.42);
          text-align: center;
          max-width: 300px;
          margin: 0 0 40px;
          letter-spacing: 0.01em;
        }

        .auth-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          margin-bottom: 32px;
        }

        .button-group {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .auth-button {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: 0.01em;
          cursor: pointer;
          transition:
            background 0.25s ease,
            transform 0.3s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.3s cubic-bezier(0.22,1,0.36,1),
            border-color 0.25s ease;
        }

        .auth-button:hover {
          transform: translateY(-2px);
        }

        .auth-button:active {
          transform: translateY(0);
        }

        .login {
          background: rgba(232,234,240,0.93);
          color: #0a0b0f;
          box-shadow: 0 4px 20px rgba(0,0,0,0.25);
        }

        .login:hover {
          background: #ffffff;
          box-shadow: 0 8px 28px rgba(0,0,0,0.35);
        }

        .signup {
          background: rgba(255,255,255,0.04);
          color: rgba(232,234,240,0.72);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .signup:hover {
          background: rgba(255,255,255,0.07);
          color: rgba(232,234,240,0.9);
          border-color: rgba(255,255,255,0.12);
        }

        .auth-footer {
          margin-top: 28px;
          font-size: 12px;
          color: rgba(232,234,240,0.22);
          letter-spacing: 0.02em;
          text-align: center;
        }

        @media (max-width: 520px) {
          .auth-card {
            padding: 40px 28px;
            border-radius: 20px;
          }

          .auth-title {
            font-size: 30px;
          }

          .auth-desc {
            font-size: 13px;
          }
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-card">

          {/* <div className="auth-eyebrow">
            <span className="auth-eyebrow-dot" />
            Authentication
          </div> */}

          <h1 className="auth-title">
            Access Your<br />Inventory
          </h1>

          <p className="auth-desc">
            Sign in to continue managing products, or create an account to get started.
          </p>

          <div className="auth-divider" />

          <div className="button-group">
            <button
              className="auth-button login"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="auth-button signup"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>

          <p className="auth-footer">
            Secure · Private · Enterprise-ready
          </p>

        </div>
      </div>
    </>
  );
}

export default AuthChoice;
