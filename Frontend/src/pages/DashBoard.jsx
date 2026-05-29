import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useEffect, useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5037/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const plentyCount = products.filter((p) => p.quantity > 30).length;
  const mediumCount = products.filter((p) => p.quantity >= 10 && p.quantity <= 30).length;
  const lowCount    = products.filter((p) => p.quantity < 10).length;

  const chartData = [
    { name: "Plenty", value: plentyCount },
    { name: "Medium", value: mediumCount },
    { name: "Low",    value: lowCount    },
  ];

  // Original palette (preserved)
  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  // Premium monochromatic blue palette
  const CHART_COLORS = ["#243B6B", "#4F78C8", "#9ED8FF"];

  const total = products.length;

  // ── Custom tooltip ──
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const pct = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
      return (
        <div className="db-tooltip">
          <span className="db-tooltip-label">{name}</span>
          <span className="db-tooltip-value">
            {value} <span className="db-tooltip-pct">({pct}%)</span>
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        /* ── Root ── */
        .db-root {
          min-height: 100vh;
          background: #0a0b0f;
          font-family: 'DM Sans', sans-serif;
          color: rgba(232,234,240,0.92);
          padding: 0 40px 96px;
          position: relative;
          overflow-x: hidden;
        }

        .db-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,  rgba(90,100,160,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(60,70,120,0.07)  0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .db-root > * { position: relative; z-index: 1; }

        /* ── Header ── */
        .db-header {
          padding-top: 100px;
          text-align: center;
          margin-bottom: 56px;
        }

        .db-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.3);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 24px;
          background: rgba(255,255,255,0.02);
        }

        .db-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(79,120,200,0.85);
        }

        .db-title {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: rgba(232,234,240,0.93);
          margin: 0 0 14px;
        }

        .db-subtitle {
          font-size: 15px;
          font-weight: 400;
          color: rgba(232,234,240,0.4);
          max-width: 420px;
          margin: 0 auto;
          line-height: 1.75;
          letter-spacing: 0.01em;
        }

        /* ── Divider ── */
        .db-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          max-width: 860px;
          margin: 0 auto 56px;
        }

        /* ── Chart hero ── */
        .db-chart-hero {
          display: flex;
          justify-content: center;
          margin: 0 auto 56px;
          max-width: 680px;
        }

        .db-chart-card {
          width: 100%;
          background: rgba(15,17,23,0.78);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 28px;
          padding: 44px 44px 36px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.02) inset;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .db-chart-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 56px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08);
        }

        .db-chart-header {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 36px;
        }

        .db-chart-title {
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: rgba(232,234,240,0.88);
        }

        .db-chart-caption {
          font-size: 12px;
          font-weight: 400;
          color: rgba(232,234,240,0.32);
          letter-spacing: 0.01em;
        }

        /* chart render area — fixed, never clipped */
        .db-chart-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          /* give the SVG room so outerRadius=140 + any label never clips */
          min-height: 340px;
        }

        /* legend rendered outside recharts */
        .db-legend-outer {
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 28px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.05);
          flex-wrap: wrap;
        }

        .db-legend-item {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .db-legend-swatch {
          width: 10px;
          height: 10px;
          border-radius: 3px;
          flex-shrink: 0;
        }

        .db-legend-name {
          font-size: 12px;
          font-weight: 500;
          color: rgba(232,234,240,0.5);
          letter-spacing: 0.02em;
        }

        .db-legend-count {
          font-size: 12px;
          font-weight: 700;
          color: rgba(232,234,240,0.82);
          letter-spacing: -0.01em;
          margin-left: 2px;
        }

        /* ── Tooltip ── */
        .db-tooltip {
          background: rgba(12,14,20,0.97);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          backdrop-filter: blur(20px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.5);
        }

        .db-tooltip-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.35);
        }

        .db-tooltip-value {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(232,234,240,0.93);
        }

        .db-tooltip-pct {
          font-size: 13px;
          font-weight: 400;
          color: rgba(232,234,240,0.4);
        }

        /* ── Metric cards ── */
        .db-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 680px;
          margin: 0 auto 0;
        }

        .db-metric-card {
          background: rgba(15,17,23,0.78);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s cubic-bezier(0.22,1,0.36,1);
        }

        .db-metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.08);
        }

        .db-metric-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.28);
        }

        .db-metric-value {
          font-size: 36px;
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1;
          color: rgba(232,234,240,0.92);
        }

        .db-metric-desc {
          font-size: 11px;
          font-weight: 400;
          color: rgba(232,234,240,0.28);
          margin-top: 1px;
        }

        .db-metric-bar {
          height: 2px;
          border-radius: 2px;
          margin-top: 14px;
          opacity: 0.45;
        }

        /* ── Responsive ── */
        @media (max-width: 720px) {
          .db-root      { padding: 0 20px 80px; }
          .db-chart-card { padding: 32px 24px 28px; }
          .db-metrics   { grid-template-columns: 1fr 1fr; max-width: 100%; }
          .db-chart-hero { max-width: 100%; }
        }

        @media (max-width: 480px) {
          .db-metrics { grid-template-columns: 1fr; }
          .db-legend-outer { gap: 20px; }
        }
      `}</style>

      <div className="db-root">

        {/* ── Header ── */}
        <header className="db-header">
          <div className="db-eyebrow">
            <span className="db-eyebrow-dot" />
            Analytics
          </div>
          <h1 className="db-title">Inventory Dashboard</h1>
          <p className="db-subtitle">
            Real-time overview of stock levels and distribution across your product catalogue.
          </p>
        </header>

        <div className="db-divider" />

        {/* ── Chart hero (primary focus) ── */}
        <div className="db-chart-hero">
          <div className="db-chart-card">

            <div className="db-chart-header">
              <span className="db-chart-title">Stock Distribution</span>
              <span className="db-chart-caption">Breakdown by quantity threshold</span>
            </div>

            {/* Fixed-size PieChart — outerRadius + padding never clips */}
            <div className="db-chart-wrap">
              <PieChart width={340} height={340}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  innerRadius={70}
                  dataKey="value"
                  strokeWidth={0}
                  paddingAngle={4}
                  isAnimationActive={true}
                  animationBegin={0}
                  animationDuration={900}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={index} fill={CHART_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </div>

            {/* Legend lives outside PieChart — no clipping risk */}
            <div className="db-legend-outer">
              {chartData.map((entry, i) => (
                <div key={i} className="db-legend-item">
                  <span className="db-legend-swatch" style={{ background: CHART_COLORS[i] }} />
                  <span className="db-legend-name">{entry.name}</span>
                  <span className="db-legend-count">{entry.value}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ── Metric cards (below chart) ── */}
        <div className="db-metrics">
          <div className="db-metric-card">
            <span className="db-metric-label">Total Products</span>
            <span className="db-metric-value">{total}</span>
            <span className="db-metric-desc">All tracked SKUs</span>
            <div className="db-metric-bar" style={{ background: "#4F78C8" }} />
          </div>
          <div className="db-metric-card">
            <span className="db-metric-label">Well Stocked</span>
            <span className="db-metric-value">{plentyCount}</span>
            <span className="db-metric-desc">Quantity above 30</span>
            <div className="db-metric-bar" style={{ background: "#243B6B" }} />
          </div>
          <div className="db-metric-card">
            <span className="db-metric-label">Low Stock</span>
            <span className="db-metric-value">{lowCount}</span>
            <span className="db-metric-desc">Quantity below 10</span>
            <div className="db-metric-bar" style={{ background: "#9ED8FF" }} />
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
