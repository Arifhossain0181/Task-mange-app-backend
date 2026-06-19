// src/errors/prisma.error.ts

import { ApiError } from "./ApiError.js";

export function handlePrismaError(error: any): ApiError {
  switch (error.code) {
    case 'P2002':
      
      const targetField = Array.isArray(error.meta?.target) 
        ? error.meta.target.join(', ') 
        : String(error.meta?.target || 'field');
        
      return new ApiError(`A record with this ${targetField} already exists.`, 409);

    case 'P2025':
      return new ApiError('The requested task was not found.', 404);

    default:
      return new ApiError(`Database error: ${error.message}`, 500);
  }
}