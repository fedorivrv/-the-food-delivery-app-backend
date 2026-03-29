import { z } from 'zod';

export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
  ).min(1),

  customerInfo: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(10),
  }),

  totalPrice: z.number().min(0),
});