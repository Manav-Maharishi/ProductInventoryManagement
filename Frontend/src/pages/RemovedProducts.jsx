import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RemovedProducts() {
  const [products, setProducts]           = useState([]);
  const [restoreMessage, setRestoreMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5037/api/products/deleted", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("restoreMessage");
    if (message) {
      setRestoreMessage(message);
      localStorage.removeItem("restoreMessage");
      setTimeout(() => setRestoreMessage(""), 1800);
    }
  }, []);

  function openDeletedDetails(product) {
    navigate(
      `/deletedproductdetails?id=${product.id}&name=${product.name}&price=${product.price}&category=${product.category}&quantity=${product.quantity}&image=${product.imageUrl}`
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .rp-root {
          min-height: 100vh;
          background: #0a0b0f;
          font-family: 'DM Sans', sans-serif;
          color: rgba(232,234,240,0.92);
          padding: 0 40px 96px;
          position: relative;
          overflow-x: hidden;
        }

        .rp-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,  rgba(120,50,50,0.09) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(60,70,120,0.07) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .rp-root > * { position: relative; z-index: 1; }

        /* ── Header ── */
        .rp-header {
          padding-top: 100px;
          text-align: center;
          margin-bottom: 48px;
        }

        .rp-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(239,68,68,0.45);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 20px;
          background: rgba(239,68,68,0.04);
          width: fit-content;
          margin-left: auto;
          margin-right: auto;
        }

        .rp-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(239,68,68,0.6);
          flex-shrink: 0;
        }

        .rp-title {
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: rgba(232,234,240,0.93);
          margin: 0 0 12px;
        }

        .rp-subtitle {
          font-size: 14px;
          font-weight: 400;
          color: rgba(232,234,240,0.35);
          margin: 0 auto;
          line-height: 1.75;
          letter-spacing: 0.01em;
        }

        /* ── Divider ── */
        .rp-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          margin: 0 auto 40px;
        }

        /* ── Grid ── */
        .rp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;
        }

        /* ── Card ── */
        .rp-card {
          background: rgba(15,17,23,0.78);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(239,68,68,0.1);
          border-radius: 20px;
          padding: 20px;
          text-align: center;
          color: rgba(232,234,240,0.88);
          cursor: pointer;
          transition:
            transform 0.35s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s cubic-bezier(0.22,1,0.36,1),
            border-color 0.35s ease;
          box-shadow: 0 4px 20px rgba(0,0,0,0.35);
          will-change: transform;
        }

        .rp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(0,0,0,0.5), 0 0 0 1px rgba(239,68,68,0.14);
          border-color: rgba(239,68,68,0.18);
        }

        .rp-card-img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 14px;
          display: block;
          opacity: 0.82;
          filter: grayscale(15%);
        }

        .rp-card-name {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: rgba(232,234,240,0.85);
          margin: 0 0 4px;
        }

        .rp-card-price {
          font-size: 17px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(232,234,240,0.75);
          margin: 0 0 6px;
        }

        .rp-card-qty {
          font-size: 12px;
          font-weight: 400;
          color: rgba(232,234,240,0.32);
          letter-spacing: 0.02em;
        }

        /* ── Deleted badge on card ── */
        .rp-deleted-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.15);
          color: rgba(239,68,68,0.7);
          margin-bottom: 12px;
        }

        .rp-deleted-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(239,68,68,0.6);
        }

        /* ── Empty state ── */
        .rp-empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 80px 40px;
          background: rgba(15,17,23,0.55);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          text-align: center;
        }

        .rp-empty-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }

        .rp-empty-icon svg {
          width: 20px;
          height: 20px;
          stroke: rgba(232,234,240,0.22);
          fill: none;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .rp-empty-title {
          font-size: 16px;
          font-weight: 600;
          color: rgba(232,234,240,0.45);
          letter-spacing: -0.01em;
        }

        .rp-empty-desc {
          font-size: 13px;
          font-weight: 400;
          color: rgba(232,234,240,0.24);
        }

        /* ── Toast ── */
        .rp-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          background: rgba(8,20,12,0.97);
          border: 1px solid rgba(34,197,94,0.22);
          color: rgba(100,220,140,0.92);
          padding: 14px 22px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          z-index: 2000;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.5);
          animation: rp-fadeMsg 1.8s ease forwards;
        }

        @keyframes rp-fadeMsg {
          0%   { opacity: 0; transform: translateY(-8px); }
          12%  { opacity: 1; transform: translateY(0); }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes fadeMessage {
          0%   { opacity: 0; transform: translateY(-10px); }
          15%  { opacity: 1; transform: translateY(0px); }
          85%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) { .rp-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 820px)  {
          .rp-root { padding: 0 20px 80px; }
          .rp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px)  { .rp-grid { grid-template-columns: 1fr; } }
      `}</style>

      <div className="rp-root">

        {/* ── Toast ── */}
        {restoreMessage && (
          <div className="rp-toast">{restoreMessage}</div>
        )}

        {/* ── Header ── */}
        <header className="rp-header">
          <div className="rp-eyebrow">
            <span className="rp-eyebrow-dot" />
            Archive
          </div>
          <h1 className="rp-title">Removed Products</h1>
          <p className="rp-subtitle">Products that have been deleted from your active inventory.</p>
        </header>

        <div className="rp-divider" />

        {/* ── Grid ── */}
        <div className="rp-grid">
          {products.length === 0 ? (
            <div className="rp-empty">
              <div className="rp-empty-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                </svg>
              </div>
              <p className="rp-empty-title">Nothing removed</p>
              <p className="rp-empty-desc">Deleted products will appear here.</p>
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="rp-card"
                onClick={() => openDeletedDetails(product)}
              >
                <div className="rp-deleted-badge">
                  <span className="rp-deleted-dot" />
                  Removed
                </div>
                <img
                  className="rp-card-img"
                  src={`http://localhost:5037${product.imageUrl}`}
                  alt={product.name}
                />
                <p className="rp-card-name">{product.name}</p>
                <p className="rp-card-price">₹{product.price}</p>
                <p className="rp-card-qty">Qty: {product.quantity}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}

export default RemovedProducts;
