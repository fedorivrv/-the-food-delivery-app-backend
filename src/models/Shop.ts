import mongoose, { Document, Schema } from 'mongoose';

export interface IShop extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
}

const ShopSchema = new Schema<IShop>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export const Shop = mongoose.model<IShop>('Shop', ShopSchema);
