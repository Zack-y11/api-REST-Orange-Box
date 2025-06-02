import { Schema, model } from "mongoose";
import { IProductDocument } from "../interface/Products.interface";

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'discontinued'],
        default: 'active',
    },
}, { timestamps: true });

const Product = model<IProductDocument>("Product", productSchema);

export default Product;