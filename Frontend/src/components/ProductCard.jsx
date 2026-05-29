import { useNavigate } from "react-router-dom";

function ProductCard({ product, setProducts }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  async function updateQuantity(change, e) {
    e.stopPropagation();
    try {
      const response = await fetch(
        `http://localhost:5037/api/products/${product.id}/quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ Change: change, RowVersion: product.rowVersion }),
        }
      );

      if (response.status === 409) {
        alert("This product was modified by another admin. Refresh and try again.");
        return;
      }
      if (!response.ok) { console.log("Quantity update failed"); return; }

      const updatedProduct = await response.json();
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
    } catch (error) {
      console.log(error);
    }
  }

  function openDetails() {
    navigate(
      `/productdetails?id=${product.id}&name=${product.name}&price=${product.price}&category=${product.category}&quantity=${product.quantity}&image=${product.imageUrl}`
    );
  }

  const stockColor =
    product.quantity > 30
      ? "rgba(74,165,110,0.85)"
      : product.quantity >= 10
      ? "rgba(200,155,60,0.85)"
      : "rgba(210,70,70,0.85)";

  const stockLabel =
    product.quantity > 30
      ? "Plenty In Stock"
      : product.quantity >= 10
      ? "Medium In Stock"
      : "Low In Stock";

  return (
    <>
      <style>{`
        .pc-card {
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
          color: white;
          cursor: pointer;
          transition:
            transform 0.35s cubic-bezier(0.22,1,0.36,1),
            box-shadow 0.35s cubic-bezier(0.22,1,0.36,1);
          will-change: transform;
        }

        .pc-card:hover {
          transform: translateY(-5px);
          box-shadow:
            0 16px 36px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.1);
        }

        .pc-qty-btn {
          border: none;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          font-weight: bold;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease;
        }

        .pc-qty-btn:hover { opacity: 0.8; }
      `}</style>

      <div className="pc-card" onClick={openDetails}>
        <img
          src={`http://localhost:5037${product.imageUrl}`}
          width="200"
          height="200"
          style={{ objectFit: "cover", borderRadius: "12px" }}
        />

        <h2>{product.name}</h2>
        <h3>₹{product.price}</h3>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          <button
            className="pc-qty-btn"
            style={{ background: "#ef4444" }}
            onClick={(e) => updateQuantity(-1, e)}
          >
            −
          </button>

          <span style={{ fontSize: "18px", fontWeight: "bold", minWidth: "25px", textAlign: "center" }}>
            {product.quantity}
          </span>

          <button
            className="pc-qty-btn"
            style={{ background: "#22c55e" }}
            onClick={(e) => updateQuantity(1, e)}
          >
            +
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginTop: "15px",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: stockColor,
              flexShrink: 0,
            }}
          />
          <span style={{ color: stockColor }}>{stockLabel}</span>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
