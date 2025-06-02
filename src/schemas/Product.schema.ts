import { z } from "zod";

const baseProductSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    price: z.number().min(0, "Price must be greater than or equal to 0"),
    description: z.string().min(1, "Description is required"),
    provider: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid provider ID format"),
    stock: z.number().int().min(0, "Stock must be a non-negative integer"),
    status: z.enum(['active', 'inactive', 'discontinued']).default('active'),
});

export const createProductSchema = baseProductSchema;

export const updateProductSchema = baseProductSchema.partial();

export const productResponseSchema = baseProductSchema.extend({
    _id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const productListResponseSchema = z.object({
    products: z.array(productResponseSchema),
    pagination: z.object({
        currentPage: z.number(),
        totalPages: z.number(),
        totalItems: z.number(),
        itemsPerPage: z.number(),
    })
});




