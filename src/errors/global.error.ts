import { Request, Response, NextFunction } from 'express';
import { ApiError } from './ApiError.js';
import { handlePrismaError } from './prisma.error.js';
import { Prisma } from '@prisma/client';

export function globalErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let error = err;

  // if come error form the Prisma file
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(err);
  }

  // if custom  ApiError 
    if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      status: error.statusCode >= 500 ? 'error' : 'fail',
      message: error.message,
    });
  }

  // Unknown error
  console.error(' Unexpected Error:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong on our side!',
  });
}