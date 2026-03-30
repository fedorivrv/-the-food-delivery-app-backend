import { z } from 'zod';

export const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().min(1),
    })
    .strict()
  ).min(1),

  customerInfo: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(10),
  }).strict(),
}).strict();

export const orderSearchSchema = z
  .object({
    email: z.string().email().optional(),
    phone: z.string().min(7).optional(),
    orderId: z
      .string()
      .regex(/^[a-f\d]{24}$/i, 'Order ID must be a 24-char hex string')
      .optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    const hasOrderId = !!data.orderId;
    const hasCredentials = !!data.email || !!data.phone;

    if (hasOrderId && hasCredentials) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Use either orderId OR (email + phone), not both',
        path: [],
      });
      return;
    }

    if (hasOrderId) return;

    if (!data.email || !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Email and phone are required when orderId is not provided',
        path: [],
      });
    }
  });