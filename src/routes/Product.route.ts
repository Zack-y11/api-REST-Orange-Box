import { Router } from 'express';
import { ProductController } from '../controllers/Products.controller';

const router = Router();
const productController = new ProductController();

// POST /products - Create new product
router.post('/', productController.createProduct);

// GET /products - Get all products with pagination, filtering, sorting
router.get('/', productController.getProducts);

// GET /products/:id - Get single product by ID
router.get('/:id', productController.getProductById);

// GET /products/provider/:providerId - Get products by specific provider
router.get('/provider/:providerId', productController.getProductsByProvider);

// PUT /products/:id - Update product
router.put('/:id', productController.updateProduct);

// PATCH /products/:id - Update product (same function as PUT)
router.patch('/:id', productController.updateProduct);

// DELETE /products/:id - Delete product
router.delete('/:id', productController.deleteProduct);

export default router;
