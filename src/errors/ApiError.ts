

export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    
    // Set the prototype explicitly to maintain the correct instanceof behavior
    this.name = this.constructor.name; 
  }
}