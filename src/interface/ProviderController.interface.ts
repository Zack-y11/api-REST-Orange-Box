import { Request, Response } from "express";

// Interface to define the methods for the ProviderController
export interface IProviderController {
    createProvider: (req: Request, res: Response) => Promise<void>;
    getProviders: (req: Request, res: Response) => Promise<void>; // Handles pagination, ordering, filtering via query params
    getProviderById: (req: Request, res: Response) => Promise<void>;
    updateProvider: (req: Request, res: Response) => Promise<void>;
    replaceProvider: (req: Request, res: Response) => Promise<void>;
    deleteProvider: (req: Request, res: Response) => Promise<void>;
}
