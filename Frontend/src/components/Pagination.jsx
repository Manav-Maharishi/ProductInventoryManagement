function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <>
      <style>{`
        .pg-wrap {
          margin-top: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          font-family: 'DM Sans', sans-serif;
        }

        .pg-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: rgba(232,234,240,0.65);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px;
          cursor: pointer;
          transition:
            background   0.25s ease,
            border-color 0.25s ease,
            color        0.25s ease,
            transform    0.3s cubic-bezier(0.22,1,0.36,1),
            box-shadow   0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .pg-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
          color: rgba(232,234,240,0.9);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .pg-btn:disabled {
          opacity: 0.25;
          cursor: not-allowed;
          transform: none;
        }

        .pg-info {
          padding: 9px 16px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(232,234,240,0.3);
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          white-space: nowrap;
        }

        .pg-info strong {
          color: rgba(232,234,240,0.65);
          font-weight: 600;
        }
      `}</style>

      <div className="pg-wrap">
        <button
          className="pg-btn"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>

        <span className="pg-info">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          className="pg-btn"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </>
  );
}

export default Pagination;
