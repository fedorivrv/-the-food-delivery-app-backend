import { Order } from '../models/Order';

export const createOrder = async (data: any) => {
  const order = new Order(data);
  await order.save();
  return order;
};

export const getAllOrders = async () => {
  return Order.find().sort({ createdAt: -1 }).lean();
};

export const findOrderById = async (id: string) => {
  return Order.findById(id).lean();
};

export const searchOrdersByCustomer = async (email: string, phone: string) => {
  return Order.find({
    'customerInfo.email': email.toLowerCase().trim(),
    'customerInfo.phone': {
      $regex: phone.replace(/[\s\-()]/g, '').replace(/\+/, '\\+'),
      $options: 'i',
    },
  })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();
};