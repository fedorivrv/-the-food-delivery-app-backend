import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orderService';
import { orderSearchSchema } from '../schemas/orderSchema';

//CREATE
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      message: 'Order created successfully',
      orderId: order._id,
    });
  } catch (error) {
    next(error);
  }
};

// GET ALL 
export const getAllOrders = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

//  SEARCH
export const searchOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const parsed = orderSearchSchema.parse(req.query);

    // by ID
    if (parsed.orderId) {
      const order = await orderService.findOrderById(parsed.orderId);
      return res.json(order ? [order] : []);
    }

    // by email + phone
    const orders = await orderService.searchOrdersByCustomer(parsed.email!, parsed.phone!);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};