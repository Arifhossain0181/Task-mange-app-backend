export class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        // Set the prototype explicitly to maintain the correct instanceof behavior
        this.name = this.constructor.name;
    }
}
