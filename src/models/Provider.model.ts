import { Schema, model } from "mongoose";
import { IProvider } from "../interface/Provider.interface";

const providerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Provider = model<IProvider>("Provider", providerSchema);

export default Provider;
