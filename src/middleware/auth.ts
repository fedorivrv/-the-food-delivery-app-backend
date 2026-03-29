import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { AppError } from '../errors/AppError';

export const protect = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Not authorized', 401);
    }

    const token = authHeader.split(' ')[1];

    const decoded = verifyToken(token) as any;

    (req as any).user = decoded;

    next();
  } catch (error) {
    next(new AppError('Invalid or expired token', 401));
  }
};