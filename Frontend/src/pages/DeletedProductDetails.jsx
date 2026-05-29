import { useLocation, useNavigate } from "react-router-dom";

function DeletedProductDetails() {
  const location = useLocation();
  const navigate  = useNavigate();

  const params   = new URLSearchParams(location.search);
  const id       = params.get("id");
  const name     = params.get("name");
  const price    = params.get("price");
  const category = params.get("category");
  const quantity = params.get("quantity");
  const image    = params.get("image");

  const token = localStorage.getItem("token");

  async function restoreProduct() {
    try {
      const response = await fetch(
        `http://localhost:5037/api/products/restore/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!response.ok) { console.log("Restore failed"); return; }
      localStorage.setItem("restoreMessage", "Product back in inventory");
      navigate("/removedproducts");
    } catch (error) {
      console.log(error);
    }
  }

  const qty = Number(quantity);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .dpd-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 40px;
          background: #0a0b0f;
          font-family: 'DM Sans', sans-serif;
          color: rgba(232,234,240,0.88);
          position: relative;
          overflow: hidden;
        }

        .dpd-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,  rgba(120,50,50,0.09) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(60,70,120,0.06) 0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Main card ── */
        .dpd-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1060px;
          background: rgba(15,17,23,0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(239,68,68,0.1);
          border-radius: 28px;
          padding: 48px;
          display: flex;
          gap: 52px;
          align-items: flex-start;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset;
          animation: dpd-fadeIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes dpd-fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Image frame ── */
        .dpd-image-frame {
          flex-shrink: 0;
          width: 420px;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(239,68,68,0.1);
          background: rgba(255,255,255,0.02);
          box-shadow: 0 12px 40px rgba(0,0,0,0.45);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .dpd-image-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.55), 0 0 0 1px rgba(239,68,68,0.14);
        }

        .dpd-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.8;
          filter: grayscale(20%);
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .dpd-image-frame:hover img {
          opacity: 0.92;
          filter: grayscale(8%);
        }

        /* ── Info side ── */
        .dpd-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* Eyebrow */
        .dpd-eyebrow {
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
        }

        .dpd-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(239,68,68,0.55);
          flex-shrink: 0;
        }

        /* Title */
        .dpd-title {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: rgba(232,234,240,0.82);
          margin: 0 0 20px;
          word-break: break-word;
        }

        /* Divider */
        .dpd-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(239,68,68,0.1), transparent);
          margin: 20px 0;
        }

        /* Meta rows */
        .dpd-meta-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-bottom: 18px;
        }

        .dpd-meta-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.25);
        }

        /* Category pill */
        .dpd-category-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(232,234,240,0.55);
          width: fit-content;
        }

        /* Price */
        .dpd-price {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: rgba(232,234,240,0.78);
        }

        /* Quantity row */
        .dpd-qty-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px;
          margin-bottom: 16px;
        }

        .dpd-qty-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.25);
          flex: 1;
        }

        .dpd-qty-value {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(232,234,240,0.78);
        }

        /* Deleted status badge */
        .dpd-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.16);
          color: rgba(239,68,68,0.75);
          margin-bottom: 28px;
          width: fit-content;
        }

        .dpd-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(239,68,68,0.6);
          flex-shrink: 0;
        }

        /* ── Buttons ── */
        .dpd-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .dpd-btn-restore {
          padding: 13px 26px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(100,220,140,0.9);
          background: rgba(34,197,94,0.07);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }

        .dpd-btn-restore:hover {
          background: rgba(34,197,94,0.13);
          border-color: rgba(34,197,94,0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .dpd-card {
            flex-direction: column;
            align-items: center;
            padding: 32px 24px;
            gap: 32px;
          }
          .dpd-image-frame { width: 100%; height: 300px; }
        }

        @media (max-width: 500px) {
          .dpd-root { padding: 40px 16px; }
          .dpd-image-frame { height: 240px; }
        }
      `}</style>

      <div className="dpd-root">
        <div className="dpd-card">

          {/* ── Image ── */}
          <div className="dpd-image-frame">
            <img src={`http://localhost:5037${image}`} alt={name} />
          </div>

          {/* ── Info ── */}
          <div className="dpd-info">

            <div className="dpd-eyebrow">
              <span className="dpd-eyebrow-dot" />
              Removed Product
            </div>

            <h1 className="dpd-title">{name}</h1>

            <div className="dpd-divider" />

            {/* Category */}
            <div className="dpd-meta-row">
              <span className="dpd-meta-label">Category</span>
              <span className="dpd-category-pill">{category}</span>
            </div>

            {/* Price */}
            <div className="dpd-meta-row">
              <span className="dpd-meta-label">Price</span>
              <span className="dpd-price">₹{price}</span>
            </div>

            <div className="dpd-divider" />

            {/* Quantity (read-only) */}
            <div className="dpd-qty-card">
              <span className="dpd-qty-label">Quantity at removal</span>
              <span className="dpd-qty-value">{quantity}</span>
            </div>

            {/* Deleted status */}
            <div className="dpd-status-badge">
              <span className="dpd-status-dot" />
              Removed from inventory
            </div>

            {/* Actions */}
            <div className="dpd-actions">
              <button className="dpd-btn-restore" onClick={restoreProduct}>
                Restore Product
              </button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default DeletedProductDetails;
