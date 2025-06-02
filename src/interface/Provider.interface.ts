import { Types } from 'mongoose';
export interface IProvider {
    id: Types.ObjectId;
    name: string;
    address: string;
    phone: string;
    email?: string;
    description: string;
    createdAt?: Date;
    updatedAt?: Date;
}

