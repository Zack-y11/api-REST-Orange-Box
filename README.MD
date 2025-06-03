# 🍊 Orange Box API

A REST API for managing products and providers built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api-REST-Orange-Box
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/orange-box
   # OR use MongoDB Atlas
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/orange-box
   
   # Optional for deployment
   RAILWAY_URL=https://your-app.railway.app
   VERCEL_URL=https://your-app.vercel.app
   ```

4. **Run the application**
   ```bash
   # Development mode (with hot reload)
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

5. **Access the API**
   - API Base URL: `http://localhost:3000/api/v1`
   - Documentation: `http://localhost:3000/api-docs`

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api/v1
```

### Authentication
Currently, no authentication is required. All endpoints are publicly accessible.

---

## 🛍️ Products API

### Create Product
**POST** `/products`

```json
{
  "name": "Premium Laptop",
  "price": 1299.99,
  "description": "High-performance laptop",
  "provider": "64a7b8c9d1234567890abcde",
  "stock": 50,
  "status": "active"
}
```

**Response (201)**
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "64a7b8c9d1234567890abcde",
    "name": "Premium Laptop",
    "price": 1299.99,
    "description": "High-performance laptop",
    "provider": "64a7b8c9d1234567890abcde",
    "stock": 50,
    "status": "active",
    "createdAt": "2023-07-07T10:30:00.000Z",
    "updatedAt": "2023-07-07T10:30:00.000Z"
  }
}
```

### Get All Products
**GET** `/products`

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 50)
- `sortBy` (string): Field to sort by (default: createdAt)
- `order` (string): Sort order - asc/desc (default: desc)
- `search` (string): Search in name and description
- `status` (string): Filter by status (active/inactive/discontinued)
- `provider` (string): Filter by provider ID
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `fields` (string): Comma-separated fields to return

**Example Request:**
```
GET /products?page=1&limit=10&status=active&minPrice=100&search=laptop
```

**Response (200)**
```json
{
  "success": true,
  "message": "Products retrieved successfully",
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 45,
    "itemsPerPage": 10
  }
}
```

### Get Product by ID
**GET** `/products/{id}`

**Response (200)**
```json
{
  "success": true,
  "message": "Product retrieved successfully",
  "data": {
    "_id": "64a7b8c9d1234567890abcde",
    "name": "Premium Laptop",
    "price": 1299.99,
    // ... other fields
  }
}
```

### Get Products by Provider
**GET** `/products/provider/{providerId}`

Same query parameters as "Get All Products" but filtered by provider.

### Update Product (Full)
**PUT** `/products/{id}`

Requires all fields in request body.

### Update Product (Partial)
**PATCH** `/products/{id}`

```json
{
  "price": 999.99,
  "stock": 25,
  "status": "inactive"
}
```

### Delete Product
**DELETE** `/products/{id}`

**Response (200)**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## 🏢 Providers API

### Create Provider
**POST** `/providers`

```json
{
  "name": "Tech Solutions Inc",
  "address": "123 Tech Street, Silicon Valley, CA 94000",
  "phone": "+1-555-0123",
  "email": "contact@techsolutions.com",
  "description": "Leading technology solutions provider"
}
```

### Get All Providers
**GET** `/providers`

**Query Parameters:**
- `page`, `limit`, `sortBy`, `order` (same as products)
- `search` (string): Search in name and description
- `name` (string): Filter by provider name
- `fields` (string): Comma-separated fields to return

### Get Provider by ID
**GET** `/providers/{id}`

### Update Provider (Partial)
**PATCH** `/providers/{id}`

```json
{
  "name": "Updated Tech Solutions Inc",
  "email": "newemail@techsolutions.com"
}
```

### Replace Provider (Full)
**PUT** `/providers/{id}`

Requires all fields in request body.

### Delete Provider
**DELETE** `/providers/{id}`

---

## 🔍 Filtering, Pagination & Ordering

### Pagination
All list endpoints support pagination:
```
GET /products?page=2&limit=20
```

### Sorting
```
GET /products?sortBy=price&order=asc
GET /products?sortBy=createdAt&order=desc
```

### Filtering
```
# Multiple filters
GET /products?status=active&minPrice=100&maxPrice=2000&provider=64a7b8c9d1234567890abcde

# Search
GET /products?search=laptop
GET /providers?search=tech
```

### Field Selection
```
GET /products?fields=name,price,stock
GET /providers?fields=name,email,phone
```

---

## 📁 Project Structure

```
api-REST-Orange-Box/
├── src/
│   ├── controllers/          # Request handlers
│   │   ├── Products.controller.ts
│   │   └── Provider.controller.ts
│   ├── db/                   # Database connection
│   │   └── db.ts
│   ├── docs/                 # Swagger documentation
│   │   └── swagger.ts
│   ├── interface/            # TypeScript interfaces
│   ├── models/              # MongoDB schemas
│   │   ├── Products.model.ts
│   │   └── Provider.model.ts
│   ├── routes/              # API routes
│   │   ├── Product.route.ts
│   │   └── Provider.route.ts
│   ├── schemas/             # Validation schemas (Zod)
│   └── index.ts             # Main server file
├── dist/                    # Compiled JavaScript (production)
├── docs/                    # Additional documentation
├── package.json
├── tsconfig.json
└── vercel.json             # Vercel deployment config
```

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Zod** - Schema validation
- **Swagger** - API documentation
- **Morgan** - HTTP request logger
- **CORS** - Cross-origin resource sharing
- **ts-node-dev** - Development server with hot reload

## 📜 Available Scripts

```bash
npm run dev        # Start development server with hot reload
npm run build      # Compile TypeScript to JavaScript
npm start          # Run production server
npm run vercel-build # Build for Vercel deployment
```

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Railway
1. Connect GitHub repository
2. Set environment variables
3. Deploy with one click

### Environment Variables for Production
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/orange-box
RAILWAY_URL=https://your-app.railway.app
VERCEL_URL=https://your-app.vercel.app
```

## 📖 Interactive Documentation

Visit `/api-docs` endpoint for full Swagger documentation with:
- Interactive API testing
- Request/response examples
- Schema definitions
- Try-it-out functionality

**Local:** `http://localhost:3000/api-docs`

## ❌ Error Responses

All endpoints return consistent error format:

**400 Bad Request**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [...]
}
```

**404 Not Found**
```json
{
  "success": false,
  "message": "Resource not found"
}
```

**500 Internal Server Error**
```json
{
  "success": false,
  "message": "Internal server error"
}
```
