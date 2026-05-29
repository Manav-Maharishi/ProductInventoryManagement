User Guide

Login

1. Open the application.
2. Enter your username and password.
3. Click Login.
4. Upon successful authentication, the dashboard will be displayed.

⸻

Add Product

1. Click Add Product.
2. Enter Product Name, Category, Price, Quantity, and Warehouse.
3. Upload a JPG/JPEG image.
4. Click Add Product.
5. The product will appear in the inventory list.

⸻

Update Inventory Quantity

1. Open the product details page.
2. Select Increase or Decrease Quantity.
3. Enter the quantity value.
4. Submit the update.
5. Inventory is updated immediately.

⸻

Search, Filter and Sort

* Search products by name.
* Filter products by category.
* Filter products by warehouse.
* Filter products by stock level.
* Sort products by quantity or price.

⸻

Delete Product

1. Select a product.
2. Click Delete.
3. The product is moved to the Removed Products section.

⸻

Restore Product

1. Open Removed Products.
2. Select the product.
3. Click Restore.
4. The product becomes active again.

⸻

Bulk Upload

1. Click Add In Bulk.
2. Upload a JSON file containing product data.
3. Upload matching JPG/JPEG product images.
4. Ensure image names match product names.
5. Click Import.

Required JSON Format

[
  {
    "name": "Samsung S24",
    "category": "Electronics",
    "price": 70000,
    "quantity": 30,
    "warehouseId": 1
  }
]

Validation Rules

* JSON file is mandatory.
* Images must be JPG/JPEG.
* Product count and image count must match.
* Product names and image names must match.
* Duplicate products are not allowed.
* If any validation fails, the entire import is cancelled.

⸻

Export Inventory

1. Click Export Excel.
2. The system generates an Excel inventory snapshot.
3. Downloaded file name:

inventory_snapshot.xlsx

⸻

Activity Logs

The application records:

* Product Creation
* Product Deletion
* Product Restoration
* Quantity Updates
* Bulk Upload Operations

⸻

Troubleshooting

Authentication Error

Log in again if the JWT token has expired.

Quantity Update Conflict

Refresh the page and retry the operation.

Bulk Upload Failure

Verify:

* JSON structure
* Image naming
* Duplicate products
* Image count matching product count

