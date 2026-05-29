import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SortDropdown from "../components/SortDropDown";
import FilterDropdown from "../components/FilterDropDown";
import SearchBar from "../components/SearchBar";
import sampleJsonImage from "../../public/sample-json-format.png";
function Products({ selectedCategory, refreshCategories }) {
  const [products, setProducts]               = useState([]);
  const [currentPage, setCurrentPage]         = useState(1);
  const [sortOption, setSortOption]           = useState("");
  const [sortDropdownOpen, setSortDropdownOpen]     = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [stockFilter, setStockFilter]         = useState("All");
  const [categoryFilter, setCategoryFilter]   = useState("All");
  const [warehouseFilter, setWarehouseFilter] =
useState("All");
  const [searchTerm, setSearchTerm]           = useState("");
  const [deleteMessage, setDeleteMessage]     = useState("");
  const [showAddModal, setShowAddModal]       = useState(false);
  const [newName, setNewName]                 = useState("");
  const [newCategory, setNewCategory]         = useState("");
  const [newPrice, setNewPrice]               = useState("");
  const [newQuantity, setNewQuantity]         = useState("");
  const [newWarehouseId, setNewWarehouseId] = useState(1);
  const [selectedImage, setSelectedImage]     = useState(null);

  // ── RESTORED: Bulk Upload state ──
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkJsonFile, setBulkJsonFile]   = useState(null);
  const [bulkImages, setBulkImages]       = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, stockFilter, categoryFilter, warehouseFilter, selectedCategory]);

  const productsPerPage = 8;

  useEffect(() => {
    fetch("http://localhost:5037/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const message = localStorage.getItem("deleteMessage");
    if (message) {
      setDeleteMessage(message);
      localStorage.removeItem("deleteMessage");
      setTimeout(() => setDeleteMessage(""), 1800);
    }
  }, []);

  async function addProduct() {
     if (
  !newName.trim() ||
  !newCategory.trim() ||
  Number(newPrice) <= 0 ||
  Number(newQuantity) <= 0 ||
  !selectedImage
) {
  alert(
    "Please fill all details properly. Price and Quantity must be greater than 0 and image must be provided."
  );

  return;
}

const allowedFormats = [
  "image/jpeg",
  "image/jpg"
];

if (
  !allowedFormats.includes(
    selectedImage.type
  )
) {
  alert(
    "Only JPG and JPEG images are allowed."
  );

  return;
}



    try {
      const formData = new FormData();
      formData.append("Name", newName);
      formData.append("Category", newCategory);
      formData.append("Price", newPrice);
      formData.append("Quantity", newQuantity);
      formData.append("WarehouseId", newWarehouseId);
      formData.append("Image", selectedImage);

      const response = await fetch("http://localhost:5037/api/products", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!response.ok) {

const error =
await response.text();

alert(
error
||
"Add product failed"
);

return;

}
      const addedProduct = await response.json();
      setProducts((prev) => [...prev, addedProduct]);
      alert("Product added successfully");
      refreshCategories();
      setShowAddModal(false);
      setNewName(""); setNewCategory(""); setNewPrice(""); setNewQuantity(""); setNewWarehouseId(1); setSelectedImage(null);
    } catch (error) {
      console.log(error);
    }
  }

  async function addProductsBulk() {

  if (
    !bulkJsonFile ||
    bulkImages.length === 0
  ) {
    alert(
      "Please upload JSON and all images."
    );

    return;
  }

  if (
  !bulkJsonFile.name
    .toLowerCase()
    .endsWith(".json")
) {
  alert(
    "Only JSON files are allowed."
  );

  return;
}

  const allowedFormats = [
    "image/jpeg",
    "image/jpg"
  ];

  const invalidImage =
    bulkImages.some(
      img =>
        !allowedFormats.includes(
          img.type
        )
    );

  if (invalidImage) {
    alert(
      "Only JPG and JPEG images are allowed."
    );

    return;
  }

  try {

    const jsonText =
      await bulkJsonFile.text();

    const products =
      JSON.parse(
        jsonText
      );

    
    if (
  products.length !==
  bulkImages.length
) {
  alert(
    "Number of products and images must match exactly."
  );

  return;
}

    const requiredFields = [
  "name",
  "category",
  "price",
  "quantity",
  "warehouseId"
];

for (
  const product
  of products
) {

  const keys =
    Object.keys(
      product
    );

  const missing =
    requiredFields.filter(
      field =>
        !keys.includes(
          field
        )
    );

  const extra =
    keys.filter(
      key =>
        !requiredFields.includes(
          key
        )
    );

  if (
    missing.length > 0 ||
    extra.length > 0
  ) {

    alert(
      "Upload JSON using only these fields: name, category, price, quantity, warehouseId"
    );

    return;
  }

}

    const normalize =
      (text) =>
        text
          .toLowerCase()
          .replace(
            /[^a-z0-9]/g,
            ""
          );

    for (
      const product
      of products
    ) {

      const expected =
        normalize(
          product.name
        );

      const found =
        bulkImages.some(
          img =>
            normalize(
              img.name.replace(
                /\.[^/.]+$/,
                ""
              )
            )
            ===
            expected
        );

      if (!found) {

        alert(
          "Check naming matches in JSON name field and image names. Import cancelled."
        );

        return;
      }
    }

    const formData =
      new FormData();

    formData.append(
      "ProductsFile",
      bulkJsonFile
    );

    bulkImages.forEach(
      image =>
        formData.append(
          "Images",
          image
        )
    );

    const response =
      await fetch(
        "http://localhost:5037/api/products/bulk",
        {
          method:
            "POST",

          headers: {
            Authorization:
              `Bearer ${token}`
          },

          body:
            formData
        }
      );

    if (!response.ok)
{
const error =
await response.text();

alert(
error
||
"Bulk upload failed"
);

return;
}

    const newProducts =
      await response.json();

    setProducts(
      prev =>
        [
          ...prev,
          ...newProducts
        ]
    );

    refreshCategories();

    setShowBulkModal(
      false
    );

    setBulkJsonFile(
      null
    );

    setBulkImages(
      []
    );

    alert(
      "Products imported successfully"
    );

  }

  catch {

    alert(
      "Import failed"
    );

  }
}

async function exportInventory() {

try {

const response =
await fetch(
"http://localhost:5037/api/products/export",
{
headers: {
Authorization:
`Bearer ${token}`
}
}
);

if (!response.ok) {

alert(
"Export failed"
);

return;

}

const blob =
await response.blob();

const url =
window.URL.createObjectURL(
blob
);

const link =
document.createElement(
"a"
);

link.href =
url;

link.download =
"inventory_snapshot.xlsx";

document.body.appendChild(
link
);

link.click();

link.remove();

window.URL
.revokeObjectURL(
url
);

}

catch {

alert(
"Export failed"
);

}

}

  let filteredProducts =
    selectedCategory === "All"
      ? [...products]
      : products.filter((p) => p.category === selectedCategory);

  if (categoryFilter !== "All")
    filteredProducts = filteredProducts.filter((p) => p.category === categoryFilter);
  if (
warehouseFilter !== "All"
)
filteredProducts =
filteredProducts.filter(
(p) =>
p.warehouseId ===
warehouseFilter
);
  if (stockFilter === "Plenty")
    filteredProducts = filteredProducts.filter((p) => p.quantity > 30);
  if (stockFilter === "Medium")
    filteredProducts = filteredProducts.filter((p) => p.quantity >= 10 && p.quantity <= 30);
  if (stockFilter === "Low")
    filteredProducts = filteredProducts.filter((p) => p.quantity < 10);
  if (searchTerm.trim() !== "")
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  if (sortOption === "quantityHigh") filteredProducts.sort((a, b) => b.quantity - a.quantity);
  if (sortOption === "quantityLow")  filteredProducts.sort((a, b) => a.quantity - b.quantity);
  if (sortOption === "priceHigh")    filteredProducts.sort((a, b) => b.price - a.price);
  if (sortOption === "priceLow")     filteredProducts.sort((a, b) => a.price - b.price);

  const startIndex       = (currentPage - 1) * productsPerPage;
  const selectedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  const totalPages       = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

        /* ── Root ── */
        .pr-root {
          min-height: 100vh;
          background: #0a0b0f;
          font-family: 'DM Sans', sans-serif;
          color: rgba(232,234,240,0.92);
          padding: 0 40px 96px;
          position: relative;
          overflow-x: hidden;
        }

        .pr-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%,  rgba(90,100,160,0.11) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(60,70,120,0.07)  0%, transparent 60%);
          pointer-events: none;
          z-index: 0;
        }

        .pr-root > * { position: relative; z-index: 1; }

        /* ── Header ── */
        .pr-header {
          padding-top: 100px;
          text-align: center;
          margin-bottom: 48px;
        }

        .pr-eyebrow {
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
          margin-bottom: 20px;
          background: rgba(255,255,255,0.02);
        }

        .pr-eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(79,120,200,0.85);
        }

        .pr-title {
          font-size: clamp(28px, 4vw, 46px);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: rgba(232,234,240,0.93);
          margin: 0 0 12px;
        }

        .pr-subtitle {
          font-size: 14px;
          font-weight: 400;
          color: rgba(232,234,240,0.38);
          margin: 0 auto;
          line-height: 1.75;
          letter-spacing: 0.01em;
        }

        /* ── Divider ── */
        .pr-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent);
          margin: 0 auto 40px;
        }

        /* ── Controls bar ── */
        .pr-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: wrap;
          position: relative;
          z-index: 100;
        }

        .pr-controls-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          position: relative;
          z-index: 120;
        }

        .pr-controls-center {
          display: flex;
          align-items: center;
          gap: 16px;
          flex: 1;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 120;

        }

        .pr-controls-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Add product button */
        .pr-add-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 11px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: rgba(232,234,240,0.88);
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), border-color 0.25s ease, box-shadow 0.3s ease;
          white-space: nowrap;
        }

        .pr-add-btn:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.14);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        /* ── Product grid ── */
        .pr-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 40px;

          position: relative;
          z-index: 1;
        }

        /* ── Empty state ── */
        .pr-empty {
          grid-column: 1 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 80px 40px;
          background: rgba(15,17,23,0.6);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px;
          text-align: center;
        }

        .pr-empty-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
          flex-shrink: 0;
        }

        .pr-empty-icon svg {
          width: 18px;
          height: 18px;
          stroke: rgba(239,68,68,0.7);
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .pr-empty-title {
          font-size: 17px;
          font-weight: 600;
          color: rgba(239,68,68,0.88);
          letter-spacing: -0.01em;
        }

        .pr-empty-desc {
          font-size: 13px;
          font-weight: 400;
          color: rgba(232,234,240,0.28);
        }

        /* ── Delete toast ── */
        .pr-toast {
          position: fixed;
          top: 24px;
          right: 24px;
          background: rgba(20,10,10,0.96);
          border: 1px solid rgba(239,68,68,0.25);
          color: rgba(239,68,68,0.92);
          padding: 14px 22px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 14px;
          z-index: 2000;
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.5);
          animation: pr-fadeMsg 1.8s ease forwards;
        }

        @keyframes pr-fadeMsg {
          0%   { opacity: 0; transform: translateY(-8px); }
          12%  { opacity: 1; transform: translateY(0); }
          80%  { opacity: 1; }
          100% { opacity: 0; }
        }

        /* ── Modal backdrop ── */
        .pr-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.72);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3000;
          backdrop-filter: blur(6px);
        }

        /* ── Modal card ── */
        .pr-modal {
          width: 480px;
          max-width: calc(100vw - 48px);
          background: rgba(13,15,21,0.97);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 24px;
          padding: 40px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset;
        }

        .pr-modal-title {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: rgba(232,234,240,0.92);
          margin: 0 0 4px;
        }

        .pr-modal-caption {
          font-size: 12px;
          color: rgba(232,234,240,0.3);
          margin: 0 0 6px;
        }

        /* Modal inputs */
        .pr-input {
          width: 100%;
          padding: 12px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 400;
          color: rgba(232,234,240,0.88);
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          outline: none;
          transition: border-color 0.25s ease, background 0.25s ease;
          box-sizing: border-box;
          appearance: none;
          color-scheme: dark;
        }

        .pr-input::placeholder { color: rgba(232,234,240,0.25); }

        .pr-input:focus {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.06);
        }

        .pr-input option {
  background: #13151d;
  color: rgba(232,234,240,0.92);
}

        /* Drop zone */
        .pr-dropzone {
          border: 1px dashed rgba(255,255,255,0.13);
          padding: 28px;
          border-radius: 14px;
          text-align: center;
          cursor: pointer;
          background: rgba(255,255,255,0.02);
          transition: border-color 0.25s ease, background 0.25s ease;
        }

        .pr-dropzone:hover {
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.04);
        }

        .pr-dropzone-title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(232,234,240,0.65);
          margin-bottom: 4px;
        }

        .pr-dropzone-sub {
          font-size: 12px;
          color: rgba(232,234,240,0.3);
        }

        /* Modal actions */
        .pr-modal-actions {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 4px;
        }

        .pr-btn-cancel {
          flex: 1;
          padding: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: rgba(239,68,68,0.8);
          background: rgba(239,68,68,0.07);
          border: 1px solid rgba(239,68,68,0.15);
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }

        .pr-btn-cancel:hover {
          background: rgba(239,68,68,0.12);
          transform: translateY(-1px);
        }

        .pr-btn-confirm {
          flex: 1;
          padding: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          color: #0a0b0f;
          background: rgba(232,234,240,0.92);
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background 0.25s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease;
        }

        .pr-btn-confirm:hover {
          background: #ffffff;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        /* ── RESTORED: Bulk info tooltip ── */
        .pr-info-wrap {
          position: relative;
          display: inline-flex;
        }

        .pr-info {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 1px solid rgba(239,68,68,.3);
          background: rgba(239,68,68,.08);
          color: rgba(255,150,150,.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          cursor: pointer;
        }

        .pr-info-box {
          opacity: 0;
          pointer-events: none;
          position: absolute;
          top: -90px;
          right: 0;
          width: 320px;
          padding: 16px;
          border-radius: 16px;
          background: rgba(30,10,10,.95);
          border: 1px solid rgba(239,68,68,.18);
          backdrop-filter: blur(24px);
          color: rgba(255,190,190,.85);
          font-size: 12px;
          line-height: 1.8;
          transition: .25s;
          z-index: 9999;
        }

        .pr-info-wrap:hover .pr-info-box {
          opacity: 1;
          transform: translateY(0);
        }

        .pr-controls * {
  z-index: 999 !important;
}

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .pr-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 820px) {
          .pr-root { padding: 0 20px 80px; }
          .pr-grid { grid-template-columns: repeat(2, 1fr); }
          .pr-controls { flex-direction: column; align-items: stretch; }
          .pr-controls-left,
          .pr-controls-center,
          .pr-controls-right { justify-content: flex-start; }
        }

        @media (max-width: 480px) {
          .pr-grid { grid-template-columns: 1fr; }
        }

        /* legacy fadeMessage kept for compatibility */
        @keyframes fadeMessage {
          0%   { opacity: 0; transform: translateY(-10px); }
          15%  { opacity: 1; transform: translateY(0px); }
          85%  { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      <div className="pr-root">

        {/* ── Delete toast ── */}
        {deleteMessage && (
          <div className="pr-toast">{deleteMessage}</div>
        )}

        {/* ── Add Product modal ── */}
        {showAddModal && (
          <div className="pr-modal-backdrop">
            <div className="pr-modal">
              <h2 className="pr-modal-title">Add Product</h2>
              <p className="pr-modal-caption">Fill in the details below to add a new product.</p>

              <input
                className="pr-input"
                placeholder="Product Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <input
                className="pr-input"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <input
                className="pr-input"
                type="number"
                placeholder="Price"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <input
                className="pr-input"
                type="number"
                placeholder="Quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
              />

              <select
  className="pr-input"
  value={newWarehouseId}
  onChange={(e) =>
    setNewWarehouseId(
      Number(e.target.value)
    )
  }
>
  <option value={1}>
    Warehouse 1
  </option>

  <option value={2}>
    Warehouse 2
  </option>
</select>

              <div
                className="pr-dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) setSelectedImage(file);
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  id="fileUpload"
                  hidden
                  onChange={(e) => setSelectedImage(e.target.files[0])}
                />
                <label htmlFor="fileUpload" style={{ cursor: "pointer", display: "block" }}>
                  {selectedImage ? (
                    <>
                      <p className="pr-dropzone-title">{selectedImage.name}</p>
                      <p className="pr-dropzone-sub">Image selected — click to change</p>
                    </>
                  ) : (
                    <>
                      <p className="pr-dropzone-title">Drag &amp; drop image here-jpg/jpeg formats only</p>
                      <p className="pr-dropzone-sub">or click to browse</p>
                    </>
                  )}
                </label>
              </div>

              <div className="pr-modal-actions">
                <button className="pr-btn-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button className="pr-btn-confirm" onClick={addProduct}>
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── RESTORED: Bulk Import modal ── */}
        {showBulkModal && (
          <div className="pr-modal-backdrop">
            <div className="pr-modal">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 className="pr-modal-title">Bulk Import</h2>
                <div className="pr-info-wrap">
                  <div className="pr-info">i</div>
                  <div className="pr-info-box">
                    Upload only .json file.<br /><br />

JSON fields required:<br />

name<br />

category<br />

price<br />

quantity<br />

warehouseId<br /><br />

Field order does not matter.<br />

No extra fields allowed.<br />

No missing fields allowed.<br /><br />

Upload one JPG/JPEG image per product.<br />

Number of images must equal number of products.<br /><br />

Product name in JSON and image name must match after normalization.<br /><br />

Examples:<br />

iPhone 15 → iphone15.jpg ✅<br />

Nail Cutter → nailcutter.jpg ✅<br />

iPhone15Pro → iphone15.jpg ❌


                  </div>
                </div>
              </div>

              <input
                className="pr-input"
                type="file"
                accept=".json"
                onChange={e => setBulkJsonFile(e.target.files[0])}
              /> upload product json file here ^

              <input
                className="pr-input"
                type="file"
                multiple
                accept="image/*"
                onChange={e => setBulkImages([...e.target.files])}
              />upload image files here ^

              <div className="pr-modal-actions">
                <button className="pr-btn-cancel" onClick={() => setShowBulkModal(false)}>
                  Cancel
                </button>
                <button className="pr-btn-confirm" onClick={addProductsBulk}>
                  Import
                </button>
              </div>
              <div

  style={{

    marginTop: "14px",

    textAlign: "center",

    fontSize: "12px",

  }}

>

  <a>
<button
onClick={() =>
window.open(
sampleJsonImage,
"_blank"
)
}
style={{
background:"transparent",
border:"none",
color:"rgba(255,150,150,.9)",
textDecoration:"underline",
cursor:"pointer",
fontSize:"12px",
marginTop:"14px"
}}
>

View Sample JSON Screenshot

</button>
  </a>

</div>
            </div>
          </div>
        )}

        {/* ── Page header ── */}
        <header className="pr-header">
          <div className="pr-eyebrow">
            <span className="pr-eyebrow-dot" />
            Catalogue
          </div>
          <h1 className="pr-title">{selectedCategory} Products</h1>
          <p className="pr-subtitle">Browse, search, and manage your inventory below.</p>
        </header>

        <div className="pr-divider" />

        {/* ── Controls ── */}
        <div className="pr-controls">
          <div className="pr-controls-left">
            <SortDropdown
              sortDropdownOpen={sortDropdownOpen}
              setSortDropdownOpen={setSortDropdownOpen}
              setSortOption={setSortOption}
            />
            <FilterDropdown
  filterDropdownOpen={filterDropdownOpen}
  setFilterDropdownOpen={setFilterDropdownOpen}
  setStockFilter={setStockFilter}
  setCategoryFilter={setCategoryFilter}
  setWarehouseFilter={
setWarehouseFilter
}
  categories={[
    "All",
    ...new Set(products.map(p => p.category))
  ]}
/>
          </div>

          <div className="pr-controls-center">

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%"
    }}
  >

    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />

    {
      searchTerm.trim() !== ""
      &&

      <div
        style={{

          marginTop: "8px",

          fontSize: "12px",

          color:
            "rgba(255,120,120,.88)",

          textAlign:
            "center",

          transition:
            ".2s"

        }}
      >

        In case duplicate products appear, they can be same products in different warehouses.

      </div>

    }

  </div>

</div>

          <div className="pr-controls-right">
            <button
              className="pr-add-btn"
              onClick={() => setShowAddModal(true)}
            >
              + Add Product
            </button>
            {/* ── RESTORED: Add In Bulk button ── */}
            <button
              className="pr-add-btn"
              onClick={() => setShowBulkModal(true)}
            >
              + Add In Bulk
            </button>

            <button
className="pr-add-btn"
onClick={exportInventory}
>
Export Excel
</button>
          </div>
        </div>

        {/* ── Product grid ── */}
        <div className="pr-grid">
          {selectedProducts.length === 0 ? (
            <div className="pr-empty">
              <div className="pr-empty-icon">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <p className="pr-empty-title">Oops, no products found</p>
              <p className="pr-empty-desc">Try adjusting search, category, or stock filters.</p>
            </div>
          ) : (
            selectedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setProducts={setProducts}
              />
            ))
          )}
        </div>

        {/* ── Pagination ── */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

      </div>
    </>
  );
}

export default Products;