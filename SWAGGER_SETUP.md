# 📚 Orange Box API - Swagger Documentation Setup

Once your server is running (`npm run dev`), visit:

**📖 Interactive API Documentation:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### 1. **Enhanced Swagger Configuration** (`src/docs/swagger.ts`)
-  Complete OpenAPI 3.0 specification
-  Comprehensive schema definitions
-  Professional metadata (contact, license)
-  Multiple environment support (dev/prod)
- Custom styling and configuration

### 2. **Complete API Documentation** 
#### Provider Endpoints (`src/routes/Provider.route.ts`)
- ✅ **POST** `/api/v1/providers` - Create provider
- ✅ **GET** `/api/v1/providers` - Get all providers (with filtering, pagination, sorting)
- ✅ **GET** `/api/v1/providers/{id}` - Get provider by ID
- ✅ **PATCH** `/api/v1/providers/{id}` - Partial update provider
- ✅ **PUT** `/api/v1/providers/{id}` - Replace provider
- ✅ **DELETE** `/api/v1/providers/{id}` - Delete provider

#### Product Endpoints (`src/routes/Product.route.ts`)
- ✅ **POST** `/api/v1/products` - Create product
- ✅ **GET** `/api/v1/products` - Get all products (with advanced filtering)
- ✅ **GET** `/api/v1/products/{id}` - Get product by ID
- ✅ **GET** `/api/v1/products/provider/{providerId}` - Get products by provider
- ✅ **PUT** `/api/v1/products/{id}` - Update product
- ✅ **PATCH** `/api/v1/products/{id}` - Partial update product
- ✅ **DELETE** `/api/v1/products/{id}` - Delete product

### 3. **Development Testing Files** (`api/` directory)
- ✅ **`providers.http`** - 20 comprehensive provider endpoint tests
- ✅ **`products.http`** - 34 comprehensive product endpoint tests
- ✅ **`README.md`** - Complete testing guide

### 4. **Enhanced Server Setup** (`src/index.ts`)
- ✅ Improved Swagger middleware integration
- ✅ Custom Swagger UI configuration
- ✅ Professional welcome message with documentation link

## 🎯 **Key Features Documented**

### **📊 Data Schemas**
- `Provider` - Complete provider data structure
- `CreateProvider` - Provider creation schema
- `UpdateProvider` - Provider update schema
- `Product` - Complete product data structure
- `CreateProduct` - Product creation schema
- `UpdateProduct` - Product update schema
- `Pagination` - Pagination metadata
- `ApiResponse` - Standard response format
- `ValidationError` - Error response format

### **🔍 Advanced Query Parameters**
- **Pagination**: `page`, `limit`
- **Sorting**: `sortBy`, `order`
- **Filtering**: `search`, `status`, `provider`, `minPrice`, `maxPrice`
- **Field Selection**: `fields` (comma-separated)

### **📝 Response Examples**
- Success responses with actual data examples
- Error responses with proper status codes
- Validation error details

### **🛡️ Error Documentation**
- `400` - Validation errors
- `404` - Resource not found
- `409` - Conflict (duplicate names)
- `500` - Internal server error

## 🚀 **How to Use**

### **1. Interactive Documentation**
1. Start your server: `npm run dev`
2. Visit: http://localhost:3000/api-docs
3. Explore endpoints in the Swagger UI
4. Use "Try it out" to test endpoints directly
5. View request/response examples

### **2. Development Testing**
1. Open `api/providers.http` or `api/products.http`
2. Install REST Client extension in VS Code
3. Click "Send Request" above each HTTP call
4. Update variables with real IDs from your database

