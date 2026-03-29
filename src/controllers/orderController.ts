import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orderService';
import { AppError } from '../errors/AppError';
import mongoose from 'mongoose';

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
    const { email, phone, orderId } = req.query as Record<string, string>;

    // by ID
    if (orderId) {
      if (!mongoose.Types.ObjectId.isValid(orderId)) {
        throw new AppError('Invalid order ID format', 400);
      }

      const order = await orderService.findOrderById(orderId);
      return res.json(order ? [order] : []);
    }

    // by email + phone
    if (!email || !phone) {
      throw new AppError('Email and phone are required', 400);
    }

    const orders = await orderService.searchOrdersByCustomer(email, phone);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};