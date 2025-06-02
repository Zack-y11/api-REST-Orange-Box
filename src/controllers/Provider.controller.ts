import { Request, Response } from 'express';
import { z } from 'zod';
import Provider from '../models/Provider.model';
import { IProviderController } from '../interface/ProviderController.interface';
import { 
    createProviderSchema, 
    updateProviderSchema, 
} from '../schemas/Provider.schema';

export class ProviderController implements IProviderController {
    
    async createProvider(req: Request, res: Response): Promise<void> {
        try {
            const validatedData = createProviderSchema.parse(req.body);
            
            // Check if provider with same name already exists
            const existingProvider = await Provider.findOne({ name: validatedData.name });
            if (existingProvider) {
                res.status(409).json({ 
                    success: false,
                    message: 'Provider with this name already exists' 
                });
                return;
            }

            const provider = await Provider.create(validatedData);
            const providerResponse = {
                success: true,
                message: 'Provider created successfully',
                data: {
                    _id: provider._id.toString(),
                    name: provider.name,
                    address: provider.address,
                    phone: provider.phone,
                    email: provider.email,
                    description: provider.description,
                    createdAt: provider.createdAt,
                    updatedAt: provider.updatedAt
                }
            };

            res.status(201).json(providerResponse);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
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

    async getProviders(req: Request, res: Response): Promise<void> {
        try {
            // Pagination
            const page = Math.max(1, parseInt(req.query.page as string) || 1);
            const limit = Math.min(50, Math.max(1, parseInt(req.query.limit as string) || 10));
            const skip = (page - 1) * limit;

            // Sorting
            const sortBy = req.query.sortBy as string || 'createdAt';
            const order = req.query.order === 'asc' ? 1 : -1;

            // Simple field selection
            const fields = req.query.fields as string;
            let selectFields = '';
            
            if (fields) {
                // Basic field selection - just pass the string to select()
                selectFields = fields.replace(/[^a-zA-Z0-9,_]/g, ''); // Basic sanitization
            }

            // Filtering
            const filter: any = {};
            
            // Search in name and description
            if (req.query.search) {
                const searchRegex = new RegExp(req.query.search as string, 'i');
                filter.$or = [
                    { name: searchRegex },
                    { description: searchRegex }
                ];
            }

            // Filter by specific fields
            if (req.query.name) {
                filter.name = new RegExp(req.query.name as string, 'i');
            }

            // Execute query
            let query = Provider.find(filter)
                .sort({ [sortBy]: order })
                .skip(skip)
                .limit(limit);

            // Apply field selection if provided
            if (selectFields) {
                query = query.select(selectFields);
            }

            const [providers, total] = await Promise.all([
                query.lean(),
                Provider.countDocuments(filter)
            ]);

            const totalPages = Math.ceil(total / limit);

            const response = {
                success: true,
                message: 'Providers retrieved successfully',
                data: providers,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems: total,
                    itemsPerPage: limit,
                    hasNext: page < totalPages,
                    hasPrev: page > 1
                }
            };

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving providers',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async getProviderById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Validate ObjectId format
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid provider ID format'
                });
                return;
            }

            // Simple field selection
            const fields = req.query.fields as string;
            let selectFields = '';
            
            if (fields) {
                selectFields = fields.replace(/[^a-zA-Z0-9,_]/g, '');
            }

            // Execute query
            let query = Provider.findById(id);
            
            if (selectFields) {
                query = query.select(selectFields);
            }

            const provider = await query.lean();

            if (!provider) {
                res.status(404).json({
                    success: false,
                    message: 'Provider not found'
                });
                return;
            }

            const response = {
                success: true,
                message: 'Provider retrieved successfully',
                data: provider
            };

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving provider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async replaceProvider(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const validatedData = createProviderSchema.parse(req.body);

            // Check if provider exists
            const existingProvider = await Provider.findById(id);
            if (!existingProvider) {
                res.status(404).json({
                    success: false,
                    message: 'Provider not found'
                });
                return;
            }

            // Check if provider with same name already exists
            const nameConflict = await Provider.findOne({ name: validatedData.name, _id: { $ne: id } });
            if (nameConflict) {
                res.status(409).json({
                    success: false,
                    message: 'Provider with this name already exists'
                });
                return;
            }

            const updatedProvider = await Provider.findByIdAndUpdate(
                id,
                validatedData,
                { new: true, runValidators: true }
            ).lean();

            if (!updatedProvider) {
                res.status(404).json({
                    success: false,
                    message: 'Provider not found'
                });
                return;
            }

            const response = {
                success: true,
                message: 'Provider updated successfully',
                data: {
                    _id: updatedProvider._id.toString(),
                    name: updatedProvider.name,
                    address: updatedProvider.address,
                    phone: updatedProvider.phone,
                    email: updatedProvider.email,
                    description: updatedProvider.description,
                    createdAt: updatedProvider.createdAt,
                    updatedAt: updatedProvider.updatedAt
                }
            };

            res.status(200).json(response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: 'Error updating provider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
    async updateProvider(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Validate ObjectId format
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid provider ID format'
                });
                return;
            }

            const validatedData = updateProviderSchema.parse(req.body);

            // Check if there's data to update
            if (Object.keys(validatedData).length === 0) {
                res.status(400).json({
                    success: false,
                    message: 'No valid fields provided for update'
                });
                return;
            }

            // Check if provider exists and name conflict
            if (validatedData.name) {
                const existingProvider = await Provider.findOne({ 
                    name: validatedData.name, 
                    _id: { $ne: id } 
                });
                if (existingProvider) {
                    res.status(409).json({
                        success: false,
                        message: 'Provider with this name already exists'
                    });
                    return;
                }
            }

            const updatedProvider = await Provider.findByIdAndUpdate(
                id,
                validatedData,
                { new: true, runValidators: true }
            ).lean();

            if (!updatedProvider) {
                res.status(404).json({
                    success: false,
                    message: 'Provider not found'
                });
                return;
            }

            const response = {
                success: true,
                message: 'Provider updated successfully',
                data: {
                    _id: updatedProvider._id.toString(),
                    name: updatedProvider.name,
                    address: updatedProvider.address,
                    phone: updatedProvider.phone,
                    email: updatedProvider.email,
                    description: updatedProvider.description,
                    createdAt: updatedProvider.createdAt,
                    updatedAt: updatedProvider.updatedAt
                }
            };

            res.status(200).json(response);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors: error.errors.map(err => ({
                        field: err.path.join('.'),
                        message: err.message
                    }))
                });
                return;
            }

            res.status(500).json({
                success: false,
                message: 'Error updating provider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    async deleteProvider(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            // Validate ObjectId format
            if (!id.match(/^[0-9a-fA-F]{24}$/)) {
                res.status(400).json({
                    success: false,
                    message: 'Invalid provider ID format'
                });
                return;
            }

            const deletedProvider = await Provider.findByIdAndDelete(id).lean();

            if (!deletedProvider) {
                res.status(404).json({
                    success: false,
                    message: 'Provider not found'
                });
                return;
            }

            const response = {
                success: true,
                message: 'Provider deleted successfully',
                data: {
                    _id: deletedProvider._id.toString(),
                    name: deletedProvider.name
                }
            };

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error deleting provider',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}
