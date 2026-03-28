import mongoose, { Document, Schema } from 'mongoose';

export type ProductCategory = 'Burgers' | 'Chicken' | 'Pizza' | 'Sushi' | 'Drinks' | 'Desserts' | 'Sides' | 'Salads';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Burgers', 'Chicken', 'Pizza', 'Sushi', 'Drinks', 'Desserts', 'Sides', 'Salads',
];

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  shopId: mongoose.Types.ObjectId;
  category: ProductCategory;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, trim: true },
    imageUrl: { type: String },
    shopId: { type: Schema.Types.ObjectId, ref: 'Shop', required: true },
    category: { type: String, enum: PRODUCT_CATEGORIES, required: true },
  },
  { timestamps: true }
);

ProductSchema.index({ shopId: 1 });

export const Product = mongoose.model<IProduct>('Product', ProductSchema);