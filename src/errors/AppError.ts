export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  code?: string;
  details?: unknown;

  constructor(message: string, statusCode = 500, opts?: { code?: string; details?: unknown }) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.code = opts?.code;
    this.details = opts?.details;

    Error.captureStackTrace(this, this.constructor);
  }
}