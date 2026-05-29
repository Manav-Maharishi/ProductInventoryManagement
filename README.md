# Inventory Management System

## Overview

Inventory Management System is a full-stack web application developed for managing inventory workflows, stock operations, and warehouse-based inventory organization.

The application provides centralized inventory management with support for product creation, quantity updates, inventory tracking, warehouse segregation, bulk product upload, inventory export, and activity logging.

The backend is developed using ASP.NET Core Web API (.NET 8), while the frontend is built using React.js. SQL Server is used for persistent data storage and Entity Framework Core is used for database communication.

---

## Features

### Authentication and Security
- JWT-based Authentication
- Protected API Endpoints
- Secure User Login
- Authorization Middleware

### Product Management
- Add Product
- Update Product
- Delete Product
- Restore Deleted Product
- Product Image Upload
- Duplicate Product Prevention

### Inventory Control
- Increase Quantity
- Decrease Quantity
- Negative Quantity Prevention
- Inventory Tracking

### Warehouse Management
- Multi-Warehouse Support
- Warehouse-Based Filtering
- Inventory Segregation

### Search and Filtering
- Product Search
- Category Filtering
- Warehouse Filtering
- Stock Level Filtering
- Sorting by Price
- Sorting by Quantity

### Bulk Upload
- JSON-Based Product Import
- Image Upload Validation
- Product-Image Mapping Validation
- Duplicate Detection
- Atomic Import Validation

### Reporting
- Excel Inventory Export
- Inventory Snapshot Generation

### Activity Logging
- Product Creation Logs
- Quantity Update Logs
- Delete Logs
- Restore Logs

### Reliability Features
- RowVersion Concurrency Handling
- Input Validation
- Automated Backend Testing

---

## Technology Stack

| Layer | Technology |
|---------|------------|
| Frontend | React.js |
| Backend | ASP.NET Core Web API (.NET 8) |
| Database | SQL Server |
| ORM | Entity Framework Core |
| Authentication | JWT |
| Excel Export | ClosedXML |
| Testing | xUnit |
| Mocking | Moq |
| Test Database | EF Core InMemory |

---

## Project Structure

```text
ProductInventoryManagement
│
├── Backend
├── Backend.Tests
├── Frontend
│
├── scriptfile.sql
├── ProductInventoryManagement.sln
├── README.md
└── USER_GUIDE.md
```

---

## Main Functionalities

- Secure User Authentication
- Product CRUD Operations
- Inventory Quantity Management
- Warehouse-Based Inventory Tracking
- Product Search, Sorting and Filtering
- Bulk Product Upload
- Product Image Management
- Soft Delete and Restore
- Activity Logging
- Inventory Excel Export

---

## Installation

### Backend Setup

Navigate to Backend folder:

```bash
cd Backend
```

Restore packages:

```bash
dotnet restore
```

Run application:

```bash
dotnet run
```

---

### Frontend Setup

Navigate to Frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Run application:

```bash
npm start
```

---

## Database Setup

Apply Entity Framework migrations:

```bash
dotnet ef database update
```

Alternatively, execute:

```text
scriptfile.sql
```

inside SQL Server Management Studio.

---

## API Overview

### Authentication

```http
POST /api/auth/login
```

### Products

```http
GET /api/products
POST /api/products
PUT /api/products/{id}
DELETE /api/products/{id}
```

### Inventory Quantity

```http
PUT /api/products/{id}/quantity
```

### Restore Product

```http
PUT /api/products/restore/{id}
```

### Bulk Upload

```http
POST /api/products/bulk
```

### Export Inventory

```http
GET /api/products/export
```

---

## Testing

Backend testing is implemented using:

- xUnit
- Moq
- Entity Framework Core InMemory Database

Current Test Status:

```text
Total Tests : 23
Passed      : 23
Failed      : 0
```

---

## Future Enhancements

- Role Based Access Control
- Low Stock Notifications
- Advanced Reporting
- Barcode Integration
- Supplier Management
- Purchase Order Tracking
- Activity Log Dashboard
- Cloud Storage for Product Images

---

## Author

Manav Maharishi

MCA Student

Full Stack Developer

---

## License

This project is developed for academic and learning purposes.
## configuration
Update appsettings.json with your own
SQL Server connection string and JWT settings
before running the application.
then execute :dotnetef database update.

Sample Data

The repository includes a sample inventory dataset located at:

Backend/SeedData/products.json

The file contains approximately 50 sample products that can be imported using the Bulk Upload feature.

After starting the application:

1. Login to the application.
2. Open the Bulk Upload page.
3. Select Backend/SeedData/products.json.
4. Upload the corresponding product images.
5. Complete the import.

This dataset can be used to demonstrate search, filtering, warehouse segregation, quantity management, activity logging, pagination, and Excel export features.