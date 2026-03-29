import { Request, Response } from 'express';
import { Order } from '../models/Order';

function validateOrderBody(body: Record<string, unknown>): string | null {
  const { items, customerInfo, totalPrice } = body as {
    items: unknown[];
    customerInfo: Record<string, string>;
    totalPrice: number;
  };

  if (!Array.isArray(items) || items.length === 0)
    return 'Order must contain at least one item';
  if (!customerInfo || typeof customerInfo !== 'object')
    return 'Customer info is required';

  const { name, email, phone, address } = customerInfo;
  if (!name || name.trim().length < 2) return 'Valid name is required';
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Valid email is required';
  if (!phone || !/^\+?[\d\s\-()]{7,15}$/.test(phone)) return 'Valid phone is required';
  if (!address || address.trim().length < 10) return 'Valid address is required';
  if (typeof totalPrice !== 'number' || totalPrice < 0) return 'Valid total price is required';

  return null;
}

export async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const validationError = validateOrderBody(req.body);
    if (validationError) { res.status(400).json({ message: validationError }); return; }

    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order created successfully', orderId: order._id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
}

export async function getAllOrders(req: Request, res: Response): Promise<void> {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
}

// Get orders by customer email (for order history page)
export async function getOrdersByEmail(req: Request, res: Response): Promise<void> {
  try {
    const { email } = req.params;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ message: 'Valid email is required' });
      return;
    }
    const orders = await Order.find({ 'customerInfo.email': email.toLowerCase() })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch orders', error });
  }
}
