import { Request, Response } from 'express';
import { signToken } from '../utils/jwt';

export const login = (req: Request, res: Response) => {
  const { email } = req.body;

  const token = signToken({ email });

  res.json({ token });
};