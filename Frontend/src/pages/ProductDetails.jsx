import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const params   = new URLSearchParams(location.search);
  const id       = params.get("id");
  const name     = params.get("name");
  const price    = params.get("price");
  const category = params.get("category");
  const image    = params.get("image");

  const token = localStorage.getItem("token");

  const [quantity, setQuantity] = useState(0);

const [rowVersion, setRowVersion] =
useState(null);

const [warehouseId, setWarehouseId] =
useState(null);

const [isEditingQuantity,
setIsEditingQuantity] =
useState(false);

const [editedQuantity,
setEditedQuantity] =
useState("");

  useEffect(() => {
    fetch("http://localhost:5037/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const current = data.find((p) => p.id === Number(id));
        if (current) {
          setQuantity(current.quantity);
          setRowVersion(current.rowVersion);
          setWarehouseId(current.warehouseId);
        }
      });
  }, []);

  async function updateQuantity(change) {
    try {
      const response = await fetch(
        `http://localhost:5037/api/products/${id}/quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ Change: change, RowVersion: rowVersion }),
        }
      );

      if (response.status === 409) {
        alert("This product was modified by another admin. Refresh and try again.");
        return;
      }
      if (!response.ok) { console.log("Quantity update failed"); return; }

      const updatedProduct = await response.json();
      setQuantity(updatedProduct.quantity);
      setRowVersion(updatedProduct.rowVersion);
    } catch (error) {
      console.log(error);
    }
  }

  async function editQuantity()
{
const value =
Number(
editedQuantity
);

if (
editedQuantity === ""
||
!Number.isInteger(
value
)
||
value < 0
)
{
alert(
"Please enter positive number"
);

return;
}

const change =
value -
quantity;

try
{
const response =
await fetch(
`http://localhost:5037/api/products/${id}/quantity`,
{
method:"PUT",

headers:{
"Content-Type":
"application/json",

Authorization:
`Bearer ${token}`
},

body:
JSON.stringify({
Change:
change,

RowVersion:
rowVersion
})
}
);

if (
response.status === 409
)
{
alert(
"This product was modified by another admin. Refresh and try again."
);

return;
}

if (
!response.ok
)
{
alert(
"Quantity update failed"
);

return;
}

const updated =
await response.json();

setQuantity(
updated.quantity
);

setRowVersion(
updated.rowVersion
);

setEditedQuantity(
""
);

setIsEditingQuantity(
false
);

}
catch
{
alert(
"Update failed"
);
}
}

  async function deleteProduct() {
    try {
      const response = await fetch(
        `http://localhost:5037/api/products/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) { console.log("Delete failed"); return; }

      localStorage.setItem("deleteMessage", "Product removed from inventory");
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  }

  const stockColor =
quantity > 30
? {
bg: "rgba(34,197,94,0.10)",
border: "rgba(34,197,94,0.18)",
text: "rgba(34,197,94,0.92)",
dot: "#22c55e"
}
      : quantity >= 10
      ? { bg: "rgba(180,130,40,0.10)", border: "rgba(200,150,50,0.22)", text: "rgba(220,180,80,0.9)",  dot: "#c8a83c" }
      : { bg: "rgba(180,50,50,0.10)",  border: "rgba(210,70,70,0.22)",  text: "rgba(230,110,110,0.9)", dot: "#c85050" };

  const stockLabel =
    quantity > 30 ? "Plenty In Stock" : quantity >= 10 ? "Medium In Stock" : "Low In Stock";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        .pd-root {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 60px 40px;
          background: #0a0b0f;
          font-family: 'DM Sans', sans-serif;
          color: rgba(232,234,240,0.92);
          position: relative;
          overflow: hidden;
        }

        .pd-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,  rgba(90,100,160,0.11) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(60,70,120,0.07)  0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Main card ── */
        .pd-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1060px;
          background: rgba(15,17,23,0.82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          padding: 48px;
          display: flex;
          gap: 52px;
          align-items: flex-start;
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset;
          animation: pd-fadeIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes pd-fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Image side ── */
        .pd-image-frame {
          flex-shrink: 0;
          width: 420px;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1);
        }

        .pd-image-frame:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 52px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.09);
        }

        .pd-image-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* ── Info side ── */
        .pd-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .pd-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.28);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          padding: 5px 14px;
          margin-bottom: 20px;
          background: rgba(255,255,255,0.02);
          width: fit-content;
        }

        .pd-header-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.pd-warehouse-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  padding: 6px 16px;

  border-radius: 100px;

  background:
    rgba(150,90,255,0.08);

  border:
    1px solid
    rgba(170,110,255,0.22);

  color:
    rgba(220,180,255,0.92);

  font-size: 13px;

  font-weight: 600;

  backdrop-filter: blur(16px);

  white-space: nowrap;
}

.pd-warehouse-icon {
  font-size: 14px;
}

        .pd-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(79,120,200,0.8);
          flex-shrink: 0;
        }

        .pd-title {
          font-size: clamp(26px, 3.5vw, 40px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.1;
          color: rgba(232,234,240,0.93);
          margin: 0 0 20px;
          word-break: break-word;
        }

        /* ── Divider ── */
        .pd-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.06), transparent);
          margin: 20px 0;
        }

        /* ── Meta rows ── */
        .pd-meta-row {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          margin-bottom: 18px;
        }

        .pd-meta-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.28);
        }

        .pd-meta-value {
          font-size: 16px;
          font-weight: 500;
          color: rgba(232,234,240,0.82);
          letter-spacing: -0.01em;
        }

        /* Category pill */
        .pd-category-pill {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.04em;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          color: rgba(232,234,240,0.65);
          width: fit-content;
        }

        /* Price */
        .pd-price {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -0.03em;
          color: rgba(232,234,240,0.92);
        }

        /* ── Quantity control ── */
        .pd-qty-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          margin-bottom: 18px;
        }

        .pd-qty-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(232,234,240,0.28);
          flex: 1;
        }

        .pd-qty-value {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(232,234,240,0.92);
          min-width: 32px;
          text-align: center;
        }

        .pd-qty-btn {
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 17px;
          font-weight: bold;
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.2s ease, transform 0.25s cubic-bezier(0.22,1,0.36,1);
          flex-shrink: 0;
        }

        .pd-qty-btn:hover { opacity: 0.78; transform: translateY(-1px); }

        .pd-qty-input {

width: 80px;

height: 34px;

border-radius: 10px;

border:
1px solid
rgba(
255,
255,
255,
0.12
);

background:
rgba(
255,
255,
255,
0.04
);

color:
rgba(
232,
234,
240,
0.92
);

font-size:
16px;

text-align:
center;

outline:
none;

font-family:
'DM Sans',
sans-serif;

}

.pd-edit-btn {

background:
rgba(
90,
120,
255,
0.16
);

}

.pd-edit-btn:hover {

background:
rgba(
90,
120,
255,
0.28
);

}

        /* ── Stock badge ── */
        .pd-stock-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          margin-bottom: 28px;
          width: fit-content;
          transition: opacity 0.3s ease;
        }

        .pd-stock-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* ── Delete button ── */
        .pd-delete-btn {
          padding: 13px 26px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(239,68,68,0.85);
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.18);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
          width: fit-content;
        }

        .pd-delete-btn:hover {
          background: rgba(239,68,68,0.13);
          border-color: rgba(239,68,68,0.28);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pd-card {
            flex-direction: column;
            align-items: center;
            padding: 32px 24px;
            gap: 32px;
          }

          .pd-image-frame {
            width: 100%;
            height: 300px;
          }
        }

        @media (max-width: 500px) {
          .pd-root { padding: 40px 16px; }
          .pd-image-frame { height: 240px; }
        }
      `}</style>

      <div className="pd-root">
        <div className="pd-card">

          {/* ── Image ── */}
          <div className="pd-image-frame">
            <img src={`http://localhost:5037${image}`} alt={name} />
          </div>

          {/* ── Info ── */}
          <div className="pd-info">

            <div className="pd-header-row">

  <div className="pd-eyebrow">
    Inventory Details
  </div>

  {warehouseId && (
    <div className="pd-warehouse-badge">

      <span className="pd-warehouse-icon">
        🏠
      </span>

      Warehouse {warehouseId}

    </div>
  )}

</div>

            <h1 className="pd-title">{name}</h1>

            <div className="pd-divider" />

            {/* Category */}
            <div className="pd-meta-row">
              <span className="pd-meta-label">Category</span>
              <span className="pd-category-pill">{category}</span>
            </div>

            {/* Price */}
            <div className="pd-meta-row">
              <span className="pd-meta-label">Price</span>
              <span className="pd-price">₹{price}</span>
            </div>

            <div className="pd-divider" />

            {/* Quantity control */}
            <div className="pd-qty-card">

<span className="pd-qty-label">
Quantity
</span>

<button
className="pd-qty-btn pd-edit-btn"

onClick={() => {

setEditedQuantity(
String(
quantity
)
);

setIsEditingQuantity(
true
);

}}
>

✎

</button>

<button
className="pd-qty-btn"

style={{
background:
"rgba(239,68,68,0.75)"
}}

onClick={() =>
updateQuantity(-1)
}
>

−

</button>

{
isEditingQuantity
?

(

<input

className="pd-qty-input"

value={
editedQuantity
}

autoFocus

onChange={(e)=>
setEditedQuantity(
e.target.value
)
}

onKeyDown={(e)=>{

if(
e.key ===
"Enter"
)
{
editQuantity();
}

if(
e.key ===
"Escape"
)
{
setIsEditingQuantity(
false
);
}

}}

type="number"

min="0"

/>

)

:

(

<span
className="pd-qty-value"
>

{quantity}

</span>

)

}

<button
className="pd-qty-btn"

style={{
background:
"rgba(74,165,110,0.75)"
}}

onClick={() =>
updateQuantity(1)
}
>

+

</button>

</div>

            {/* Stock badge */}
            <div
              className="pd-stock-badge"
              style={{
                background: stockColor.bg,
                border: `1px solid ${stockColor.border}`,
                color: stockColor.text,
              }}
            >
              <span className="pd-stock-dot" style={{ background: stockColor.dot }} />
              {stockLabel}
            </div>

            {/* Delete */}
            <button className="pd-delete-btn" onClick={deleteProduct}>
              Delete Product
            </button>

          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
