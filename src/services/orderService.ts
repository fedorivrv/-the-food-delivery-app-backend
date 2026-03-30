import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { AppError } from '../errors/AppError';
import mongoose from 'mongoose';

type CreateOrderInput = {
  items: Array<{ productId: string; quantity: number }>;
  customerInfo: { name: string; email: string; phone: string; address: string };
};

// 🧾 CREATE ORDER 
export const createOrder = async (data: CreateOrderInput) => {
  if (!data.items || data.items.length === 0) {
    throw new AppError('Order must contain at least one item', 400);
  }

  const productIds = data.items.map((item) => item.productId);

  const products = await Product.find({
    _id: { $in: productIds },
  }).lean();

  if (products.length !== productIds.length) {
    throw new AppError('Some products not found', 400);
  }

  const itemsWithSnapshot = data.items.map((item) => {
    const product = products.find(
      (p) => p._id.toString() === item.productId
    );

    if (!product) {
      throw new AppError(`Product not found: ${item.productId}`, 400);
    }

    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: item.quantity,
    };
  });

  const totalPrice = itemsWithSnapshot.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await Order.create({
    ...data,
    items: itemsWithSnapshot,
    totalPrice,
  });

  return order;
};

// GET ALL ORDERS
export const getAllOrders = async () => {
  return Order.find()
    .sort({ createdAt: -1 })
    .lean();
};

//  FIND BY ID
export const findOrderById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError('Invalid order ID format', 400);
  }

  const order = await Order.findById(id).lean();

  if (!order) {
    throw new AppError('Order not found', 404);
  }

  return order;
};

// SEARCH (email + phone)
export const searchOrdersByCustomer = async (
  email: string,
  phone: string
) => {
  if (!email || !phone) {
    throw new AppError('Email and phone are required', 400);
  }

  const normalizedPhone = phone
    .replace(/[\s\-()]/g, '')
    .replace(/\+/, '\\+');

  return Order.find({
    'customerInfo.email': email.toLowerCase().trim(),
    'customerInfo.phone': {
      $regex: normalizedPhone,
      $options: 'i',
    },
  })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
};