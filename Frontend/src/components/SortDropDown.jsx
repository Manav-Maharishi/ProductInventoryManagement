function SortDropdown({ sortDropdownOpen, setSortDropdownOpen, setSortOption }) {
  const options = [
    { label: "Quantity — High to Low", value: "quantityHigh" },
    { label: "Quantity — Low to High", value: "quantityLow" },
    { label: "Price — High to Low",    value: "priceHigh"    },
    { label: "Price — Low to High",    value: "priceLow"     },
  ];

  return (
    <>
      <style>{`
        .sd-wrap {
  position: relative;
  z-index: 10000;
  font-family: 'DM Sans', sans-serif;
}

        .sd-trigger {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(232,234,240,0.75);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          cursor: pointer;
          white-space: nowrap;
          transition:
            background   0.25s ease,
            border-color 0.25s ease,
            color        0.25s ease;
        }

        .sd-trigger:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.13);
          color: rgba(232,234,240,0.92);
        }

        .sd-trigger-icon {
          font-size: 11px;
          opacity: 0.5;
        }

        .sd-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 210px;
          background: rgba(13,15,21,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 10001;
          box-shadow: 0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset;
        }

        .sd-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.25);
          padding: 8px 10px 4px;
        }

        .sd-item {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 9px 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(232,234,240,0.62);
          background: transparent;
          border: none;
          border-radius: 9px;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .sd-item:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(232,234,240,0.9);
        }

        .sd-item-arrow {
          font-size: 11px;
          opacity: 0.35;
          margin-left: auto;
          flex-shrink: 0;
        }
      `}</style>

      <div className="sd-wrap">
        <button
          className="sd-trigger"
          onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <line x1="2" y1="5" x2="9" y2="5"/>
            <line x1="2" y1="9" x2="7" y2="9"/>
            <line x1="2" y1="13" x2="5" y2="13"/>
            <polyline points="12,2 14,5 12,8"/>
            <line x1="14" y1="5" x2="10" y2="5"/>
          </svg>
          Sort
          <span className="sd-trigger-icon">{sortDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {sortDropdownOpen && (
          <div className="sd-panel">
            <span className="sd-section-label">Sort by</span>
            {options.map((opt) => (
              <button
                key={opt.value}
                className="sd-item"
                onClick={() => { setSortOption(opt.value); setSortDropdownOpen(false); }}
              >
                {opt.label}
                <span className="sd-item-arrow">↵</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SortDropdown;
