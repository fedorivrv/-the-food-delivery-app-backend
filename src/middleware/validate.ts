import { NextFunction, Request, Response } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../errors/AppError';

export const validate =
  (schema: ZodSchema) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const message = result.error.issues.map(i => i.message).join(', ');
      return next(new AppError(message, 400));
    }

    req.body = result.data;
    next();
  };