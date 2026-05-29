function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <>
      <style>{`
        .sb-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .sb-icon {
          position: absolute;
          left: 13px;
          width: 14px;
          height: 14px;
          pointer-events: none;
          color: rgba(232,234,240,0.28);
          flex-shrink: 0;
        }

        .sb-input {
          width: 260px;
          padding: 10px 16px 10px 36px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: rgba(232,234,240,0.88);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          outline: none;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition:
            border-color 0.25s ease,
            background   0.25s ease,
            box-shadow   0.3s cubic-bezier(0.22,1,0.36,1);
          box-sizing: border-box;
        }

        .sb-input::placeholder {
          color: rgba(232,234,240,0.22);
          font-weight: 400;
        }

        .sb-input:hover {
          border-color: rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.05);
        }

        .sb-input:focus {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(255,255,255,0.04);
        }
      `}</style>

      <div className="sb-wrap">
        <svg className="sb-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7" cy="7" r="4.5"/>
          <line x1="10.5" y1="10.5" x2="14" y2="14"/>
        </svg>
        <input
          className="sb-input"
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
}

export default SearchBar;
