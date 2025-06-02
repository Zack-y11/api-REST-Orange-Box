import { Document, Types } from "mongoose";

export interface IProduct {
    name: string;
    price: number;
    description: string;
    provider: Types.ObjectId;
    stock: number;
    status: 'active' | 'inactive' | 'discontinued';
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IProductDocument extends IProduct, Document {}