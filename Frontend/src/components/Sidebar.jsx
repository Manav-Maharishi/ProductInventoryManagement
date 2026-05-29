import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaBoxOpen,
  FaInfoCircle,
  FaChartPie,
  FaChevronDown,
  FaBars,
  FaTrash,
  FaSignInAlt,
  FaSignOutAlt,
  FaFileAlt,
  FaHistory,
} from "react-icons/fa";

function Sidebar({ sidebarOpen, setSidebarOpen, setSelectedCategory, categories }) {
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const token = localStorage.getItem("token");

  const linkStyle = {
    fontFamily: "'DM Sans', sans-serif",
    color: "rgba(232,234,240,0.75)",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "11px 14px",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "500",
    letterSpacing: "0.01em",
    transition: "background 0.2s ease, color 0.2s ease, transform 0.2s cubic-bezier(0.22,1,0.36,1)",
    cursor: "pointer",
    border: "1px solid transparent",
  };

  const hoverHandlers = (color = "rgba(232,234,240,0.92)") => ({
    onMouseEnter: (e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      e.currentTarget.style.color = color;
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
      e.currentTarget.style.transform = "translateX(2px)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color =
        color === "#ef4444" ? "#ef4444" : color === "#22c55e" ? "#22c55e" : "rgba(232,234,240,0.75)";
      e.currentTarget.style.borderColor = "transparent";
      e.currentTarget.style.transform = "translateX(0)";
    },
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');

        .sidebar-toggle {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 1100;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          background: rgba(15,17,23,0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: rgba(232,234,240,0.7);
          cursor: pointer;
          font-size: 15px;
          transition: background 0.25s ease, color 0.25s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.25s ease;
        }

        .sidebar-toggle:hover {
          background: rgba(255,255,255,0.07);
          color: rgba(232,234,240,0.95);
          border-color: rgba(255,255,255,0.13);
          transform: translateY(-1px);
        }

        .sidebar-panel {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          background: rgba(12,14,19,0.88);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid rgba(255,255,255,0.06);
          box-shadow: 4px 0 40px rgba(0,0,0,0.4);
          transition: transform 0.45s cubic-bezier(0.22,1,0.36,1);
          padding: 0;
          z-index: 1050;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .sidebar-panel--closed {
          transform: translateX(-100%);
        }

        .sidebar-panel--open {
          transform: translateX(0);
        }

        .sidebar-header {
          padding: 24px 20px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          margin-bottom: 8px;
        }

        .sidebar-wordmark {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.3);
        }

        .sidebar-nav {
          padding: 8px 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .sidebar-section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.25);
          padding: 16px 14px 6px;
        }

        .sidebar-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 8px 14px;
        }

        .dropdown-item {
          font-family: 'DM Sans', sans-serif;
          color: rgba(232,234,240,0.45);
          text-decoration: none;
          display: block;
          padding: 8px 14px 8px 40px;
          font-size: 13px;
          font-weight: 400;
          border-radius: 8px;
          transition: background 0.2s ease, color 0.2s ease;
          letter-spacing: 0.01em;
        }

        .dropdown-item:hover {
          background: rgba(255,255,255,0.04);
          color: rgba(232,234,240,0.75);
        }

        .dropdown-container {
          display: flex;
          flex-direction: column;
          gap: 1px;
          margin-top: 2px;
          overflow: hidden;
        }

        .sidebar-footer {
          padding: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .icon-wrapper {
          width: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          opacity: 0.7;
        }
      `}</style>

      {/* Toggle button */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        <FaBars />
      </button>

      {/* Sidebar panel */}
      <div className={`sidebar-panel ${sidebarOpen ? "sidebar-panel--open" : "sidebar-panel--closed"}`}>

        {/* Header */}
        <div className="sidebar-header" style={{ paddingTop: "72px" }}>
          <span className="sidebar-wordmark">Inventory</span>
        </div>

        {/* Nav links */}
        <div className="sidebar-nav">

          {token ? (
            <>
              <span className="sidebar-section-label">Overview</span>

              <Link
                to="/dashboard"
                style={linkStyle}
                onClick={() => setSidebarOpen(false)}
                {...hoverHandlers()}
              >
                <span className="icon-wrapper"><FaChartPie /></span>
                Dashboard
              </Link>

              <Link
                to="/"
                style={linkStyle}
                onClick={() => setSidebarOpen(false)}
                {...hoverHandlers()}
              >
                <span className="icon-wrapper"><FaHome /></span>
                Home
              </Link>
              <Link
to="/reports"

style={linkStyle}

onClick={()=>
setSidebarOpen(false)
}

{...hoverHandlers()}
>

<span className="icon-wrapper">

<FaFileAlt/>

</span>

Reports

</Link>

              <div className="sidebar-divider" />
              <span className="sidebar-section-label">Catalogue</span>

              {/* Products dropdown */}
              <div>
                <div
                  style={linkStyle}
                  onClick={() => setProductsDropdownOpen(!productsDropdownOpen)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                    e.currentTarget.style.color = "rgba(232,234,240,0.92)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                    e.currentTarget.style.transform = "translateX(2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(232,234,240,0.75)";
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span className="icon-wrapper"><FaBoxOpen /></span>
                  Products
                  <FaChevronDown
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      opacity: 0.5,
                      transform: productsDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                </div>

                {productsDropdownOpen && (
                  <div className="dropdown-container">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        to="/products"
                        className="dropdown-item"
                        onClick={() => {
                          setSelectedCategory(category);
                          setSidebarOpen(false);
                        }}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="sidebar-divider" />
              <span className="sidebar-section-label">More</span>

              <Link
                to="/removedproducts"
                style={linkStyle}
                onClick={() => setSidebarOpen(false)}
                {...hoverHandlers()}
              >
                <span className="icon-wrapper"><FaTrash /></span>
                Removed Products
              </Link>

              <Link
  to="/activity"
  style={linkStyle}
  onClick={() => setSidebarOpen(false)}
  {...hoverHandlers()}
>
  <span className="icon-wrapper">
    <FaHistory />
  </span>

  Activity
</Link>

              <Link
                to="/about"
                style={linkStyle}
                onClick={() => setSidebarOpen(false)}
                {...hoverHandlers()}
              >
                <span className="icon-wrapper"><FaInfoCircle /></span>
                About
              </Link>

              {/* Footer: logout */}
              <div style={{ flex: 1 }} />
            </>
          ) : (
            <Link
              to="/auth"
              style={{ ...linkStyle, color: "#22c55e" }}
              onClick={() => setSidebarOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(34,197,94,0.08)";
                e.currentTarget.style.borderColor = "rgba(34,197,94,0.15)";
                e.currentTarget.style.transform = "translateX(2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span className="icon-wrapper" style={{ opacity: 1 }}><FaSignInAlt /></span>
              Login / Signup
            </Link>
          )}
        </div>

        {/* Footer (logout only when authenticated) */}
        {token && (
          <div className="sidebar-footer">
            <Link
              to="/logout"
              style={{ ...linkStyle, color: "rgba(239,68,68,0.7)" }}
              onClick={() => setSidebarOpen(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239,68,68,0.07)";
                e.currentTarget.style.color = "#ef4444";
                e.currentTarget.style.borderColor = "rgba(239,68,68,0.12)";
                e.currentTarget.style.transform = "translateX(2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "rgba(239,68,68,0.7)";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <span className="icon-wrapper" style={{ opacity: 1 }}><FaSignOutAlt /></span>
              Logout
            </Link>
          </div>
        )}

      </div>
    </>
  );
}

export default Sidebar;