import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

function toPublicError(err: unknown): AppError {
  if (err instanceof AppError) return err;

  if (err instanceof ZodError) {
    return new AppError('Validation failed', 400, {
      code: 'VALIDATION_ERROR',
      details: err.issues.map((i) => ({
        path: i.path.join('.'),
        message: i.message,
        code: i.code,
      })),
    });
  }

  return new AppError('Internal Server Error', 500, { code: 'INTERNAL_ERROR' });
}

export const errorHandler = (err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const appErr = toPublicError(err);

  // Log the real error; return a safe payload to clients.
  console.error(err);

  res.status(appErr.statusCode).json({
    message: appErr.message,
    error: {
      message: appErr.message,
      code: appErr.code ?? 'UNKNOWN_ERROR',
      details: appErr.details,
    },
  });
};