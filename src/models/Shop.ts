import mongoose, { Document, Schema } from 'mongoose';

export interface IShop extends Document {
  name: string;
  description?: string;
  imageUrl?: string;
  rating: number;
}

const ShopSchema = new Schema<IShop>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    imageUrl: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5, default: 4.0 },
  },
  { timestamps: true }
);

export const Shop = mongoose.model<IShop>('Shop', ShopSchema);