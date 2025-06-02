import { Request, Response } from "express";

// Interface to define the methods for the ProductController
export interface IProductController {
    createProduct: (req: Request, res: Response) => Promise<void>;
    getProducts: (req: Request, res: Response) => Promise<void>;
    getProductById: (req: Request, res: Response) => Promise<void>;
    getProductsByProvider: (req: Request, res: Response) => Promise<void>;
    updateProduct: (req: Request, res: Response) => Promise<void>;
    deleteProduct: (req: Request, res: Response) => Promise<void>;
}