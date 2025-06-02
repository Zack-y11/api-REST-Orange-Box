import { z } from "zod";

const baseProviderSchema = z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone is required"),
    email: z.string().email("Invalid email").optional(),
    description: z.string().optional(),
})

export const createProviderSchema = baseProviderSchema;

export const updateProviderSchema = baseProviderSchema.partial();

export const providerResponseSchema = baseProviderSchema.extend({
    _id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const providerListResponseSchema = z.object({
    providers: z.array(providerResponseSchema),
    pagination: z.object({
        currentPage: z.number(),
        totalPages: z.number(),
        totalItems: z.number(),
        itemsPerPage: z.number(),
    })
});


