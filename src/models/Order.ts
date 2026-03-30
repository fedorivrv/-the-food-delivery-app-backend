import mongoose, { Document, Schema } from 'mongoose';

interface OrderItem {
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  imageUrl: String,
  quantity: Number,
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface IOrder extends Document {
  items: OrderItem[];
  customerInfo: CustomerInfo;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const CustomerInfoSchema = new Schema<CustomerInfo>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    items: { type: [OrderItemSchema], required: true, validate: [(v: OrderItem[]) => v.length > 0, 'Order must have at least one item'] },
    customerInfo: { type: CustomerInfoSchema, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'delivered', 'cancelled'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>('Order', OrderSchema);
