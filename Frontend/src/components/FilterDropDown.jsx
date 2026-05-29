function FilterDropdown({
  filterDropdownOpen,
  setFilterDropdownOpen,
  setStockFilter,
  setCategoryFilter,
  setWarehouseFilter,
  categories = [],
}) {
  return (
    <>
      <style>{`
        .fd-wrap {
  position: relative;
  z-index: 10000;
  font-family: 'DM Sans', sans-serif;
}

        .fd-trigger {
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

        .fd-trigger:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.13);
          color: rgba(232,234,240,0.92);
        }

        .fd-trigger-icon {
          font-size: 11px;
          opacity: 0.5;
        }

        .fd-panel {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          width: 230px;
          background: rgba(13,15,21,0.97);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          z-index: 10001;
          box-shadow: 0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.03) inset;
        }

        .fd-section-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.25);
          padding: 8px 10px 4px;
        }

        .fd-sep {
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 6px 0;
        }

        .fd-item {
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

        .fd-item:hover {
          background: rgba(255,255,255,0.05);
          color: rgba(232,234,240,0.9);
        }

        .fd-item-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .fd-item-reset {
          color: rgba(232,234,240,0.3);
          font-size: 12px;
        }

        .fd-item-reset:hover {
          color: rgba(232,234,240,0.6);
        }
      `}</style>

      <div className="fd-wrap">
        <button
          className="fd-trigger"
          onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="2" y1="4" x2="14" y2="4"/>
            <line x1="4" y1="8" x2="12" y2="8"/>
            <line x1="6" y1="12" x2="10" y2="12"/>
          </svg>
          Filter
          <span className="fd-trigger-icon">{filterDropdownOpen ? "▲" : "▼"}</span>
        </button>

        {filterDropdownOpen && (
          <div className="fd-panel">

            <span className="fd-section-label">By Stock</span>

            <button className="fd-item" onClick={() => { setStockFilter("Plenty"); setFilterDropdownOpen(false); }}>
              <span className="fd-item-dot" style={{ background: "rgba(74,165,110,0.8)" }} />
              Plenty In Stock
            </button>
            <button className="fd-item" onClick={() => { setStockFilter("Medium"); setFilterDropdownOpen(false); }}>
              <span className="fd-item-dot" style={{ background: "rgba(200,155,60,0.8)" }} />
              Medium In Stock
            </button>
            <button className="fd-item" onClick={() => { setStockFilter("Low"); setFilterDropdownOpen(false); }}>
              <span className="fd-item-dot" style={{ background: "rgba(210,70,70,0.8)" }} />
              Low In Stock
            </button>
            <button className="fd-item fd-item-reset" onClick={() => { setStockFilter("All"); setFilterDropdownOpen(false); }}>
              Clear stock filter
            </button>

            <div className="fd-sep" />

            <span className="fd-section-label">By Category</span>

            {categories
              .filter((c) => c !== "All")
              .map((category) => (
                <button
                  key={category}
                  className="fd-item"
                  onClick={() => { setCategoryFilter(category); setFilterDropdownOpen(false); }}
                >
                  <span className="fd-item-dot" style={{ background: "rgba(79,120,200,0.7)" }} />
                  {category}
                </button>
              ))}

            <button className="fd-item fd-item-reset" onClick={() => { setCategoryFilter("All"); setFilterDropdownOpen(false); }}>
              All categories
            </button>

            <div className="fd-sep" />

<span className="fd-section-label">
  By Warehouse
</span>

<button
  className="fd-item"
  onClick={() => {
    setWarehouseFilter(1);
    setFilterDropdownOpen(false);
  }}
>
  <span
    className="fd-item-dot"
    style={{
      background:
        "rgba(120,180,255,0.8)"
    }}
  />
  Warehouse 1
</button>

<button
  className="fd-item"
  onClick={() => {
    setWarehouseFilter(2);
    setFilterDropdownOpen(false);
  }}
>
  <span
    className="fd-item-dot"
    style={{
      background:
        "rgba(170,120,255,0.8)"
    }}
  />
  Warehouse 2
</button>

<button
className="fd-item fd-item-reset"
onClick={() => {
setWarehouseFilter("All");
setFilterDropdownOpen(false);
}}
>
All warehouses
</button>

          </div>
        )}
      </div>
    </>
  );
}

export default FilterDropdown;
