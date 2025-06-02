import { Request, Response } from 'express';
import { z } from 'zod';
import { IProductController } from '../interface/ProductController.interface';
import { createProductSchema, updateProductSchema } from '../schemas/Product.schema';
import Product from '../models/Products.model';

export class ProductController implements IProductController {
    
    async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = createProductSchema.parse(req.body);
            const product = await Product.create(validatedData);
            
            res.status(201).json({
                success: true,
                message: 'Product created successfully',
                data: product
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: 'Internal server error',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            // b. Pagination
            const page = Math.max(1, parseInt(req.query.page as string) || 1);
            const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
            const skip = (page - 1) * limit;

            // c. Order by property
            const sortBy = req.query.sortBy as string || 'createdAt';
            const order = req.query.order === 'asc' ? 1 : -1;

            // d. Filtering by property
            const filter: any = {};
            
            if (req.query.search) {
                const searchRegex = new RegExp(req.query.search as string, 'i');
                filter.$or = [{ name: searchRegex }, { description: searchRegex }];
            }
            
            if (req.query.status) filter.status = req.query.status;
            if (req.query.provider) filter.provider = req.query.provider;
            if (req.query.minPrice) filter.price = { $gte: parseFloat(req.query.minPrice as string) };
            if (req.query.maxPrice) filter.price = { ...filter.price, $lte: parseFloat(req.query.maxPrice as string) };

            // a. Limit properties returned (simple approach)
            const fields = req.query.fields as string;
            
            let query: any = Product.find(filter)
                .populate('provider', 'name')
                .sort({ [sortBy]: order })
                .skip(skip)
                .limit(limit);

            if (fields) {
                query = query.select(fields.replace(/[^a-zA-Z0-9,_]/g, ''));
            }

            const [products, total] = await Promise.all([
                query.lean(),
                Product.countDocuments(filter)
            ]);

            res.status(200).json({
                success: true,
                message: 'Products retrieved successfully',
                data: products,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: limit
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving products',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid product ID format'
                });
                return;
            }

            // a. Limit properties returned
            const fields = req.query.fields as string;
            let query: any = Product.findById(id).populate('provider', 'name address');
            
            if (fields) {
                query = query.select(fields.replace(/[^a-zA-Z0-9,_]/g, ''));
            }

            const product = await query.lean();

            if (!product) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Product retrieved successfully',
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving product',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getProductsByProvider(req: Request, res: Response): Promise<void> {
        try {
            const { providerId } = req.params;

            if (!providerId.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid provider ID format'
                });
                return;
            }

            // b. Pagination
            const page = Math.max(1, parseInt(req.query.page as string) || 1);
            const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
            const skip = (page - 1) * limit;

            // c. Order by property
            const sortBy = req.query.sortBy as string || 'createdAt';
            const order = req.query.order === 'asc' ? 1 : -1;

            // a. Limit properties returned
            const fields = req.query.fields as string;
            let query: any = Product.find({ provider: providerId })
                .populate('provider', 'name')
                .sort({ [sortBy]: order })
                .skip(skip)
                .limit(limit);

            if (fields) {
                query = query.select(fields.replace(/[^a-zA-Z0-9,_]/g, ''));
            }

            const [products, total] = await Promise.all([
                query.lean(),
                Product.countDocuments({ provider: providerId })
            ]);

            res.status(200).json({
                success: true,
                message: 'Products from provider retrieved successfully',
                data: products,
                pagination: {
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalItems: total,
                    itemsPerPage: limit
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving products by provider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async updateProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid product ID format'
                });
                return;
            }

            const validatedData = updateProductSchema.parse(req.body);

            if (Object.keys(validatedData).length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'No valid fields provided for update'
                });
                return;
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                validatedData,
                { new: true, runValidators: true }
            ).populate('provider', 'name').lean();

            if (!updatedProduct) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                data: updatedProduct
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors
                });
                return;
            }
            res.status(500).json({
                success: false,
                message: 'Error updating product',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid product ID format'
                });
                return;
            }

            const deletedProduct = await Product.findByIdAndDelete(id).lean();

            if (!deletedProduct) {
                res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Product deleted successfully',
                data: {
                    _id: deletedProduct._id,
                    name: deletedProduct.name
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting product',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
