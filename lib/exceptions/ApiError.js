import { AppError } from './AppError.js';
export class ApiError extends AppError {
    statusCode;
    constructor(message, code, statusCode = 400) {
        super(message, code);
        this.statusCode = statusCode;
    }
}
